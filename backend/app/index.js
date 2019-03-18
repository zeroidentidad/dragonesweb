/*const Dragon = require('./dragon.js');
const Generacion = require('./generacion.js');

const generacion = new Generacion();
console.log('generacion',generacion);

const gooby = generacion.nuevoDragon();
console.log('gooby',gooby);

setTimeout(()=>{
	const mimar = generacion.nuevoDragon();
	console.log('mimar',mimar);
}, 15000);*/
const express = require('express');
const MotorGeneracion = require('./generacion/motor');

const app=express();
const motor = new MotorGeneracion();

motor.iniciar();

setTimeout(()=>{
	motor.detener();
},20000);

app.get('/dragon/nuevo',(solicitud, respuesta)=>{
	respuesta.json({ dragon:motor.generacion.nuevoDragon() });
});

module.exports = app;