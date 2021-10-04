const express = require('express');
const routerProductos = require('./Routes/routerProductos.js');
const routerCarrito = require('./Routes/routerCarrito');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`)
});
