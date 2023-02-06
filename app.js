const express = require("express");
const app = express()

const router = require('./src/routes');
const db = require('./src/models/db')

try {
    app.use(db.myconnection(db.mysql, db.dbOptions,'single'))
    console.log(`Coneccion a ${db.dbOptions.database} exitosa `)
} catch (error) {
    console.log(error)
}

app.use(express.json());
app.use('/',router);


app.listen(3000,()=>{
    console.log('SERVER RUNING ON PORT 3000...')
})