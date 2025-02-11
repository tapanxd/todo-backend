const express = require('express');
const Todo = require('../models/Todo')

const router = express.Router();

router.post('/add', async(req,res) => {
    try{
        const newTodo = new Todo({ task: req.body.task});
        await newTodo.save();
        res.status(201).json(newTodo);
    }catch (error) {
        res.status(500).json({ error: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find(); // Fetch all todos
        //console.log("Fetched todos from DB:", todos); // Debugging log
        res.status(200).json(todos); // This must be an array
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async(req,res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Deleted Successfully"});
    }catch(error) {
        res.status(500).json({ error: error.message});
    }
});

router.put("/toggle/:id", async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      todo.completed = !todo.completed; // ✅ Toggle completion
      await todo.save();
  
      res.status(200).json(todo);
    } catch (error) {
      console.error("❌ Error updating todo:", error);
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;