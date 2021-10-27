const {File, Product} = require('../../server/helpers/classes.js');
const { requestDB } = require('../../server/helpers/functions.js');

async function fsManager(attr, obj){
    switch(attr.method){
        case 'GET':
            return fsQueries.list(attr.url, obj)
        case 'POST':
            return fsQueries.create(attr.url, obj)
        case 'DELETE':
            return fsQueries.remove(attr.url, obj)
        case 'PUT':
            return fsQueries.update(attr, obj)
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
    },
    remove: async(url, id)=>{
        let file = url.includes('productos')? 'productos.txt': 'carritos.txt';
        let productList = await requestDB(file);
        let requestedProduct = productList.findIndex(x=>x.id == id);
        if(requestedProduct >= 0){
            let deletedProduct = productList.splice(requestedProduct,1);
            let productFile = await new File(file)
            await productFile.writeFile(productList);
            return {
                message:`Id ${id} fue eliminado`,
                data: deletedProduct, 
                success: true
            }
        }else{
            return {
                message:`Id ${id} no fue encontrado`, 
                success:false
            }
        }
    },
    update: async(attr, id)=>{
        const{name, description, image, price, stock} = attr.props;
            let file = attr.url.includes('productos')? 'productos.txt': 'carritos.txt';
            let productList = await requestDB(file);
            let requestedProduct = productList.findIndex(x=>x.id == id);
            if(requestedProduct >=0){
                let updatedProduct = productList[requestedProduct];
                updatedProduct= {
                    id:updatedProduct.id,
                    timeStamp:updatedProduct.timeStamp,
                    name:name, description:description,
                    image:image,
                    price:price,
                    stock:stock
                }
                
                let result = productList.splice(requestedProduct, 1, updatedProduct);
                console.log(result)
    
                let productFile = await new File(file)
                await productFile.writeFile(productList);
                return {
                    message:`Producto ${id} fue modificado correctamente`, 
                    data:updatedProduct,
                    success:true
                }
            }else{
                return {
                    message:`Producto ${id} no fue encontrado`,
                    success:false
                }
            }
    }
}

module.exports = fsManager;