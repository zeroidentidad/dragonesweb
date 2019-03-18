const Generacion = require('./index');

class MotorGeneracion{
	constructor(){
		this.generacion = null;
		this.timer = null
	}

	iniciar(){
		this.construirNuevaGeneracion();
	}

	detener(){
		clearTimeout(this.timer);
	}

	construirNuevaGeneracion(){
		this.generacion = new Generacion();

		console.log('Nueva generación', this.generacion);

		this.timer = setTimeout(
			()=>this.construirNuevaGeneracion(),
			this.generacion.expiracion.getTime() - Date.now()
		);
	}
}

module.exports = MotorGeneracion;