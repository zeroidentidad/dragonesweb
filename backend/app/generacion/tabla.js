const pool = require('../../poolDB');

class TablaGeneracion{
	static almacenarGeneracion(generacion){
		return new Promise((resuelto, rechazado)=>{
			pool.query('INSERT INTO generacion(expiracion) VALUES($1) RETURNING id',
			[generacion.expiracion],
				(error, respuesta)=>{
					if(error) return rechazado(error);

					const generacionId = respuesta.rows[0].id;

					resuelto({ generacionId });
					//return generacionId;
				}
			);
		});
	}
}

module.exports = TablaGeneracion;