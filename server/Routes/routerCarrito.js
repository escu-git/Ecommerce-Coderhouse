const express = require('express');
const carrito = require('../controllers/carrito');
const routerCarrito = express.Router();

routerCarrito.get('/listar/:id?', carrito.list )

routerCarrito.post('/agregar/:id', carrito.addProduct)

routerCarrito.delete('/eliminar/:id', carrito.delete)

routerCarrito.post('/adquirir', carrito.adquire);


module.exports = routerCarrito;