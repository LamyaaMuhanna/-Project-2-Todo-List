const express = require('express')
const app = express()

const db= require('./db')
const Todo= require('./todo')

app.get("/",(req,res)=>{
    res.json("Get/ is Working")
})
app.get("/todos",(req,res)=>{
    res.json("Get/ is Working..")
})



app.listen(5000,() =>{
    console.log("SERVER IS WORKING")
})