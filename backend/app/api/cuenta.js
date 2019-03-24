const { Router } = require('express');
const TablaCuenta = require('../cuenta/tabla');
const Sesion = require('../cuenta/sesion');
const { hash } = require('../cuenta/ayudante');
const { setSesion, cuentaAutenticada } = require('./ayudante');
const TablaCuentaDragon = require('../cuentaDragon/tabla');
const { getDragonConRasgos } = require('../dragon/ayudante');

const router = new Router();

router.post('/signup', (solicitud, respuesta, siguiente) => {
  const { username, password } = solicitud.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password);

  TablaCuenta.getCuenta({ usernameHash })
    .then(({ cuenta }) => {
      if (!cuenta) {
        return TablaCuenta.almacenarCuenta({ usernameHash, passwordHash })
      } else {
        const error = new Error('Este usuario ya existe.');

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      return setSesion({ username, respuesta });
    })
    .then(({ mensaje }) => respuesta.json({ mensaje }))
    .catch(error => siguiente(error));
});

router.post('/login', (solicitud, respuesta, siguiente) => {
  const { username, password } = solicitud.body;

  TablaCuenta.getCuenta({ usernameHash: hash(username) })
    .then(({ cuenta }) => {
      if (cuenta && cuenta.passwordHash === hash(password)) {
        const { sesionId } = cuenta;
      
        return setSesion({ username, respuesta, sesionId })
      } else {
        const error = new Error('Username/password incorrecto.');

        error.statusCode = 409;

        throw error;
      }
    })
    .then(({ mensaje }) => respuesta.json({ mensaje }))
    .catch(error => siguiente(error));
});

router.get('/logout', (solicitud, respuesta, siguiente) => {
  const { username } = Sesion.parse(solicitud.cookies.sesionString);

  TablaCuenta.updateSesionId({
    sesionId: null,
    usernameHash: hash(username)
  }).then(() => {
    respuesta.clearCookie('sesionString');

    respuesta.json({ mensaje: 'Logout exitoso.' });
  }).catch(error => siguiente(error));
});

router.get('/autenticado', (solicitud, respuesta, siguiente) => {
  cuentaAutenticada({ sesionString: solicitud.cookies.sesionString })
    .then(({ autenticado }) => respuesta.json({ autenticado }))
    .catch(error => siguiente(error));
});

router.get('/dragones', (solicitud, respuesta, siguiente) => {
  cuentaAutenticada({ sesionString: solicitud.cookies.sesionString })
    .then(({ cuenta }) => {
      return TablaCuentaDragon.getDragonesCuenta({
        cuentaId: cuenta.id
      });
    })
    .then(({ cuentaDragones }) => {
      return Promise.all(
        cuentaDragones.map(cuentaDragon => {
          return getDragonConRasgos({ dragonId: cuentaDragon.dragonId });
        })
      );
    })
    .then(dragones => {
      respuesta.json({ dragones });
    })
    .catch(error => siguiente(error));
});

router.get('/info', (solicitud, respuesta, siguiente) => {
  cuentaAutenticada({ sesionString: solicitud.cookies.sesionString })
    .then(({ cuenta, username }) => {
      respuesta.json({ info: { balance: cuenta.balance, username } });
    })
    .catch(error => siguiente(error));
});

module.exports = router;