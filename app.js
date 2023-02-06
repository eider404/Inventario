const express = require("express");
const app = express()

const db = require('./src/models/db')

try {
    app.use(db.myconnection(db.mysql, db.dbOptions,'single'))
    console.log(`Coneccion a ${db.dbOptions.database} exitosa `)
} catch (error) {
    console.log(error)
}

app.listen(3000,()=>{
    console.log('SERVER RUNING ON PORT 3000...')
})