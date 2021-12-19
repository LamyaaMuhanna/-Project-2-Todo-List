const mongoose = required('mongoose')

const dbURI= "mongodb://localhost:27017/TodoListV01"

mongoose.connect(dbURI)

//extra
const db=mongoose.connection
db.on('error'),(err)=>{
    console.log("ERROR")
}