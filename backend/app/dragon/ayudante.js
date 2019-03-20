const pool = require('../../poolDB');
const TablaDragon = require('./tabla');
const Dragon = require('./index');

const getDragonConRasgos = ({ dragonId }) => {
	return Promise.all([
		TablaDragon.getDragon({ dragonId }),
		new Promise((resuelto, rechazado)=>{
			pool.query(
				`SELECT "tipoRasgo", "valorRasgo"
				 FROM rasgo
				 INNER JOIN rasgoDragon ON
				 rasgo.id = rasgoDragon."rasgoId"
				 WHERE rasgoDragon."dragonId" = $1`,
				 [dragonId],
				 (error, respuesta)=>{
				 	if (error) return rechazado(error);

				 	resuelto(respuesta.rows);
				 }
			)
		})
	])
	.then(([dragon, rasgosDragon])=>{
		return new Dragon({ ...dragon, dragonId, rasgos: rasgosDragon });
	})
	.catch(error => console.error(error));
};

/*getDragonConRasgos({ dragonId: 3 })
.then(dragon => console.log('dragon',dragon))
.catch(error => console.error('error',error));*/

module.exports = { getDragonConRasgos };