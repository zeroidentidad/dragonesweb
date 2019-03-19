const pool = require('../poolDB');
const RASGOS = require('./rasgos.json');

RASGOS.forEach(RASGO => {
	const tipoRasgo = RASGO.tipo;
	const valoresRasgo = RASGO.valores;

	valoresRasgo.forEach(valorRasgo => {
		pool.query(
			`INSERT INTO rasgo("tipoRasgo", "valorRasgo") 
			VALUES($1, $2) RETURNING id`,
			[tipoRasgo, valorRasgo],
			(error, respuesta) =>{
				if(error) console.error(error);

				const rasgoId = respuesta.rows[0].id;

				console.log(`Rasgo insertado - id: ${rasgoId}`);
			}
		);
	});
});