const dbManager = require('../db/db.manager.js');

const products ={
    list: async(req, res)=>{
        const{id}=req.params;
        const attr ={
            method:req.method,
            url:req.baseUrl
        }
        //AL MANAGER DE DATABASES:
        const result = await dbManager(attr, id);
        
        res.status(200).json({message:`Query exitosa`, data:result})
    },

    save: async(req, res)=>{
        try{
            const{name, description, image, price, stock} = req.body;
            const attr = {
                method:req.method,
                url:req.baseUrl
            }
            const newProduct = await dbManager(attr, req.body)

            res.status(201).json({message:`Nuevo producto cargado`, data: newProduct});
        }catch(err){
            res.status(400).json({message:`Error cargando producto:${err}`})
            console.log(err)
        }
    },

    update:async(req, res)=>{
        const{id}=req.params;
        const attr ={
            method:req.method,
            url:req.baseUrl,
            props:req.body
        }
        try{
            let response = await dbManager(attr, id)

            response.success ?
            res.status(200).json({response})
            :
            res.status(400).json({response})
        }catch(err){
            res.status(400).json({message:'Ocurrió un error', error:err})
        }
    },

    erase: async(req, res)=>{
        const {id} = req.params;
        const attr = {
            method:req.method,
            url: req.baseUrl
        }
        try{
           let response = await dbManager(attr, id);
           response.success ?
           res.status(200).json({message: response.message, data:response.data})
           :
            res.status(400).json({message: response.message})
        }catch(err){
            console.log(err)
        }
    }
}

module.exports=products;