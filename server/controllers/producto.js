const {Product, File} = require('../helpers/classes.js');
const {requestDB} = require('../helpers/functions.js');
const PRODUCTOS_FILE = 'productos.txt';
const dbSettings = require('../../Database/sql/db_config');
const dbManager = require('../db/db.manager.js');
const {mariaDB} = dbSettings;
const db = require('knex')(mariaDB);
const PRODUCTS = "products";

const products ={
    list: async(req, res)=>{
        const{id}=req.params;
        const attr ={
            method:req.method,
            url:req.url
        }
        //AL MANAGER DE DATABASES:
        const result = await dbManager(attr, id);
        
        res.status(200).json({message:`Query exitosa`, data:result})
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