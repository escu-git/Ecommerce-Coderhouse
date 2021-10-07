const jwt = require('jsonwebtoken');
require('dotenv').config();

const validate ={
    isAdmin: async(req, res, next)=>{
        let mockAdminRole = true;
        mockAdminRole ==true ? console.log('Is admin✔') : res.status(403).json({message:'Acceso denegado'})
        next()
    //     try{
    //         const bearerHeader = req.headers['authorization'];
    //         console.log(process.env.ACCES_TOKEN_SECRET)
    //         if(bearerHeader){
    //             const token = bearerHeader.split(' ')[1];
    //             if(token === null) return res.status(403).json({message:'Token invalido'});
    //             console.log(bearerHeader)
    //             jwt.verify(token, fakeEnv, (err, user)=>{
    //                 if(err) return res.json({err});
    //                 console.log(`Usuario validado correctamente`)
    //                 next()
    //             });
    //             next()  
    //         }else{
    //             res.status(403).json({message:'Acceso denegado'})
    //         }
    //     }catch(err){
    //         res.status(403).json({message:err})
    //     }
    },
    
    loggedUser: (req, res, next)=>{
        const mockedLoggedUser = true;
        mockedLoggedUser == true ? console.log('Registered user Logged in ✔') : res.status(401).json({message:'Por favor, loguee/registre su usuario para avanzar'})
        next()
    }
}

module.exports= validate;