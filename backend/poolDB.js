const { Pool } = require('pg');
const dbConfig = require('./secrets/dbConfig');

const pool = new Pool(dbConfig);

module.exports = pool;

/*pool.query('select * from generacion', (error, respuesta)=>{
	if(error) return console.log('error', error);
	console.log('response.rows', respuesta.rows);
});*/