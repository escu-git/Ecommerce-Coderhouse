
const dbSettings = {
    mariaDB:{
        client: 'mysql',
        connection:{
            host:'127.0.0.1',
            port:3306,
            user:'root',
            password:'',
            database:'ecommerce_coderhouse'
        }
    },
    sqLite3:{
        cliente:'sqlite'
    }
};


module.exports=dbSettings;