const pool = require('../../poolDB');

class TablaCuentaDragon {
  static almacenarCuentaDragon({ cuentaId, dragonId }) {
    return new Promise((resuelto, rechazado) => {
      pool.query(
        'INSERT INTO cuentaDragon("cuentaId", "dragonId") VALUES($1, $2)',
        [cuentaId, dragonId],
        (error, respuesta) => {
          if (error) return rechazado(error);

          resuelto();
        }
      )
    });
  }

  static getDragonesCuenta({ cuentaId }) {
    return new Promise((resuelto, rechazado) => {
      pool.query(
        'SELECT "dragonId" FROM cuentaDragon WHERE "cuentaId" = $1',
        [cuentaId],
        (error, respuesta) => {
          if (error) return rechazado(error);

          resuelto({ cuentaDragones: respuesta.rows }); // fix final que coincidiera con props front end
        }
      )
    })
  }

  static getCuentaDragon({ dragonId }) {
    return new Promise((resuelto, rechazado) => {
      pool.query(
        'SELECT "cuentaId" FROM cuentaDragon WHERE "dragonId" = $1',
        [dragonId],
        (error, respuesta) => {
          if (error) return rechazado(error);

          resuelto({ cuentaId: respuesta.rows[0].cuentaId });
        }
      )
    });
  };

  static updateCuentaDragon({ dragonId, cuentaId }) {
    return new Promise((resuelto, rechazado) => {
      pool.query(
        'UPDATE cuentaDragon SET "cuentaId" = $1 WHERE "dragonId" = $2',
        [cuentaId, dragonId],
        (error, respuesta) => {
          if (error) return rechazado(error);

          resuelto();
        }
      )
    });
  }
  
}

module.exports = TablaCuentaDragon;