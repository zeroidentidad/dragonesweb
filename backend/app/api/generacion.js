const { Router } = require('express');

const ruta = new Router();

ruta.get('/',(solicitud, respuesta)=>{
	respuesta.json({ generacion: solicitud.app.locals.motor.generacion });
});

module.exports = ruta;