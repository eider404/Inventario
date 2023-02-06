const jwt = require("jsonwebtoken")
require('dotenv').config();

module.exports = async(req, res, next) => {

    const token = req.headers.authorization;
    //console.log(token)
    var newProduct = req.body 

    try {
        decodedToken = await jwt.verify(token, process.env.SECRET)

    } catch (error) {
        return res.status(401).json({status: 401, mensaje: "token inexistente o expirado por favor Inicia sesión"})
    }
    console.log(decodedToken)
    newProduct.userId_fk = decodedToken.userId
    req.body = newProduct
    
    next();

}