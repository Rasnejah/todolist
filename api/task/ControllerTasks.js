const { findOne } = require('./todo')
const todoModel = require('./todo')
////////////////////////////////////////////////////////////////////////////////////////
async function getAll(req, res){    
    try {
        const tasks = await todoModel.find({})             
        res.send(tasks)
    } catch (error) {
        console.log(error.message)
        res.send(error)
    }    
}

async function create(req, res){   
    
    const {title, description} = JSON.parse(req.body)
     
    
    
    try {
        const newTask = await todoModel({title, description, active: true})
        newTask.save()
        res.send(newTask)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
}

async function active(req, res){
    try {
        const doc = await todoModel.findOne({_id: req.params.id})        
        const updateTask = await todoModel.updateOne({_di:req.params.id},{ active:doc.active?false:true})
        res.send(updateTask)        
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
    
}    
    

async function remove(req, res){

    try {        
        const task = await todoModel.deleteOne({ _id: req.params.id})
        res.send(task)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
        
}

taskController = {
    getAll,
    create,
    active,
    remove
}
module.exports = taskController