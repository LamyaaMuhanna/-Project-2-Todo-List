const { error } = require('console')
const express = require('express')
const app = express()

const db= require('./db')
const Todo= require('./todo')

app.get("/te",(req,res)=>{
    res.json("Get/ is Working")
})
app.get("/todos",(req,res)=>{
    Todo.find({}, (err,data)=>{
        if(err){
            console.log("ERROR")
        }else{
            res.json(data)
        }
    })
})

app.post("/te",(req,res)=>{
    Todo.create({}, (err, newTask)=>{
        console.log('25', req.body)
        if(err){
            console.log("ERROR", err)
        }else{
            res.status(201).json(newTask)
        }
    })
})

app.listen(5000,() =>{
    console.log("SERVER IS WORKING")
})