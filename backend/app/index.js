/*const Dragon = require('./dragon.js'); const Generacion = require('./generacion.js');
const generacion = new Generacion(); console.log('generacion',generacion);
const gooby = generacion.nuevoDragon(); console.log('gooby',gooby);*/

const express = require('express');
const MotorGeneracion = require('./generacion/motor');
const RutaDragon = require('./api/dragon');
const RutaGeneracion = require('./api/generacion');

const app=express();
const motor = new MotorGeneracion();

app.locals.motor = motor;

app.use('/dragon', RutaDragon);
app.use('/generacion', RutaGeneracion);

motor.iniciar();

/*setTimeout(()=>{
	motor.detener();
},20000);*/

module.exports = app;