const pool = require('../../poolDB');

class TablaDragon{
	static almacenarDragon(dragon){
		const { nacimientofecha, nickname, generacionId } = dragon;

		return new Promise((resuelto, rechazado)=>{
			pool.query(
				`INSERT INTO dragon(nacimientofecha, nickname, "generacionId") 
				VALUES($1,$2,$3) RETURNING id`,
				[nacimientofecha, nickname, generacionId],
				(error, respuesta) => {
					if(error) return rechazado(error);

					const dragonId = respuesta.rows[0].id;

					resuelto({ dragonId });
				}
			)
		});
	}
}

module.exports = TablaDragon;