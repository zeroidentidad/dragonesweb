const { Router } = require('express');
const TablaDragon = require('../dragon/tabla');
const TablaCuentaDragon = require('../cuentaDragon/tabla');
const TablaCuenta = require('../cuenta/tabla');
const Criador = require('../dragon/criador');
const { cuentaAutenticada } = require('./ayudante');
const { getDragonesPublicos, getDragonConRasgos } = require('../dragon/ayudante');

const ruta = new Router();

ruta.get('/nuevo',(solicitud, respuesta, siguiente)=>{
	let cuentaId, dragon;

	cuentaAutenticada({ sesionString: solicitud.cookies.sesionString })
	.then(({ cuenta }) => {
		cuentaId = cuenta.id;

		dragon = solicitud.app.locals.motor.generacion.nuevoDragon({ cuentaId });

		return TablaDragon.almacenarDragon(dragon);
	})
	.then(({ dragonId })=>{
		dragon.dragonId = dragonId;

		console.log('Resuelto dragonId', dragonId);

		return TablaCuentaDragon.almacenarCuentaDragon({ cuentaId, dragonId });
	})
	.then(() => respuesta.json({ dragon }))
    .catch(error => siguiente(error));
});


ruta.put('/actualizar', (solicitud, respuesta, siguiente) => {
  const { dragonId, nickname, isPublic, saleValue, sireValue } = solicitud.body;

  TablaDragon.updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue })
    .then(() => respuesta.json({ message: 'Dragon actualizado.' }))
    .catch(error => siguiente(error));
});

ruta.get('/dragones-publicos', (solicitud, respuesta, siguiente) => {
  getDragonesPublicos()
    .then(({ dragones }) => respuesta.json({ dragones }))
    .catch(error => siguiente(error));
});

ruta.post('/comprar', (solicitud, respuesta, siguiente) => {
  const { dragonId, saleValue } = solicitud.body;
  let buyerId;

  TablaDragon.getDragon({ dragonId })
    .then(dragon => {
      if (dragon.saleValue !== saleValue) {
        throw new Error('Valor de venta incorrecto.');
      }

      if (!dragon.isPublic) {
        throw new Error('El dragon debe ser publico.')
      }

      return cuentaAutenticada({ sesionString: solicitud.cookies. sesionString });
    })
    .then(({ cuenta, autenticado }) => {
      if (!autenticado) {
        throw new Error('No autenticado.')
      }

      if (saleValue > cuenta.balance) {
        throw new Error('El valor de venta excede balance disponible.')
      }

      buyerId = cuenta.id;

      return TablaCuentaDragon.getCuentaDragon({ dragonId });
    })
    .then(({ cuentaId }) => {
      if (cuentaId === buyerId) {
        throw new Error('No puedes comprar tu propio dragon.');
      }

      const sellerId = cuentaId;

      return Promise.all([
        TablaCuenta.updateBalance({
          cuentaId: buyerId, value: -saleValue
        }),
        TablaCuenta.updateBalance({
          cuentaId: sellerId, value: saleValue
        }),
        TablaCuentaDragon.updateCuentaDragon({
          dragonId, cuentaId: buyerId
        }),
        DragonTable.updateDragon({
          dragonId, isPublic: false
        })
      ])
    })
    .then(() => respuesta.json({ message: 'éxito!' }))
    .catch(error => siguiente(error));
});

ruta.post('/mate', (solicitud, respuesta, siguiente) => {
  const { matronDragonId, patronDragonId } = solicitud.body;

  if (matronDragonId === patronDragonId) {
    throw new Error('¡No se puede reproducir con el mismo dragón!');
  }

  let matronDragon, patronDragon, patronSireValue;
  let matronCuentaId, patronCuentaId;

  getDragonConRasgos({ dragonId: patronDragonId })
    .then(dragon => {
      if (!dragon.isPublic) {
        throw new Error('El dragón debe ser público.');
      }

      patronDragon = dragon;
      patronSireValue = dragon.sireValue;

      return getDragonConRasgos({ dragonId: matronDragonId })
    })
    .then(dragon => {
      matronDragon = dragon;

      return cuentaAutenticada({ sesionString: solicitud.cookies.sesionString });
    })
    .then(({ cuenta, autenticado }) => {
      if (!autenticado) throw new Error('No autenticado.');

      if (patronSireValue > cuenta.balance) {
        throw new Error('El valor de aparear supera balance.');
      }

      matronCuentaId = cuenta.id;

      return TablaCuentaDragon.getCuentaDragon({ dragonId: patronDragonId });
    })
    .then(({ cuentaId }) => {
      patronCuentaId = cuentaId;

      if (matronCuentaId === patronCuentaId) {
        throw new Error('¡No puedes criar tus propios dragones!');
      }

      const dragon = Criador.criarDragon({ matron: matronDragon, patron: patronDragon });

      return TablaDragon.almacenarDragon(dragon);
    })
    .then(({ dragonId }) => {
      Promise.all([
        TablaCuenta.updateBalance({
          cuentaId: matronCuentaId, value: -patronSireValue
        }),
        TablaCuenta.updateBalance({
          cuentaId: patronCuentaId, value: patronSireValue
        }),
        TablaCuentaDragon.almacenarCuentaDragon({
          cuentaId: matronCuentaId, dragonId 
        })
      ]).then(() => respuesta.json({ message: 'éxito!' }))
        .catch(error => siguiente(error));
    });
});


module.exports = ruta;