const express = require('express');
const initAllDb = require('../server/db/db.init');
const routerProductos = require('./Routes/routerProductos.js');
const routerCarrito = require('./Routes/routerCarrito');
const routerAdmin = require('./Routes/routerAdmin');
const app = express();
const PORT = process.env.PORT || 8080;

initAllDb();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/admin', routerAdmin);
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`)
});