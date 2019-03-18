const Dragon = require('./dragon.js');
const { REFRESH_RATE, SEGUNDOS } = require('./config.js');

const refreshRate = REFRESH_RATE * SEGUNDOS;

class Generacion{
	constructor(){
		this.expiracion = this.calcularExpiracion();
	}

	calcularExpiracion(){
		const periodoExpiracion = Math.floor(Math.random() * (refreshRate/2));

		const msHastaExpiracion = Math.random() < 0.5 ? 
			refreshRate - periodoExpiracion :
			refreshRate + periodoExpiracion;

		return new Date(Date.now()+msHastaExpiracion);
	}

	nuevoDragon(){
		if(Date.now()>this.expiracion){
			throw new Error(`Esta generación expiro en ${this.expiracion}`);
		}


		return new Dragon();
	}
}

module.exports = Generacion;