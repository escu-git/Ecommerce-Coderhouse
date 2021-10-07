const express = require('express');
const carrito = require('../controllers/carrito');
const validate = require('../middlewares/userValidation.js');
const routerCarrito = express.Router();

routerCarrito.get('/listar/:id?', validate.loggedUser, carrito.list )

routerCarrito.post('/agregar/:id', carrito.addProduct);

routerCarrito.delete('/eliminar/:id', carrito.delete);

routerCarrito.post('/adquirir', carrito.adquire);


module.exports = routerCarrito;