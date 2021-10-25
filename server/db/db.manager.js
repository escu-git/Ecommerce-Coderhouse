const fsManager = require('../../Database/fs/fs.queries')
const firebaseManager = require('../../Database/firebase/firebase.queries')
const mongoManager = require('../../Database/mongodb/mongo.queries')
const sqlManager = require('../../Database/sql/mysql.queries')

async function dbManager(attr, obj){
    switch(process.env.DB_SELECTION){
        case '0'://Memoria
            console.log('Memoria')
            break
        case '1' ://File system
            return fsManager(attr, obj)
        case '2'://Mysql
            console.log('2222')
            break
        case '4'://Sqlite3
            console.log('333')
            break
        case '5'://MongoDB
            console.log('333')
            break
        case '6'://MongoDBaaS
            console.log('333')
            break
        case '7'://Firebase
            console.log('333')
            break
    }
}


module.exports = dbManager;