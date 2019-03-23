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

/*const test = new Sesion({username: 'alguien'});
const testString = test.toString();
console.log('Sesion.parse(testString)', Sesion.parse(testString));
console.log('Sesion.verify(testString)', Sesion.verify(testString));
const fakeTestString = `admin_${testString}`;
console.log('Sesion.verify(fakeTestString)', Sesion.verify(fakeTestString)); */

module.exports = Sesion;