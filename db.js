const mongoose = require('mongoose');

const dbURI= "mongodb://localhost:27017/TodoListV01"

mongoose.connect(dbURI)

//extra http://localhost:5000/todos
const db=mongoose.connection

db.on('error',(err)=>{
    console.log("ERROR")
})

db.on('connected',(err)=>{
    console.log("MongoDB is connected")
})