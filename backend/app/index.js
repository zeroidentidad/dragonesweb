const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MotorGeneracion = require('./generacion/motor');
const RutaDragon = require('./api/dragon');
const RutaGeneracion = require('./api/generacion');
const RutaCuenta = require('./api/cuenta');

const app=express();
const motor = new MotorGeneracion();

app.locals.motor = motor;

app.use(cors({ origin:'http://localhost:1234', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/cuenta', RutaCuenta);
app.use('/dragon', RutaDragon);
app.use('/generacion', RutaGeneracion);


app.use((error, solicitud, respuesta, siguiente)=>{
	const statusCodigo=error.statusCodigo || 500;

	respuesta.status(statusCodigo).json({
		tipo: 'error', mensaje: error.message
	});
});

motor.iniciar();

module.exports = app;