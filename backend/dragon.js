const DEFAULT_PROPIEDADES = {
	nickname: 'sinnombre',
	get nacimientofecha(){ return new Date() }
}

class Dragon{
	constructor({ nacimientofecha, nickname } = {}){
		this.nacimientofecha = nacimientofecha || DEFAULT_PROPIEDADES.nacimientofecha;
		this.nickname = nickname || DEFAULT_PROPIEDADES.nickname;
	}
}

module.exports = Dragon;