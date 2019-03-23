const Sesion = require('../cuenta/sesion');
const TablaCuenta = require('../cuenta/tabla');
const { hash } = require('../cuenta/ayudante');

const setSesion = ({ username, respuesta, sesionId }) => {
  return new Promise((resuelto, rechazado) => {
    let sesion, sesionString;

    if (sesionId) {
      sesionString = Sesion.sesionString({ username, id: sesionId });

      setSesionCookie({ sesionString, respuesta });

      resuelto({ mensaje: 'Sesion restaurada.' });
    } else {
      sesion = new Sesion({ username });
      sesionString = sesion.toString();

      TablaCuenta.updateSesionId({
        sesionId: sesion.id,
        usernameHash: hash(username)
      })
      .then(() => {
        setSesionCookie({ sesionString, respuesta });

        resuelto({ mensaje: 'Sesion creada.' });
      })
      .catch(error => rechazado(error));
    }
  });
}

const setSesionCookie = ({ sesionString, respuesta }) => {
  respuesta.cookie('sesionString', sesionString, {
    expire: Date.now() + 3600000,
    httpOnly: true
    //, secure: true // solo con https
  });
};

const cuentaAutenticada = ({ sesionString }) => {
  return new Promise((resuelto, rechazado) => {
    if (!sesionString || !Sesion.verify(sesionString)) {
      const error = new Error('Sesion invalida.');
  
      error.statusCode = 400;
  
      return rechazado(error);
    } else {
      const { username, id } = Sesion.parse(sesionString);
  
      TablaCuenta.getCuenta({ usernameHash: hash(username) })
        .then(({ cuenta }) => {
          const autenticado = cuenta.sesionId === id;
  
          resuelto({ cuenta, autenticado, username });
        })
        .catch(error => rechazado(error));
    }
  });
};

module.exports = { setSesion, cuentaAutenticada };