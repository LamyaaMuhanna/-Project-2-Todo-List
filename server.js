const { error } = require('console')
const express = require('express')
const app = express()

app.use(express.json())

const db= require('./db')
const Todo= require('./todo')

app.get("/te",(req,res)=>{
    res.json("Get/ is Working")
})
//to return all data 
app.get("/todos",(req,res)=>{
    Todo.find({}, (err,data)=>{
        if(err){
            console.log("ERROR")
        }else{
            res.json(data)
        }
    })
})

app.post("/todos",(req,res)=>{
    Todo.create({}, (err, newTask)=>{
        console.log('25:', req.body)
        if(err){
            console.log("ERROR", err)
        }else{
            res.status(201).json(newTask)
        }
    })
})

//delete by id
app.delete("/todos/:id",(req,res)=>{
    console.log('37', req.params.id)
    Todo.deleteOne({_id: req.params.id}, (err, deleteObj)=>{
        
        if(err){
            console.log("ERROR", err)
        }else{
            deleteObj.deleteCount===1
           ? res.json("Delete this Task Successfully")
           : res.status(404).json("this todos is not found")
        }
    })
})

//change the title
app.put("/todos/:id",(req,res)=>{
    Todo.updateOne(
        {_id: req.params.id},
        {title: req.body.newTitle},
        (err, updateObj)=>{
        if(err){
            console.log("ERROR", err)
        }else{
            updateObj.modifiedCount===1
           ? res.json("Update this Task Successfully")
           : res.status(404).json("this todos is not found")
        }
    })
})

app.listen(5000,() =>{
    console.log("SERVER IS WORKING")
})