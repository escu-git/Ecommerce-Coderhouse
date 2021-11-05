const {requestDB} = require('../helpers/functions.js');
const {Carrito, File} = require('../helpers/classes.js');
const dbManager = require('../db/db.manager.js');
const CARRITOS_FILE = 'carritos.txt';
let tempCarrito = [];

const carrito = {
    list: async(req, res)=>{
        const{id}=req.params
        const attr = {
            method: req.method,
            url:req.baseUrl,
        }
        try{
            console.log('entro')
            const result = await dbManager(attr, id);
            res.status(200).json({message:`Query exitosa`, data:result})
        }catch(err){
            res.json({message:'Ocurrió un error', err:err})
        }
    },
    addProduct: async(req, res)=>{
        try{
            const{id} = req.params
            console.log(id)
            let checkProduct = tempCarrito.find(x=>x.id == id);
            const attr={
                method:'GET',
                url:'productos'
            }
            if(checkProduct !== undefined){
                res.status(400).json({message:`El producto: ${id} ya existe en su carrito.`})
            }else{
                //Check de que no faltan datos:
                (!id) && res.status(400).json({message:'Faltan datos para guardar correctamente el producto en el carrito'})

                let result = await dbManager(attr, id);
                console.log(result)
                if(result.success){
                    tempCarrito.push(result)
                    console.log(tempCarrito)
                    res.status(201).json({message:`Nuevo producto cargado al carrito`, data:result, carrito:tempCarrito});
                }else{
                    res.status(400).json({message:'El producto a agregar no existe'});
                }
            }
        }catch(err){
            res.status(400).json({message:`Error cargando producto:${err}`})
        }
    },

    delete:(req, res)=>{
        const {id}= req.params;
        let searchProductInCart = tempCarrito.find(x=>x.id == id);
        if(searchProductInCart !== undefined){
            let productIndex = tempCarrito.findIndex(x=> x ==   searchProductInCart);
            console.log(productIndex)
            tempCarrito.splice(productIndex,1);
        res.status(200).json({
            message:`El producto ${id} fue eliminado de su carrito`,
            data:tempCarrito, carrito:tempCarrito
        })
        }else{
            res.status(400).json({
                message:`El producto ${id} no fue hallado en su carrito`,
                data:tempCarrito
            })
        }
    },

    adquire: async(req, res)=>{
        console.log(tempCarrito)
        const attr = {
            method:req.method,
            url:req.baseUrl,
            data:{
                body:req.body,
                products:tempCarrito
            }
        }
        const{userName}=req.body;
        !userName && res.status(400).json({message:'Por favor, loguee para adquirir productos'});
        tempCarrito.length == 0 && res.status(400).json({message:'No posee productos en su carrito'});
        
        const result = await dbManager(attr)
        tempCarrito=[];

        result.success?
        res.status(200).json(result)
        :
        res.status(400).json(result)
    }
}

module.exports=carrito;