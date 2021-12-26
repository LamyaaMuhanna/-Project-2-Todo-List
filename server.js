const { error } = require('console')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const db= require('./db')
const Todo= require('./todo')
const User = require('./user')

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
/*
//the down endpoint is replacec to these two
//return the completed tasks by get request
app.get("/completed", (req,res)=>{
    Todo.find({ isCompleted: true }, (err,data)=>{
        if(err){
            console.log("ERROR")
        }else{
            console.log(data)
            res.json(data)
        }
    })
})

// //return uncompleted tasks by get request

// app.get("/uncompleted", (req,res)=>{
//     Todo.find({ isCompleted: false }, (err,data)=>{
//         if(err){
//             console.log("ERROR")
//         }else{
//             console.log(data)
//             res.json(data)
//         }
//     })
// })*/
//query params  ?key=value&key=value
app.get("/filter", (req,res)=>{
    console.log(req.query)
    Todo.find({ isCompleted: req.query.isCompleted}, (err,data)=>{
        if(err){
            console.log("ERROR")
        }else{
            console.log(data)
            res.json(data)
        }
    })
})


//creat new tasks
app.post("/todos",(req,res)=>{
    Todo.create(req.body, (err, newTask)=>{
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

//delete completed tasks by deleteMany
app.delete("/todos",(req,res)=>{
    console.log('37', req.params.id)
    Todo.deleteMany({ isCompleted: true}, (err, deleteObj)=>{
        
        if(err){
            console.log("ERROR", err)
        }else{
            deleteObj.deleteCount=== 0
           ? res.status(404).json("There are not completed todo found")
           : res.json("Delete all completed todo Successfully")
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

//change one task by put request
app.put("/todos/:id/:isCompleted",(req,res)=>{
    console.log('124:', req.params)
    Todo.updateOne(
        {_id: req.params.id},
        {isCompleted: req.params.isCompleted},
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

//register
app.post("/users/register",(req,res)=>{
    User.create(req.body, (err, newUser)=>{
        if(err){
            console.log("ERROR", err)
            res.status(400).json({message: "This email already taken"})
        }else{
            res.status(201).json('Create new user successfully')
        }
    })
})
//login
app.post("/users/login",(req,res)=>{
    User.find({email:req.body.email}, (err, arrUserFound)=>{
        if(err){
            console.log("ERROR", err)
        }else{
            //res.json(data)
            console.log(arrUserFound)
            if(arrUserFound.length === 1){
                //we found the user
                if(req.body.password===arrUserFound[0].password){ 
                    //password correct
                    res.status(200).json({
                        message: "Login Successfully",
                        username: arrUserFound[0].username,
                    })
                }else{ //password incorrect
                    res.status(400).json({
                        message: "Wrong password",
                    }) 
                }
            }else{
            res.status(404).json({
                message:"The email entered is not registered",
            })
        
        }
    }
    })
})
app.listen(5000,() =>{
    console.log("SERVER IS WORKING")
})