const pool = require('../../poolDB');
const { STARTING_BALANCE } = require('../config');

class TablaCuenta {
  static almacenarCuenta({ usernameHash, passwordHash }) {
    return new Promise((resuelto, rechazado) => {
      pool.query(
        `INSERT INTO cuenta("usernameHash", "passwordHash", balance)
         VALUES($1, $2, $3)`,
        [usernameHash, passwordHash, STARTING_BALANCE],
        (error, respuesta) => {
          if (error) return rechazado(error);

          resuelto();
        }
      );
    });
  }

  static getCuenta({ usernameHash }) {
    return new Promise((resuelto, rechazado) => {
      pool.query(
        `SELECT id, "passwordHash", "sesionId", balance FROM cuenta
         WHERE "usernameHash" = $1`,
        [usernameHash],
        (error, respuesta) => {
          if (error) return rechazado(error);

          resuelto({ cuenta: respuesta.rows[0] });
        }
      )
    });
  }

  static updateSesionId({ sesionId, usernameHash }) {
    return new Promise((resuelto, rechazado) => {
      pool.query(
        'UPDATE cuenta SET "sesionId" = $1 WHERE "usernameHash" = $2',
        [sesionId, usernameHash],
        (error, respuesta) => {
          if (error) return rechazado(error);

          resuelto();
        }
      )
    });
  }

  static updateBalance({ cuentaId, value }) {
    return new Promise((resuelto, rechazado) => {
      pool.query(
        'UPDATE cuenta SET balance = balance + $1 WHERE id = $2',
        [value, cuentaId],
        (error, respuesta) => {
          if (error) return rechazado(error);

          resuelto();
        }
      )
    });
  }
  
}

module.exports = TablaCuenta;