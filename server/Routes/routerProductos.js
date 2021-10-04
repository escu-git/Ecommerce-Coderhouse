const express = require('express');
const products = require('../middlewares/producto.js');
const validate = require('../middlewares/userValidation.js');
const routerProductos = express.Router();

routerProductos.get('/listar', validate.isAdmin(), products.list());

routerProductos.post('/agregar', (req, res)=>{

});

routerProductos.patch('/actualizar/:id?', (req, res)=>{
    
});

routerProductos.put('/actualizar/:id?', (req, res)=>{
    
});

routerProductos.delete('/actualizar/:id?', (req, res)=>{
    
});

module.exports = routerProductos;