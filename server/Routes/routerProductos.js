const express = require('express');
const products = require('../controllers/producto.js');
const validate = require('../middlewares/userValidation.js');
const routerProductos = express.Router();

routerProductos.get('/listar/:id?', products.list);

routerProductos.post('/agregar', validate.isAdmin, products.save);

routerProductos.put('/actualizar/:id', validate.isAdmin, products.update );

routerProductos.delete('/eliminar/:id', validate.isAdmin, products.erase);

module.exports = routerProductos;