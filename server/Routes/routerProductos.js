const express = require('express');
const routerProductos = express.Router();

routerProductos.get('/listar/:id?', (req, res)=>{

});

routerProductos.post('/agregar', (req, res)=>{

});

routerProductos.patch('/actualizar/:id?', (req, res)=>{
    
});

routerProductos.put('/actualizar/:id?', (req, res)=>{
    
});

routerProductos.delete('/actualizar/:id?', (req, res)=>{
    
});

module.exports = {routerProductos};