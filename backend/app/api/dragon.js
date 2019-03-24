const { Router } = require('express');
const TablaDragon = require('../dragon/tabla');
const TablaCuentaDragon = require('../cuentaDragon/tabla');
const TablaCuenta = require('../cuenta/tabla');
//const Criador = require('../dragon/criador');
const { cuentaAutenticada } = require('./ayudante');
const { getDragonesPublicos, getDragonConRasgos } = require('../dragon/ayudante');

const ruta = new Router();

ruta.get('/nuevo',(solicitud, respuesta, siguiente)=>{
	let cuentaId, dragon;

	cuentaAutenticada({ sesionString: solicitud.cookies.sesionString })
	.then(({ cuenta }) => {
		cuentaId = cuenta.id;

		dragon = solicitud.app.locals.motor.generacion.nuevoDragon();

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


router.put('/actualizar', (solicitud, respuesta, siguiente) => {
  const { dragonId, nickname, isPublic, saleValue, sireValue } = solicitud.body;

  TablaDragon.updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue })
    .then(() => respuesta.json({ message: 'Dragon actualizado.' }))
    .catch(error => siguiente(error));
});

router.get('/dragones-publicos', (solicitud, respuesta, siguiente) => {
  getDragonesPublicos()
    .then(({ dragones }) => respuesta.json({ dragones }))
    .catch(error => siguiente(error));
});


module.exports = ruta;