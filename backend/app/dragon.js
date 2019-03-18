const RASGOS = require('../data/rasgos.json');

const DEFAULT_PROPIEDADES = {
	nickname: 'sinnombre',
	generacionId: undefined,
	get nacimientofecha(){ return new Date() },
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
	constructor({ nacimientofecha, nickname, rasgos, generacionId } = {}){
		this.nacimientofecha = nacimientofecha || DEFAULT_PROPIEDADES.nacimientofecha;
		this.nickname = nickname || DEFAULT_PROPIEDADES.nickname;
		this.rasgos = rasgos || DEFAULT_PROPIEDADES.rasgosAleatorios;
		this.generacionId = generacionId || DEFAULT_PROPIEDADES.generacionId;
	}
}

module.exports = Dragon;