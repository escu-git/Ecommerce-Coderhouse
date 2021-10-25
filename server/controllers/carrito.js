const {requestDB} = require('../helpers/functions.js');
const {Carrito, File} = require('../helpers/classes.js');
const CARRITOS_FILE = 'carritos.txt';
const PRODUCTOS_FILE = 'productos.txt';
let tempCarrito = [];

const carrito = {
    list: async(req, res)=>{
        const{id}=req.params
        const baseUrl = req.baseUrl;
        const result = await list(baseUrl, id);
        res.status(200).json({message:`Query exitosa`, data:result})
    },

    addProduct: async(req, res)=>{
        try{
            const{id} = req.params;
            let checkProduct = tempCarrito.find(x=>x.id == id);
            console.log(checkProduct)
            if(checkProduct !== undefined){
                res.status(400).json({message:`El producto: ${id} ya existe en su carrito.`})
            }else{
                //Check de que no faltan datos:
                (!id) && res.status(400).json({message:'Faltan datos para guardar correctamente el producto en el carrito'})
    
                let productList = await requestDB(PRODUCTOS_FILE);
                productToAdd = productList.find(x=>x.id == id);
                productToAdd ==null && res.status(400).json({message:'El producto a agregar no existe'});
                
                tempCarrito.push(productToAdd)
                res.status(201).json({message:`Nuevo producto cargado al carrito`, data:productToAdd, carrito:tempCarrito});
            }
        }catch(err){
            res.status(400).json({message:`Error cargando producto:${err}`})
        }
    },

    delete:(req, res)=>{
        const {id}= req.params;
        let searchProductInCart = tempCarrito.find(x=>x.id == id);
        if(searchProductInCart !== undefined){
            let productIndex = tempCarrito.findIndex(x=> x ==   searchProductInCart);
            console.log(productIndex)
            tempCarrito.splice(productIndex,1);
        res.status(200).json({
            message:`El producto ${id} fue eliminado de su carrito`,
            data:tempCarrito, carrito:tempCarrito
        })
        }else{
            res.status(400).json({
                message:`El producto ${id} no fue hallado en su carrito`,
                data:tempCarrito
            })
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