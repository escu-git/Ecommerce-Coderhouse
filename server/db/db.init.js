//Unificamos la inicialización de todas las bases de datos acá, y exportamos a server.js
const {setDatabase} = require('../../Database/sql/database');

async function initAllDb(){
    await setDatabase(); //MYSQL AND SQLITE3
}

module.exports = initAllDb;