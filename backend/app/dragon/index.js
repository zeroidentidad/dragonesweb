const RASGOS = require('../../data/rasgos.json');

const DEFAULT_PROPIEDADES = {
	dragonId: undefined,
	nickname: 'sinnombre',
	generacionId: undefined,
	isPublic: false,
	saleValue: 0,
	sireValue: 0,	
	get nacimientofecha(){ 
		return new Date() 
	},
	get rasgosAleatorios(){
		const rasgos = [];

		RASGOS.forEach(RASGO => {
			const tipoRasgo = RASGO.tipo;
			const valoresRasgo = RASGO.valores;

			const valorRasgo = valoresRasgo[
				Math.floor(Math.random()*valoresRasgo.length)
			];

			rasgos.push({tipoRasgo, valorRasgo});
		});
		
	 return rasgos;
	}
}

class Dragon{
	constructor({ 
		dragonId,
		nacimientofecha,
		nickname,
		rasgos,
		generacionId,
		isPublic,
		saleValue,
		sireValue		
	} = {}){
		this.dragonId = dragonId || DEFAULT_PROPIEDADES.dragonId;
		this.nacimientofecha = nacimientofecha || DEFAULT_PROPIEDADES.nacimientofecha;
		this.nickname = nickname || DEFAULT_PROPIEDADES.nickname;
		this.rasgos = rasgos || DEFAULT_PROPIEDADES.rasgosAleatorios;
		this.generacionId = generacionId || DEFAULT_PROPIEDADES.generacionId;
		this.isPublic = isPublic || DEFAULT_PROPIEDADES.isPublic;
		this.saleValue = saleValue || DEFAULT_PROPIEDADES.saleValue;
		this.sireValue = sireValue || DEFAULT_PROPIEDADES.sireValue;		
	}
}

module.exports = Dragon;