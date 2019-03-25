const pool = require('../../poolDB');
const TablaDragonRasgo = require('../dragonRasgo/tabla');

class TablaDragon{
	static almacenarDragon(dragon){
		const { nacimientofecha, nickname, generacionId, isPublic, saleValue, sireValue } = dragon;

		return new Promise((resuelto, rechazado)=>{
			pool.query(
				`INSERT INTO dragon(nacimientofecha, nickname, "generacionId", "isPublic", "saleValue", "sireValue") 
				VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
				[nacimientofecha, nickname, generacionId, isPublic, saleValue, sireValue],
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


	static getDragon({ dragonId }){
		return new Promise ((resuelto, rechazado) =>{
			pool.query(
				`SELECT nacimientofecha, nickname, "generacionId", "isPublic", "saleValue", "sireValue" 
				FROM dragon WHERE dragon.id = $1`,
				 [dragonId],
				 (error, respuesta)=>{
				 	if (error) return rechazado(error);

				 	if (respuesta.rows.length===0) return rechazado(new Error('Sin Dragon'));

				 	resuelto(respuesta.rows[0]);
				 }
			)
		});
	}

  static updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue }) { 
    const settingsMap = { nickname, isPublic, saleValue, sireValue };

    const validQueries = Object.entries(settingsMap).filter(([settingKey, settingValue]) => {
      if (settingValue !== undefined) {
        return new Promise((resuelto, rechazado) => {
          pool.query(
            `UPDATE dragon SET "${settingKey}" = $1 WHERE id = $2`,
            [settingValue, dragonId],
            (error, response) => {
              if (error) return rechazado(error);

              resuelto();
            }
          )
        });
      }
    });

    return Promise.all(validQueries);
  }

}

/*TablaDragon.getDragon({ dragonId: 3 })
.then(dragon => console.log(dragon))
.catch(error => console.error('error',error));*/

module.exports = TablaDragon;