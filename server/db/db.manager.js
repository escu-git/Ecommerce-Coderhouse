const fsManager = require('../../Database/fs/fs.queries')
const firebaseManager = require('../../Database/firebase/firebase.queries')
const mongoManager = require('../../Database/mongodb/mongo.queries')
const sqlManager = require('../../Database/sql/sql.queries.js');
const sqLite3Manager = require('../../Database/sqlite3/sqlite3.queries');
const memoryManager = require('./memory');

async function dbManager(attr, obj){
    switch(process.env.DB_SELECTION){
        case '0'://Memoria
            return memoryManager(attr, obj)
        case '1' ://File system
            return fsManager(attr, obj)
        case '2'://Mysql
            return sqlManager(attr, obj)
        case '4'://Sqlite3
            return sqLite3Manager(attr)
        case '5'://MongoDB
            return mongoManager(attr);
        case '7'://Firebase
            return firebaseManager(attr)
    }
}

module.exports = dbManager;