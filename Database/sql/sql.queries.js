const dbSettings = require('../sql/db_config');
const {mariaDB, sqLite3} = dbSettings;
const db = require('knex');
const { Product, Carrito } = require('../../server/helpers/classes');
const { dbQuery } = require('../../server/helpers/functions');

async function sqlManager(attr, obj){ 
    switch(attr.method){
        case 'GET':
            return sqlQueries.list(attr, obj)
        case 'POST':
            return sqlQueries.create(attr)
        case 'DELETE':
            return sqlQueries.remove(attr)
        case 'PUT':
            return sqlQueries.update(attr)
    }
}

const sqlQueries = {
    list: async(attr, id)=>{
        try{
            const table = attr.url.includes('productos') ? 'productos':'carrito';
            if(!id){
                const result = await db(mariaDB)(table).select("*")
                console.log(result)
                return result
            }else{
                const result = await db(mariaDB)(table).select("*")
                .where('id',id)
                .first()
                return result
            }
        }catch(err){
            return err
        }
    },
    create: async(attr)=>{
        switch(attr.url){
            case 'productos':
                const {name, description, image, price, stock} = attr.data;
                const newProduct = new Product(name, description, image, price, stock);
                newProduct.setTimeStamp()
                const table = attr.url.includes('productos') ? 'productos':'carritos';
                let newInsert = await db(mariaDB)(table)
                .insert(newProduct);
                return newInsert
            case 'carrito':
                console.log('entro')
                const {userName, products} = attr.data;
                const newCarrito = await new Carrito(userName, products);
                newCarrito.setId();
                console.log(newCarrito)
        }
    },
    update: async(attr)=>{
        const id = attr.id;
        const table = attr.url.includes('productos') ? 'productos':'carritos';
        let database = db(mariaDB)
        const queryDB = await dbQuery.getSpecificById(database, table, id)
        let changes = []
        if(queryDB){
            const objAttributes = Object.entries(attr.props);
            objAttributes.forEach(async(x)=>{
                const modify = x[0];
                const newValue = x[1];
                changes.push({propiedad:modify, nuevoValor: newValue})
                await db(mariaDB)(table).where({id:id}).update(modify, newValue);
        })
        return {message: 'Cambios realizados correctamente', cambios:changes}
        }
    },
    remove: async(attr)=>{
        const table = attr.url.includes('productos') ? 'productos':'carritos';
        let database = db(mariaDB)
        const queryDB = await dbQuery.getSpecificById(database, table, attr.id)
        if(queryDB){
            await db(mariaDB)(table)
            .where({id:attr.id})
            .del()
            return {message:`El producto ${attr.id} fue eliminado con exito`}
        }
        else{
            return {message:`El producto ${attr.id} no fue encontrado`} 
        }
    }
}

module.exports=sqlManager;