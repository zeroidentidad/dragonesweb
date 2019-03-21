/*const Dragon = require('./dragon.js'); const Generacion = require('./generacion.js');
const generacion = new Generacion(); console.log('generacion',generacion);
const gooby = generacion.nuevoDragon(); console.log('gooby',gooby);*/
const express = require('express');
const cors = require('cors');
const MotorGeneracion = require('./generacion/motor');
const RutaDragon = require('./api/dragon');
const RutaGeneracion = require('./api/generacion');

const app=express();
const motor = new MotorGeneracion();

app.locals.motor = motor;

app.use(cors({ origin:'http://localhost:1234' }));

app.use('/dragon', RutaDragon);
app.use('/generacion', RutaGeneracion);


app.use((error, solicitud, respuesta, siguiente)=>{
	const statusCodigo=error.statusCodigo || 500;

	respuesta.status(statusCodigo).json({
		tipo: 'error', mensaje: error.message
	});
});

motor.iniciar();

/*setTimeout(()=>{ motor.detener(); },20000);*/

module.exports = app;