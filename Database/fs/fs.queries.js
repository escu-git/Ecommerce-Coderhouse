const {File, Product} = require('../../server/helpers/classes.js');
const { requestDB } = require('../../server/helpers/functions.js');

async function fsManager(attr, obj){
    switch(attr.method){
        case 'GET':
            return fsQueries.list(attr.url, obj)
        case 'POST':
            return fsQueries.create(attr.url, obj)
    }
}

const fsQueries ={
    list: async(url, id) =>{//Ver spread operator.
        try{
            const file = url.includes('productos') ? 'productos.txt':'carritos.txt';
            const result = await requestDB(file)
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
        let file;
        console.log(obj)
        try{
            if(url.includes('productos')){
                file = 'productos.txt';
                const{name, description, image, price, stock} = obj;
                let productList = await requestDB(file);

                let newProduct = new Product(name, description, image, price, stock);
                newProduct.setTimeStamp()
                newProduct.setId(productList.length);

                productList.push(newProduct);

                let productFile = await new File(file);
                await productFile.writeFile(productList)
                console.log(newProduct)
                return newProduct
            
            }else if(url.includes('carrito')){
                //Agregar crud carrito
            }
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = fsManager;