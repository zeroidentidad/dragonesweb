const Dragon = require('../dragon');
const { REFRESH_RATE, SEGUNDOS } = require('../config');

const refreshRate = REFRESH_RATE * SEGUNDOS;

class Generacion{
	constructor(){
		this.cuentaIds = new Set();
		this.expiracion = this.calcularExpiracion();
		this.generacionId = undefined;
	}

	calcularExpiracion(){
		const periodoExpiracion = Math.floor(Math.random() * (refreshRate/2));

		const msHastaExpiracion = Math.random() < 0.5 ? 
			refreshRate - periodoExpiracion :
			refreshRate + periodoExpiracion;

		return new Date(Date.now()+msHastaExpiracion);
	}

	nuevoDragon({ cuentaId }){
		if(Date.now()>this.expiracion){
			throw new Error(`Esta generación expiro en ${this.expiracion}`);
		}

	    if (this.cuentaIds.has(cuentaId)) {
	      throw new Error('Ya tienes un dragón de esta generación.');
	    }

	    this.cuentaIds.add(cuentaId);

		return new Dragon({ generacionId: this.generacionId });
	}
}

module.exports = Generacion;