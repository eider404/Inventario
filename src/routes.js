const {Router} = require("express")
const routes = Router()
const bcrypt = require('bcrypt');
const crypto = require("crypto");

routes.post('/register', async(req, res)=>{
    const user = req.body;

    if(!(user.email && user.username && user.password)){
        return res.status(401).json({status: 401, mensaje: "Username y password son nesesarios"})
    }
    
    const salt = await bcrypt.genSalt(5); 
    user.password = await bcrypt.hash(user.password, salt);

    user.id = crypto.randomBytes(5).toString("hex");

    req.getConnection((err, conn)=>{
        if(err) { return res.send(err)}

        conn.query("INSERT INTO User set ?", [user], (err, rows)=>{
            if(err) { return res.send(err) }
            return res.status(200).json({status: 200, mensaje: "Usuario Registrado"})
            
        })  
    })
})

module.exports = routes
