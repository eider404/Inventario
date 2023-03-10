const {Router} = require("express")
const routes = Router()
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userExtractor = require("./middlewares/userExtractor")
const {EnviarCorreo} = require("./services/sendEmail")

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
        
        conn.query("SELECT Product.idProduct, Product.name, Product.count, Product.value, User.username FROM Product INNER JOIN User ON Product.userId_fk = User.id", (err, rows)=>{
            if(err) { return res.send(err) }
            res.json(rows);
        })   
    })
})

//userExtractor es un middleware que verifica el JWT
routes.post('/product',userExtractor,(req, res)=>{
    const newProduct = req.body;

    //filtro para saber si ingresaron los campos
    if(!(newProduct.name && newProduct.count && newProduct.value)){
        return res.status(401).json({status: 401, mensaje: "Campos obligatorios"})
    }
    
    //crea un id para el producto
    newProduct.idProduct = crypto.randomBytes(5).toString("hex");
    //console.log(newProduct)
    req.getConnection((err, conn)=>{
        if(err) { return res.send(err)}
        conn.query("INSERT INTO Product set ?", [newProduct], (err, rows)=>{
            if(err) { return res.send(err) }
            return res.json({status: 200, mensaje: "Producto agregado" ,data: newProduct})
        })
    })
})

routes.put('/product',userExtractor,(req, res)=>{
    const editProduct = req.body
    //filtro para saber si ingresaron los campos
    if(!(editProduct.name && editProduct.count && editProduct.value && editProduct.idProduct)){
        return res.status(401).json({status: 401, mensaje: "Campos obligatorios"})
    }
    
    req.getConnection((err, conn)=>{
        if(err) { return res.send(err) }
          
        conn.query("UPDATE Product set ? WHERE idProduct = ?",[editProduct, editProduct.idProduct], (err, rows)=>{
            if(err) { return res.send(err) }
            return res.json({status: 200, mensaje: "Producto actualizado" ,data: editProduct, rows: rows})
        })
    }) 
    
})

routes.delete('/product',userExtractor,(req, res)=>{
    //filtro para saber si ingresaron los campos
    if(!(req.body.idProduct)){
        return res.status(401).json({status: 401, mensaje: "Campo obligatorio"})
    }
    
    req.getConnection((err, conn)=>{
        if(err) { return res.send(err) }
        
        conn.query("DELETE FROM Product WHERE idProduct = ?",[req.body.idProduct], (err, rows)=>{
            if(err) { return res.send(err) }
            return res.json({status: 200, mensaje: "Producto eliminado" ,data: req.body.idProduct, rows: rows})
        })
    })
})


//forgot password

routes.post('/forgot-password', (req, res) => {
    const {email} = req.body;

    req.getConnection((err, conn)=>{
        if(err) { return res.send(err)}
        //filtro para saber si el email existe en la db
        conn.query("SELECT * FROM User WHERE email = ?", [email],async (err, rows)=>{
            try {
                if(rows.length == 0){ throw new Error()}
                //res.json({"message": rows})
                const user = rows[0]
                
                //El usuario existe y ahora creara un link valido una sola vez
                const secret = process.env.SECRET +  user.password;
                const token = jwt.sign({id: user.id}, secret, { expiresIn: '15m'});
                const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
                
                //envia el link al correo
                //console.log(link);
                await EnviarCorreo(email,link);

                //responde
                res.status(200).json({status:200, mensaje: "Te hemos enviado un correo electr??nico para restaurar tu contrase??a", data: email})
                
            } catch (error) {
                return res.status(401).json({status: 401, mensaje: "El email no existe"})
            }
        })  
    })
})


routes.get('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params;

    req.getConnection((err, conn)=>{
        if(err) { return res.send(err)}
        //filtro para saber si el email existe en la db
        conn.query("SELECT * FROM User WHERE id = ?", [id],async (err, rows)=>{
            try {
                if(rows.length == 0){ throw new Error()}
                //usuario existente
                const user = rows[0]

                //verificamos si id 
                if(id !== user.id){
                    return res.send('id invalido');
                }

                //id valido y verificamos su token, si ocurre un error al verificar, ira al catch
                const secret = process.env.SECRET +  user.password;
                const posibleError = jwt.verify(token,secret)
                
                pathRoot = __dirname.replace('src','')
                res.sendFile(pathRoot+'/public/reset-password.html');
                
            } catch (error) {
                return res.status(401).send("El link ya fue utilizado o es incorrecto")
            }
        })  
    })

})



routes.post('/reset-password/:id/:token', (req, res) => {

    const {id, token} = req.params;
    const {newPassword, newPassword2} = req.body;
    
    if(newPassword !== newPassword2){
        return res.status(401).json({status: 401, mensaje: "Las contrase??as no coinciden"})
    }

    req.getConnection((err, conn)=>{
        if(err) { return res.send(err)}
        //filtro para saber si el email existe en la db
        conn.query("SELECT * FROM User WHERE id = ?", [id],async (err, rows)=>{
            try {
                //si el usuario no existe lo enviamos al catch
                if(rows.length == 0){ throw new Error()}
                //usuario existente
                const user = rows[0];              

                //verificamos el token
                const secret = process.env.SECRET +  user.password;
                const posibleError = jwt.verify(token,secret);

                //encripta la nueva contrasena
                const salt = await bcrypt.genSalt(5); 
                user.password = await bcrypt.hash(newPassword, salt);

                //actualizamos la contrasena
                conn.query("UPDATE User set password=? WHERE id = ?",[user.password, id], (err, rows)=>{
                    return res.status(200).json({status: 200, mensaje: "contrase??a actualizada", rows: rows})                
                })
                
            } catch (error) {
                return res.status(401).json({status: 401, mensaje: "Algo sali?? mal"})
            }
        })  
    }) 
})


module.exports = routes
