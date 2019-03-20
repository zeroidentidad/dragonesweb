const pool = require('../../poolDB');
const TablaRasgo = require('../rasgo/tabla');

class TablaDragonRasgo{
	static almacenarDragonRasgo({ dragonId, tipoRasgo, valorRasgo }){
		return new Promise ((resuelto, rechazado)=>{
			TablaRasgo.getRasgoId({ tipoRasgo, valorRasgo })
			.then(({ rasgoId })=>{
				pool.query(
					'INSERT INTO rasgoDragon("rasgoId", "dragonId") VALUES($1, $2)',
					[rasgoId, dragonId],
					(error, respuesta) => {
						if(error) return rechazado(error);

						resuelto();
					}
				)
			});
		});
	}
}

module.exports = TablaDragonRasgo;