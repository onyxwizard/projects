# 📡 Project 2: Basic REST API with Express (Backend‑Only)

A simple RESTful API for a todo list built with Node.js and Express. This project introduces backend development fundamentals – routing, middleware, request handling, and in‑memory data storage.



## 🎯 Learning Objectives
- Set up an Express server from scratch.
- Understand HTTP methods (GET, POST, PUT, DELETE).
- Handle route parameters and query strings.
- Parse JSON request bodies.
- Send JSON responses.
- Organize code using Express Router.
- Test APIs with Postman or Thunder Client.
- Understand the concept of middleware.



## ✨ Features
- ✅ Create a new todo (POST `/todos`)
- ✅ Retrieve all todos (GET `/todos`)
- ✅ Retrieve a single todo by ID (GET `/todos/:id`)
- ✅ Update a todo (PUT `/todos/:id`)
- ✅ Delete a todo (DELETE `/todos/:id`)
- ✅ In‑memory data storage (array) – resets on server restart.



## 🛠️ Tech Stack
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express** | Web framework |
| **Nodemon** | Auto‑restart during development |
| **Postman / Thunder Client** | API testing |



## 🗂️ Project Structure
```
todo-api/
├── routes/
│   └── todos.js
├── server.js
├── package.json
└── README.md
```



## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher) and npm installed.

### Installation
1. **Create the project folder and initialize npm**
   ```bash
   mkdir todo-api
   cd todo-api
   npm init -y
   ```

2. **Install dependencies**
   ```bash
   npm install express
   npm install -D nodemon
   ```

3. **Create the folder structure**
   ```bash
   mkdir routes
   touch server.js routes/todos.js
   ```

4. **Add a start script** in `package.json`:
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Server will start on `http://localhost:5000` (or your configured port).

---

## 📦 Code Implementation

### `server.js` – Entry Point
```javascript
const express = require('express');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the todo routes
app.use('/todos', todoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### `routes/todos.js` – Todo Routes
```javascript
const express = require('express');
const router = express.Router();

// In‑memory data store
let todos = [];
let currentId = 1;

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
```

---

## 🧪 Testing the API with Postman

### 1. Create a todo (POST)
- **URL:** `http://localhost:5000/todos`
- **Method:** POST
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "text": "Learn Express"
  }
  ```
- **Expected response:** 201 Created with the new todo object.

### 2. Get all todos (GET)
- **URL:** `http://localhost:5000/todos`
- **Method:** GET
- **Expected response:** Array of todos.

### 3. Get a single todo (GET)
- **URL:** `http://localhost:5000/todos/1` (replace 1 with an existing ID)
- **Method:** GET
- **Expected response:** The todo object.

### 4. Update a todo (PUT)
- **URL:** `http://localhost:5000/todos/1`
- **Method:** PUT
- **Body:**
  ```json
  {
    "text": "Master Express",
    "completed": true
  }
  ```
- **Expected response:** Updated todo object.

### 5. Delete a todo (DELETE)
- **URL:** `http://localhost:5000/todos/1`
- **Method:** DELETE
- **Expected response:** 204 No Content.



## 📘 What You'll Learn
- **Express basics** – creating a server, defining routes, using middleware.
- **Routing** – route parameters (`:id`), query strings, and modular routes with `express.Router()`.
- **HTTP status codes** – 200, 201, 204, 400, 404, 500.
- **Request & response handling** – `req.params`, `req.query`, `req.body`, `res.json()`, `res.status()`.
- **CRUD operations** – implement Create, Read, Update, Delete.
- **Testing APIs** – using Postman or Thunder Client to verify endpoints.



## 🔮 Stretch Goals / Next Steps
- 🌟 Add input validation (e.g., using `Joi` or `express-validator`).
- 🌟 Implement pagination for GET `/todos` (use `?page` and `?limit`).
- 🌟 Connect to a real database (MongoDB with Mongoose) – this will be Project 3.
- 🌟 Add logging middleware (e.g., `morgan`).



## 💡 Key Takeaways for Interviews
- Explain how Express handles requests and responses.
- Describe the role of middleware and give examples.
- Discuss the differences between `app.use()` and HTTP method functions.
- Talk about REST conventions and proper status code usage.
- Show how you organize routes with `express.Router()`.



## 📄 License
This project is open source and available under the [MIT License](LICENSE).
