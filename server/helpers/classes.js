const fs = require('fs');

class Product{
    constructor(name, description, image, price, stock){
        this.name = name,
        this.description = description,
        this.image = image,
        this.price = price,
        this.stock = stock
    }
    setId(lastId){
        this.id= lastId+1
    }
    setTimeStamp(){
        let now = new Date().toLocaleDateString("es-ES");
        this.timeStamp = now;
    }
}

class File{
    constructor(file){
        this.file = file;
    };

    async writeFile(prod){
        try{
            let file = `server/files/${this.file}`
            fs.writeFileSync(file, JSON.stringify(prod))
        }catch(err){
            console.log(err)
        }
    };

     async readFile(){
        try{
            let fileData = await fs.readFileSync(`server/files/${this.file}`, 'utf-8')
            let result = JSON.parse(fileData);
            return result
        }catch(err){
            console.log(err)
        }
    };
}

class Carrito{
    constructor(userName, products){
        this.userName = userName,
        this.products = products
    }
    setId(lastId){
        this.id=lastId+1;
    }
    calcTotalPrice(products){
        let prices = products.map(x=>x.price);
        let totalPrice = prices.reduce((a,b)=>a+b);
        this.totalPrice = totalPrice;
    }
    setTimeStamp(){
        let now = new Date().toLocaleDateString("es-ES");
        this.timeStamp = now;
    }
}
module.exports={Product, File, Carrito}