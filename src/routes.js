const {Router} = require("express")
const routes = Router()
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userExtractor = require("./middlewares/userExtractor")

routes.post('/register', async(req, res)=>{
    const user = req.body;
    //filtro para saber si ingresaron los campos
    if(!(user.email && user.username && user.password)){
        return res.status(401).json({status: 401, mensaje: "Username y password son nesesarios"})
    }

    req.getConnection((err, conn)=>{
        if(err) { return res.send(err)}
        //filtro para saber si el email ya a sido usado
        conn.query("SELECT * FROM User WHERE email = ?", [user.email],async (err, rows)=>{
            try {
                //si rows.length es mayor a 0 el email esta usado, y lo envia al catch
                if(rows.length > 0){ throw new Error()}
                //encripta la contrasena
                const salt = await bcrypt.genSalt(5); 
                user.password = await bcrypt.hash(user.password, salt);
                //genera un id al usuario
                user.id = crypto.randomBytes(5).toString("hex");
                //genera el JWT
                const token = GenerarToken(user.id)

                req.getConnection((err, conn)=>{
                    if(err) { return res.send(err)}
                    //inserta el usuario a la db
                    conn.query("INSERT INTO User set ?", [user], (err, rows)=>{
                        if(err) { return res.send(err) }
                        return res.status(200).json({status: 200, mensaje: "Usuario Registrado", token: token})
                        
                    })  
                })
            } catch (error) {
                return res.status(401).json({status: 401, mensaje: "El email ya esta registrado"})
            }
        })  
    }) 
})

routes.post('/login', async(req, res)=>{
    const {email, password} = req.body

    if(!(email && password)){
        return res.status(401).json({status: 401, mensaje: "Email y password son nesesarios"})
    }
    
    //busca el email en db
    req.getConnection((err, conn)=>{
        conn.query("SELECT * FROM User WHERE email = ?", [email], async(err, rows)=>{
            try {
                //usuario registrado en la db
                const user = rows[0];
                //valida y la contrasena ingresada es igual con la de la db
                passIsValid = await bcrypt.compare(password, user.password);
                if(!passIsValid){
                    throw new Error()
                }
                //genera el token
                const token =GenerarToken(user.id);
                
                return res.json({status: 200, mensaje: "Usuario Logueado" ,user: user.username, token: token })
 
            } catch (error) {
                return res.status(401).json({status: 401, mensaje: "Email o password invalida"})
            }
        })
    })
})

function GenerarToken(userId){
    return jwt.sign( {userId}, process.env.SECRET, { expiresIn: 60 * 60 * 24});
}




//CRUD
routes.get('/product',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) { return res.send(err) }
        
        conn.query("SELECT * FROM Product", (err, rows)=>{
            if(err) { return res.send(err) }
            res.json(rows);
        })   
    })
})

//userExtractor es un middleware que verifica el JWT
routes.post('/product',userExtractor,(req, res)=>{
    const newProduct = req.body;
    //crea un id para el producto
    newProduct.idProduct = crypto.randomBytes(5).toString("hex");
    //console.log(newProduct)
    req.getConnection((err, conn)=>{
        if(err) { return res.send(err)}
        conn.query("INSERT INTO Product set ?", [newProduct], (err, rows)=>{
            if(err) { return res.send(err) }
            res.json(rows);
        })
    })
})

routes.put('/product/:id',userExtractor,(req, res)=>{
    
    req.getConnection((err, conn)=>{
        if(err) { return res.send(err) }
          
        conn.query("UPDATE Product set ? WHERE idProduct = ?",[req.body, req.params.id], (err, rows)=>{
            if(err) { return res.send(err) }
            res.json(req.body)
        })
    }) 
    
})

routes.delete('/product/:id',userExtractor,(req, res)=>{
    
    req.getConnection((err, conn)=>{
        if(err) { return res.send(err) }
        
        conn.query("DELETE FROM Product WHERE idProduct = ?",[req.params.id ], (err, rows)=>{
            if(err) { return res.send(err) }
            res.json({rows})
        })
    })
})


module.exports = routes
