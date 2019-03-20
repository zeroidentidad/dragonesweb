const pool = require('../../poolDB');
const TablaDragonRasgo = require('../dragonRasgo/tabla');

class TablaDragon{
	static almacenarDragon(dragon){
		const { nacimientofecha, nickname, generacionId } = dragon;

		return new Promise((resuelto, rechazado)=>{
			pool.query(
				`INSERT INTO dragon(nacimientofecha, nickname, "generacionId") 
				VALUES($1, $2, $3) RETURNING id`,
				[nacimientofecha, nickname, generacionId],
				(error, respuesta) => {
					if(error) return rechazado(error);

					const dragonId = respuesta.rows[0].id;

					Promise.all(dragon.rasgos.map(({ tipoRasgo, valorRasgo })=>{
						return TablaDragonRasgo.almacenarDragonRasgo({
							dragonId, tipoRasgo, valorRasgo
						});
					}))
					.then(() => resuelto({ dragonId }))
					.catch(error => rechazado(error));
				}
			)
		});
	}
}

module.exports = TablaDragon;