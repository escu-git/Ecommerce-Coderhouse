const { response } = require('express');
const {File, Product, Carrito} = require('../../server/helpers/classes.js');
const productsList = [];
const tempCarrito = [];
const carritosList = [{id:1, title:'Carrito1', userName:'Escu', productos:[{id:1, title:'Producto1', price:300}, {id:2, title:'Producto2', price:500}]}, {id:2, title:'Carrito2', userName:'Pepi', productos:[{id:1, title:'Producto1', price:300}]}];

async function memoryManager(attr, obj){
    switch(attr.method){
        case 'GET':
            return memory.list(attr, obj)
        case 'POST':
            return memory.create(attr)
        case 'DELETE':
            return memory.remove(attr.url, obj)
        case 'PUT':
            return memory.update(attr, obj)
    }
};

const memory = {
    list : async(attr, id)=>{
        console.log(attr.url)
        const list = attr.url.includes('productos')? productsList : carritosList;
        if(id == undefined){
            return list;
        }else{
            const result = list.find(array=>array.id==id)
            if(result){
                return {message:`Se encontró id ${id}`, success:true, result:result}
            }else{
                return {message:`No se encontró el id ${id}`, success:false}
            }
        }
    },
    create: async(attr)=>{
        const prodOrCart = attr.url.includes('productos')? productsList : carritosList;
        if(attr.url.includes('productos')){
            const {name, description, image, price, stock} = attr.data;
            const values = [name, description, image, price, stock];
            if(values.includes(undefined)){
                return {message:`Faltan valores`, success:false}
            }else{
                const lastId=findLastId(prodOrCart)
                const newProduct = new Product(name, description, image, price, stock)
                newProduct.setId(lastId);
                newProduct.setTimeStamp()
                productsList.push(newProduct)
                return {message:`Producto fue agregado correctamente`, success:true, product:newProduct}
            }
        }else{
            console.log(attr.data.products)
            const {userName, products}=attr.data;
            const values = [userName, products];
            if(values.includes(undefined)){
                return {message:`Faltan valores`, success:false}
            }else{

                const lastId=lastId(prodOrCart)
                const newCarrito = new Carrito(userName, products);
                newCarrito.setId(lastId);
                newCarrito.calcTotalPrice(products);
                newCarrito.setTimeStamp();

                carritosList.push(newCarrito);
                return {message:`Producto fue agregado correctamente`, success:true, carrito:newCarrito}
            }
        }

    }
}

function findLastId(array){
    const arrayLength = array.length;
    const lastId = arrayLength ==0? 0 : array[arrayLength-1].id;
    return lastId
}


module.exports=memoryManager;