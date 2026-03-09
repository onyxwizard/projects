import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// GET /todos – Retrieve all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }); // newest first
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /todos/:id – Retrieve a single todo by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    // Handle invalid MongoDB ObjectId format
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid todo ID' });
    }
    res.status(500).json({ message: err.message });
  }
});

// POST /todos – Create a new todo
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Todo text is required' });
    }
    const newTodo = new Todo({ text });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /todos/:id – Update an existing todo
router.put('/:id', async (req, res) => {
  try {
    const { text, completed } = req.body;
    const updateData = {};
    if (text !== undefined) updateData.text = text;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true } // return updated doc, run schema validators
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid todo ID' });
    }
    res.status(400).json({ message: err.message });
  }
});

// DELETE /todos/:id – Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(204).send(); // No content
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid todo ID' });
    }
    res.status(500).json({ message: err.message });
  }
});

export default router;