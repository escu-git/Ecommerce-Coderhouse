
const {File} = require('../helpers/classes.js');

const requestDB = async(db) =>{
    try{
        let newFile = new File(db);
        let result = newFile.readFile()
        return result;
    }catch(err){
        console.log(err)
    }
}

module.exports = {requestDB}