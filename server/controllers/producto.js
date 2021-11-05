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
            const attr = {
                method:req.method,
                url:req.baseUrl,
                data:req.body
            }
            const result = await dbManager(attr)
            result.success ?
            res.status(201).json({message:`Nuevo producto cargado`, data: result})
            :
            res.status(400).json(result)
        }catch(err){
            res.status(400).json({message:`Error cargando producto:${err}`})
            console.log(err)
        }
    },

    update:async(req, res)=>{
        const attr ={
            method:req.method,
            url:req.baseUrl,
            props:req.body,
            id:req.params.id
        }
        try{
            let response = await dbManager(attr)
            
            response.success ?
            res.status(200).json({response})
            :
            res.status(400).json({response})
        }catch(err){
            res.status(400).json({message:'Ocurrió un error', error:err})
        }
    },

    erase: async(req, res)=>{
        const attr = {
            method:req.method,
            url: req.baseUrl,
            id:req.params.id
        }
        try{
           let response = await dbManager(attr);
           response ?
           res.status(200).json({message: response.message})
           :
            res.status(400).json({message: response.message})
        }catch(err){
            console.log(err)
        }
    }
}

module.exports=products;