const {Router} = require("express")
const routes = Router()
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
require('dotenv').config();

routes.post('/register', async(req, res)=>{
    const user = req.body;

    if(!(user.email && user.username && user.password)){
        return res.status(401).json({status: 401, mensaje: "Username y password son nesesarios"})
    }

    req.getConnection((err, conn)=>{
        if(err) { return res.send(err)}
        
        conn.query("SELECT * FROM User WHERE email = ?", [user.email],async (err, rows)=>{
            try {
                if(rows.length > 0){ throw new Error()}
                
                const salt = await bcrypt.genSalt(5); 
                user.password = await bcrypt.hash(user.password, salt);

                user.id = crypto.randomBytes(5).toString("hex");

                const token = GenerarToken(user.id)

                req.getConnection((err, conn)=>{
                    if(err) { return res.send(err)}

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

function GenerarToken(userId){
    return jwt.sign( {userId}, process.env.SECRET, { expiresIn: 60 * 60 * 24});
}

module.exports = routes
