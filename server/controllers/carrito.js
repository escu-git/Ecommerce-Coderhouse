const {requestDB} = require('../helpers/functions.js');
const {Carrito, File} = require('../helpers/classes.js');
const CARRITOS_FILE = 'carritos.txt';
const PRODUCTOS_FILE = 'productos.txt';
let tempCarrito = [];
const carrito = {
    list: async(req, res)=>{
        const{id}=req.params
        //Consulto la 'base de datos en el .txt:
        let carritoList = await requestDB(CARRITOS_FILE);

        //Check de que el array de productos no está vacío:
        if(carritoList<1){
            res.status(404).json({message:'No hay carritos en la base de datos'})
        }else if(id){
            //Busqueda del producto en el array de productos:
            let requestedProduct = carritoList.find(x=>x.id==id);

            //Response por la existencia o no existencia del producto:
            requestedProduct? res.status(200).json({message:`El carrito ${id} fue encontrado exitosamente`,data:requestedProduct}) : res.status(404).json({message:'El carrito solicitado no existe'});         
        }else{
            res.status(200).json({data:carritoList})
        }
    },

    addProduct: async(req, res)=>{
        try{
            const{id} = req.params;

            //Check de que no faltan datos:
            (!id) && res.status(400).json({message:'Faltan datos para guardar correctamente el producto en el carrito'})

            let productList = await requestDB(PRODUCTOS_FILE);
            productToAdd = productList.find(x=>x.id == id)
            !productToAdd && res.status(400).json({message:'El producto a agregar no existe'});
            
            tempCarrito.push(productToAdd)

            res.status(201).json({message:`Nuevo producto cargado al carrito`, data:productToAdd, carrito:tempCarrito});
        }catch(err){
            res.status(400).json({message:`Error cargando producto:${err}`})
        }
    },

    delete:(req, res)=>{
        const {id}= req.params;

        let searchProductInCart = tempCarrito.findIndex(x=>x.id == id);
        if(searchProductInCart){
            tempCarrito.splice(searchProductInCart, 1);
            res.status(200).json({message:`El producto ${id} fue eliminado de su carrito`, data:tempCarrito})

        }else{
            res.status(400).json({message:`El producto ${id} no fue añadido a su carrito`, data:tempCarrito})
        }
    },

    adquire: async(req, res)=>{
        const {userName}=req.body;
        !userName && res.status(400).json({message:'Por favor, loguee para adquirir productos'});
        tempCarrito.length == 0 && res.status(400).json({message:'No posee productos en su carrito'});
        let carritos = await requestDB(CARRITOS_FILE);
        let nuevoCarrito = new Carrito(userName, tempCarrito);
        carritos.length == undefined ? nuevoCarrito.setId(0) : nuevoCarrito.setId(carritos.length);
        nuevoCarrito.setTimeStamp();
        nuevoCarrito.calcTotalPrice(tempCarrito)

        carritos.push(nuevoCarrito)
        
        let carritoFile = new File(CARRITOS_FILE);
        carritoFile.writeFile(carritos)

        tempCarrito=[];

        res.status(200).json({message:`Su carrito fue registrado correctamente con el id: ${nuevoCarrito.id}`, data:nuevoCarrito})
    }
}

module.exports=carrito;