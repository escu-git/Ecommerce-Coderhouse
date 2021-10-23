const {File} = require('./classes.js');

const requestDB = async(db) =>{
    try{
        let newFile = new File(db);
        let result = newFile.readFile()
        return result;
    }catch(err){
        console.log(err)
    }
}

const dbQuery = {
    getAllData : async(db, table)=>{
        return db
        .select("*")
        .from(table)
        .then(rows=>rows)
    },
    getSpecificById: async(db, table, requestedId)=>{
        return db
        .select("*")
        .from(table)
        .where("id", requestedId)
        .first();
    }
}

module.exports = {requestDB, dbQuery}