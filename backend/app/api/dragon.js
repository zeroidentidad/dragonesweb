const { Router } = require('express');

const ruta = new Router();

ruta.get('/nuevo',(solicitud, respuesta)=>{
	respuesta.json({ dragon: solicitud.app.locals.motor.generacion.nuevoDragon() });
});

module.exports = ruta;