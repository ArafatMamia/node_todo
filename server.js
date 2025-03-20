const express = require('express')
const bodyParser = require('body-parser')
const Todo = require('./model/Todo')
const connectDB = require('./db'); // Import the connectDB function
const { validate } = require('../model/Person');
const app = express();
app.use(bodyParser.json())


// Connect to MongoDB
connectDB();

app.get("/", (req,res)=>{
    res.send("it's working")
})
// create a new todo
app.post('/todo', async (req,res) => {
    // create,save
    try{
        const data = req.body
        const todo = new Todo(data);
        const response = await todo.save();
        res.status(201).json({todo:response})
    }catch(err){
        res.status(500).json({err:"server internal problem"})
    }
})
// Get all todos
app.get('/todos', async(req,res) =>{
    try {
        const todos = await Todo.find()
     // const todos = await Todo.findOne( {title: "Buy groceries"});
    //   const todos = await Todo.findById('67da85bee3dd357458972f51')
      res.json(todos);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
})
// update a todos
app.put("/todo/:id", async(req,res) =>{
    try{
        const id = req.params.id
        const data = req.body
        // const todo = await Todo.updateOne({_id:id}, {completed:true})
        // const todo = await Todo.updateMany({completed:completed}, {completed:true})
        const todo = await Todo.findByIdAndUpdate(id, data,{
            new:true,
            runValidators:true
        })
        res.json(todo);
    }catch(err){
        res.status(500).json({ catcherror: err.message });
    }
})
// delete a todos
app.delete("/todo/:id", async(req,res) =>{
    try{
        const id = req.params.id
        // const todo = await Todo.deleteOne(title)
        // const todo = await Todo.deleteMany(title)
        const todo = await Todo.findByIdAndDelete(id)
        res.json(todo);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

app.listen(3000)