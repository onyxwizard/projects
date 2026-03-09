const express = require('express');
const router = express.Router();

// In‑memory data store
let todos = [
  { "id": 1, "text": "Review project requirements", "completed": false },
  { "id": 2, "text": "Draft initial proposal", "completed": true },
  { "id": 3, "text": "Schedule team meeting", "completed": false },
  { "id": 4, "text": "Update documentation", "completed": false },
  { "id": 5, "text": "Fix login bug", "completed": true },
  { "id": 6, "text": "Design database schema", "completed": false },
  { "id": 7, "text": "Write unit tests", "completed": false },
  { "id": 8, "text": "Deploy to staging", "completed": true },
  { "id": 9, "text": "Client feedback review", "completed": false },
  { "id": 10, "text": "Optimize images", "completed": false },
  { "id": 11, "text": "Prepare presentation", "completed": false },
  { "id": 12, "text": "Submit final report", "completed": true }
];
let currentId = todos[todos.length - 1].id + 1;

// GET /todos – retrieve all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// GET /todos/:id – retrieve a single todo by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.json(todo);
});

// POST /todos – create a new todo
router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }
  const newTodo = { id: currentId++, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id – update an existing todo
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, completed } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  if (text !== undefined) todo.text = text;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// DELETE /todos/:id – delete a todo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  todos.splice(index, 1);
  res.status(204).send(); // No content
});

module.exports = router;