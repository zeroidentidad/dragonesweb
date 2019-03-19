const pool = require('../../poolDB');

class TablaRasgo{
	static getRasgoId({ tipoRasgo, valorRasgo }){
		return new Promise((resuelto, rechazado)=>{
			pool.query(
				`SELECT id FROM rasgo WHERE "tipoRasgo" = $1 AND "valorRasgo" = $2`,
				[tipoRasgo, valorRasgo],
				(error, respuesta) =>{
					if (error) return rechazado(error);

					resuelto({ rasgoId: respuesta.rows[0].id });
				}
			);
		});
	}
}

TablaRasgo.getRasgoId({ tipoRasgo:'backgroundColor', valorRasgo: 'verde' })
.then(({ rasgoId }) => { console.log('rasgoId', rasgoId) })
.catch(error => console.error('error', error));

module.exports = TablaRasgo;