# 🔗 Project 3: Full‑Stack Todo App with MongoDB

Connect your React frontend (Project 1) with your Express API (Project 2) and add a real database – MongoDB – to persist todos across server restarts. This project transforms your local todo app into a full‑stack application with permanent storage.



## 🎯 Learning Objectives
- Integrate a React frontend with an Express backend.
- Use MongoDB with Mongoose for data modeling and persistence.
- Understand CORS and environment variables.
- Handle asynchronous API calls from React (`useEffect`, `axios`).
- Manage loading and error states in React.
- Deploy a full‑stack app locally (and optionally to the cloud).



## ✨ Features
- ✅ User registration/login (optional stretch) – but for now, single‑user.
- ✅ Persistent todos stored in MongoDB.
- ✅ All CRUD operations from Project 2 now hit the database.
- ✅ React frontend fetches and updates data via the API.
- ✅ Loading indicators and error handling.



## 🛠️ Tech Stack
| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React (from Project 1)              |
| Backend     | Node.js, Express (from Project 2)   |
| Database    | MongoDB + Mongoose ODM              |
| HTTP Client | Axios                               |
| Other       | CORS, dotenv, nodemon                |



## 🗂️ Project Structure
```
fullstack-todo/
├── backend/
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todos.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TodoForm.js
    │   │   ├── TodoList.js
    │   │   ├── TodoItem.js
    │   │   └── FilterButtons.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── package.json
    └── .env
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js, npm
- MongoDB installed locally or use MongoDB Atlas (free tier)
- Postman / Thunder Client for testing

### 1. Backend Setup
```bash
mkdir fullstack-todo
cd fullstack-todo
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv
npm install -D nodemon
```

Create `.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todo_db
```

### 2. Frontend Setup
In another terminal:
```bash
npx create-react-app frontend
cd frontend
npm install axios
```

---

## 📦 Backend Implementation (Your Turn to Code!)

### Step 1: Create the Todo Model (`backend/models/Todo.js`)
Define a Mongoose schema for a todo with fields: `text` (String, required), `completed` (Boolean, default false). Export the model.

### Step 2: Update the Todo Routes (`backend/routes/todos.js`)
Replace the in‑memory array with database operations using your Todo model:
- `GET /` – `Todo.find()`
- `GET /:id` – `Todo.findById()`
- `POST /` – `new Todo(req.body).save()`
- `PUT /:id` – `Todo.findByIdAndUpdate(id, req.body, { new: true })`
- `DELETE /:id` – `Todo.findByIdAndDelete(id)`

Handle errors and send appropriate status codes.

### Step 3: Update `server.js`
- Import `cors` and use `app.use(cors())` to allow frontend requests.
- Import `mongoose` and connect to MongoDB using `process.env.MONGO_URI`.
- Mount the todo routes.

**Test with Postman** to ensure all endpoints work with the database.

---

## 💻 Frontend Integration (Your Turn to Code!)

### Step 1: Set Up Axios Instance
Create `src/utils/axios.js`:
```javascript
import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:5000' });
export default instance;
```

### Step 2: Replace Local State with API Calls in `App.js`
- Remove the initial local `todos` state – it will come from the backend.
- Use `useEffect` to fetch todos on component mount.
- Implement `addTodo`, `toggleTodo`, `deleteTodo`, `clearCompleted` as async functions that call the API and then refresh the todo list (by re‑fetching or updating state optimistically).

Example skeleton:
```javascript
const [todos, setTodos] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

useEffect(() => {
  fetchTodos();
}, []);

const fetchTodos = async () => {
  setLoading(true);
  try {
    const res = await axios.get('/todos');
    setTodos(res.data);
  } catch (err) {
    setError('Failed to load todos');
  } finally {
    setLoading(false);
  }
};

const addTodo = async (text) => {
  try {
    const res = await axios.post('/todos', { text });
    setTodos([...todos, res.data]); // optimistic update
  } catch (err) {
    // handle error
  }
};

// similarly for toggle, delete, clearCompleted
```

### Step 3: Handle Loading and Error States
In your JSX, conditionally show a loading spinner or error message.

### Step 4: Update Other Components
- `TodoForm` remains almost the same – it just calls `addTodo` prop.
- `TodoList` and `TodoItem` receive updated props – no changes needed.



## 🧪 Testing the Full Stack

1. Start MongoDB (if local: `mongod`).
2. Start backend: `npm run dev` (from `backend` folder).
3. Start frontend: `npm start` (from `frontend` folder).
4. Open `http://localhost:3000` – you should see your todo app, now with persistent data.
5. Add, toggle, delete todos – refresh the page to confirm data persists.



## 📘 What You'll Learn
- **Full‑stack integration** – connecting React to an Express API.
- **Mongoose ODM** – defining schemas, models, and performing CRUD.
- **Environment variables** – keeping secrets out of code.
- **CORS** – understanding cross‑origin requests and how to enable them.
- **Async data fetching** – using `useEffect` and `axios` with loading/error states.
- **Optimistic updates** – updating UI before server confirms (optional).



## 🔮 Stretch Goals
- 🌟 Add user authentication (JWT) – each user sees only their todos.
- 🌟 Deploy backend to Render/Heroku and frontend to Netlify/Vercel.
- 🌟 Implement pagination for large todo lists.
- 🌟 Add real‑time updates with WebSockets.


## 💡 Key Takeaways for Interviews
- Explain how data flows from React → API → database and back.
- Discuss why you need CORS and how you configured it.
- Describe the role of Mongoose and how it differs from raw MongoDB.
- Talk about error handling strategies in both frontend and backend.
- Mention environment variables for configuration.



## 📄 License
This project is open source and available under the [MIT License](LICENSE).