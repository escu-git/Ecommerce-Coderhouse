const {Product, File} = require('../helpers/classes.js');
const {dbQuery} = require('../helpers/functions.js');
const {requestDB} = require('../helpers/functions.js');
const PRODUCTOS_FILE = 'productos.txt';
const dbSettings = require('../../Database/db_config');
const {mariaDB} = dbSettings;
const db = require('knex')(mariaDB);
const PRODUCTS = "products";
const USERS = "users";

const products ={
    list: async(req, res)=>{
        const{id}=req.params
        //Consulto la 'base de datos en el .txt:
        const allProducts = await dbQuery.getAllData(db, PRODUCTS)
        .then(rows=>rows);
        console.log(allProducts);
        // //Check de que el array de productos no está vacío:
        // if(knex.from('products').select("*")<1){
        //     res.status(404).json({message:'No hay productos en la base de datos'})
        // }else if(id){
        //     //Busqueda del producto en el array de productos:
        //     let requestedProduct = knex.select(id).from('products')

        //     //Response por la existencia o no existencia del producto:
        //     requestedProduct? res.status(200).json({message:`El producto ${id} fue encontrado exitosamente`,data:requestedProduct}) : res.status(404).json({message:'El producto solicitado no existe'});         
        // }else{
        //     res.status(200).json({data:knex.from('products').select("*")})
        // }
    },

    save: async(req, res)=>{
        try{
            const{name, description, image, price, stock} = req.body;

            //Check de que no faltan datos:
            (!name, !description, !image, !price, !stock) && res.status(400).json({message:'Faltan datos para guardar correctamente el producto'})

            //Consulto la 'base de datos' en el .txt
            let productList = await requestDB(PRODUCTOS_FILE);

            //Nuevo producto y asignación de id/fecha:
            let newProduct = new Product(name, description, image, price, stock);
            newProduct.setId(productList.length)
            newProduct.setTimeStamp()

            //Push a array de productos y sobre-escritura de .txt
            productList.push(newProduct)
            let productFile = new File(PRODUCTOS_FILE);
            productFile.writeFile(productList)

            res.status(201).json({message:`Nuevo producto cargado`, data:newProduct});
        }catch(err){
            res.status(400).json({message:`Error cargando producto:${err}`})
        }
    },

    update:async(req, res)=>{
        const{id}=req.params;
        const{name, description, image, price, stock} = req.body;
        try{
            let productList = await requestDB(PRODUCTOS_FILE);
            let requestedProduct = productList.findIndex(x=>x.id == id);
            
            let updatedProduct = productList[requestedProduct];
            
            
            updatedProduct= {id:updatedProduct.id,
                timeStamp:updatedProduct.timeStamp,
                name:name, description:description,
                image:image,
                price:price,
                stock:stock
            }
            
            let result = productList.splice(requestedProduct, 1, updatedProduct);
            console.log(result)
            console.log(productList)

            let productFile = new File(PRODUCTOS_FILE)
            productFile.writeFile(productList);
    
            res.status(200).json({message:`Producto ${id} fue modificado correctamente`, data:updatedProduct})
        }catch(err){
            res.status(400).json({message:'Ocurrió un error', error:err})
        }
    },

    erase: async(req, res)=>{
        const {id} = req.params;
        try{
            let productList = await requestDB(PRODUCTOS_FILE);
            let requestedProduct = productList.findIndex(x=>x.id == id);
            if(requestedProduct){
                let deletedProduct = productList.splice(requestedProduct,1);
                let productFile = new File(PRODUCTOS_FILE)
                productFile.writeFile(productList);
        
                res.status(200).json({message:`Producto ${id} fue eliminado permanentemente`, data:deletedProduct})
            }else{
                res.status(400).json({message:'Ocurrió un error'})
            }
        }catch(err){
            console.log(err)
        }
    }
}

module.exports=products;