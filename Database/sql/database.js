const dbSettings = require('./db_config');
const {mariaDB, sqLite3} = dbSettings;
const db = require('knex');

const INITIAL_PRODUCTS = [
    {
        name:'Intense Cat',
        description:'Cat artwork',
        image:"https://firebasestorage.googleapis.com/v0/b/deco-etcetera.appspot.com/o/cuadro9.jpg?alt=media&token=45ca2bc7-d7d0-48c4-8695-ded7e54896b9",
        price:300,
        stock:12,
        timeStamp:"02/10/2021"
    },
    {
        name:'Cactus',
        description:'Cactus artwork',
        image:"https://firebasestorage.googleapis.com/v0/b/deco-etcetera.appspot.com/o/cuadro2.jpg?alt=media&token=05211aa9-1d31-461e-9755-3984def842a9",
        price:400,
        stock:120,
        timeStamp:"04/10/2021"
    },
];

const INITIAL_USERS = [
    {
        name:'Pablo Escudero',
        email:'escu@gmail.com',
        password:'password1234'
    }
]

const setInitial = async()=>{
    await db(mariaDB)('productos').insert(INITIAL_PRODUCTS)
    db(mariaDB)('users').insert(INITIAL_USERS)
    .then(x=>{
        console.log(x)
    })
    .catch(err=>{
        console.log(err)
    })
}

const productsDB = async() =>{
    db(mariaDB).schema.createTable('productos', table=>{
        table.increments('id'),
        table.string('name'),
        table.integer('price'),
        table.string('description'),
        table.string('image'),
        table.integer('stock'),
        table.string('timeStamp')
    })
    .then(x=>{
        console.log('La tabla products fue creada correctamente ✔');
    })
    .then(x=>setInitial())
    .catch(err=>{console.error(`Products DB message:`)
    console.log(err)})
};

const carritosDB = async()=>{
    db(mariaDB).schema.createTable('carritos', table=>{
        table.increments('id'),
        table.string('user'),
        table.integer('totalPrice'),
        table.string('timeStamp')
    })
    .then(x=>{
        console.log('La tabla carritos fue creada correctamente ✔');
    })
    .then(x=>setInitial())
    .catch(err=>{console.error(`Products DB message:`)
    console.log(err)})
}

const usersDB = async()=>{
    db(mariaDB).schema.createTable('users', user=>{
        user.increments('id'),
        user.string('name'),
        user.string('email'),
        user.string('password')
    })
    .then(x=>{
        console.log('La tabla users fue creada correctamente ✔');
    })
    .catch(err=>console.error(`DB message: ${err}`))
};

const setDatabase = () =>{
    //Chequeamos que las base de datos no existan, para evitar warnings de knex:
    try{
        db(mariaDB).schema.hasTable('productos').then(exists =>{
            if(!exists){
                productsDB();
            }else{
                console.log('Products table already exists ✔');
            }
        });
        db(mariaDB).schema.hasTable('users').then(exists=>{
            if(!exists){
                usersDB();
            }else{
                console.log('Users table already exists ✔')
            }
        db(mariaDB).schema.hasTable('carritos').then(exists=>{
            if(!exists){
                carritosDB()
            }else{
                console.log('La tabla carritos ya existe ✔')
            }
        })
        })
        return 'Ok setDatabase'
    }catch(err){
        console.log(err);
        return err
    }
}
module.exports = {setDatabase};