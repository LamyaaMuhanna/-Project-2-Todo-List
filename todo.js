const {Schema, model} = require("mongoose")

const todoSchema = new Schema({
    title: String,
    isCompleted: Boolean
})

//model
const lodo= model('Todo', todoSchema)