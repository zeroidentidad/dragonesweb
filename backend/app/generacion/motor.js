const Generacion = require('./index');
const TablaGeneracion = require('./tabla');

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
		const generacion = new Generacion();

		TablaGeneracion.almacenarGeneracion(generacion)
		.then(({ generacionId })=>{
			this.generacion = generacion;
			this.generacion.generacionId = generacionId;

			console.log('Nueva generación', this.generacion);

			this.timer = setTimeout(
				()=>this.construirNuevaGeneracion(),
				this.generacion.expiracion.getTime() - Date.now()
			);
		})
		.catch(error=>console.error(error));
	}
}

module.exports = MotorGeneracion;