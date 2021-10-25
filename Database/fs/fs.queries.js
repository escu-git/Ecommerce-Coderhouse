const {File} = require('../../server/helpers/classes.js');

async function fsManager(attr, id){
    switch(attr.method){
        case 'GET':
            return fsQueries.list(attr.url, id)
        case 'POST':
            return fsQueries.create(attr.url, obj)
    }
}

const fsQueries ={
    list: async(url, id) =>{//Ver spread operator.
        try{
            const file = url.includes('productos') ? 'productos.txt':'carritos.txt';
            const readFile = await new File(file);
            const result = await readFile.readFile()
            if(id == undefined){
                return result
            }else{
                const findById = result.find(x=>x.id == id)
                return findById
            }
        }catch(err){
            console.log(err)
        }
    },
    create: async(url, obj)=>{

    }
}

module.exports = fsManager;