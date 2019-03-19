const { Router } = require('express');
const TablaDragon = require('../dragon/tabla');
const ruta = new Router();

ruta.get('/nuevo',(solicitud, respuesta, siguiente)=>{

	const dragon = solicitud.app.locals.motor.generacion.nuevoDragon();

	TablaDragon.almacenarDragon('foo')
	.then(({ dragonId })=>{
		console.log('dragonId', dragonId);

		dragon.dragonId = dragonId;

		respuesta.json({ dragon });
	})
	.catch(error=> siguiente(error));
});

module.exports = ruta;