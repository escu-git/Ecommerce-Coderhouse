const express = require('express');
const routerAdmin = express.Router();

routerAdmin.get('/db', (req, res)=>{
    const db = process.env.DB_SELECTION;
    res.json({data:`DB en uso: ${db}`})
});

routerAdmin.post('/db', (req, res)=>{
    const{dbSelection}=req.body;
    if(dbSelection >=0 && dbSelection <= 7 && dbSelection !==3){
        process.env['DB_SELECTION']=dbSelection
        res.status(200).json({message:`DB selected:${dbSelection}`})
    }else{
        res.status(400).json({err:`DB ${dbSelection} no disponible`})
    }
})

module.exports= routerAdmin;