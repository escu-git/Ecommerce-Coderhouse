const {File, Product} = require('../../server/helpers/classes.js');
const {firebase} = require('../../server/helpers/functions.js');
const db = require('./index');
let productsCounter;
let cartCounter;



async function firebaseManager(attr, obj){
    switch(attr.method){
        case 'GET':
            return firebaseQueries.list(attr.url, obj)
        case 'POST':
            return firebaseQueries.create(attr.url, obj)
        case 'DELETE':
            return firebaseQueries.remove(attr.url, obj)
        case 'PUT':
            return firebaseQueries.update(attr, obj)
    }
}

const firebaseQueries ={
    list: async(url, id) =>{//Ver spread operator.
        try{
            const collect = url.includes('productos') ? 'productos':'carritos';
            const result = await firebase.request(collect);
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
        let productosColl =  await db.collection('contadores').get('productos').then(x=>{
            return x.doc()
        });
        let carritosColl = await db.collection('contadores').get('carritos').then(x=>{
            return x.doc()
        });
        productsCounter = productosColl
        cartCounter = carritosColl.cantidad
        console.log(productosColl)

        // try{
        //     if(url.includes('productos')){
        //         coll = 'productos';
        //         const{name, description, image, price, stock} = obj;

        //         let newProduct = new Product(name, description, image, price, stock);
        //         newProduct.setTimeStamp()
        //         newProduct.setId(productList.length);


        //         let productFile = await new File(file);
        //         await productFile.writeFile(productList)
        //         console.log(newProduct)
        //         return newProduct
            
        //     }else if(url.includes('carrito')){
        //         //Agregar crud carrito
        //     }
        // }catch(err){
        //     console.log(err)
        // }
    },
    remove: async(url, id)=>{
        let file = url.includes('productos')? 'productos.txt': 'carritos.txt';
        let productList = await requestFirebase(file);
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
            let productList = await requestFirebase(file);
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

module.exports = firebaseManager;