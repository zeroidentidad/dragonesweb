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

const MotorGeneracion = require('./motor.js');

const motor = new MotorGeneracion();

motor.iniciar();

setTimeout(()=>{
	motor.detener();
},20000);

