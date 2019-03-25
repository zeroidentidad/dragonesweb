const base64 = require('base-64');
const Dragon = require('./index');

class Criador {
  static criarDragon({ matron, patron }) {
    const matronRasgos = matron.rasgos;
    const patronRasgos = patron.rasgos;

    const babyRasgos = [];

    matronRasgos.forEach(({ tipoRasgo, valorRasgo }) => {
      const matronRasgo = valorRasgo;

      const patronRasgo = patronRasgos.find(
        rasgo => rasgo.tipoRasgo === tipoRasgo
      ).valorRasgo;

      babyRasgos.push({
        tipoRasgo,
        valorRasgo: Criador.pickRasgo({ matronRasgo, patronRasgo })
      });
    });

    return new Dragon({ nickname: 'Bebé sin nombre', rasgos: babyRasgos });
  }

  // Dos rasgos entrantes: matronRasgo y patronRasgo
  // Los valores de cadena matronRasgo y patronRasgo están codificados.
  // Ambos rasgos tienen sus caracteres sumados.
  // Obtener un rango sumando las sumas de ambos caracteres.
  // Generar un número aleatorio, en ese rango.
  // Si el número es menor que la suma de caracteres de la matrona, selecciona matron.
  // Si no, elige patrón.
  static pickRasgo({ matronRasgo, patronRasgo }) {
    if (matronRasgo === patronRasgo) return matronRasgo;

    const matronRasgoCharSum = Criador.charSum(base64.encode(matronRasgo));
    const patronRasgoCharSum = Criador.charSum(base64.encode(patronRasgo));

    const randNum = Math.floor(Math.random() * (matronRasgoCharSum + patronRasgoCharSum))

    return randNum < matronRasgoCharSum ? matronRasgo : patronRasgo;
  }

  static charSum(string) {
    return string.split('').reduce(
      (sum, character) => sum += character.charCodeAt(),
      0
    );
  }
}

module.exports = Criador;