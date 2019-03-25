const uuid = require('uuid/v4');
const { hash } = require('./ayudante');

const SEPARADOR = '|';

class Sesion {
  constructor({ username }) {
    this.username = username;
    this.id = uuid();
  }

  toString() {
    const { username, id } = this;

    return Sesion.sesionString({ username, id });
  }

  static parse(sesionString) {
    const sesionData = sesionString.split(SEPARADOR);

    return {
      username: sesionData[0],
      id: sesionData[1],
      sesionHash: sesionData[2]
    };
  }

  static verify(sesionString) {
    const { username, id, sesionHash } = Sesion.parse(sesionString);

    const cuentaData = Sesion.cuentaData({ username, id });

    return hash(cuentaData) === sesionHash;
  }

  static cuentaData({ username, id }) {
    return `${username}${SEPARADOR}${id}`;
  }

  static sesionString({ username, id }) {
    const cuentaData = Sesion.cuentaData({ username, id });

    return `${cuentaData}${SEPARADOR}${hash(cuentaData)}`;
  }
}

module.exports = Sesion;