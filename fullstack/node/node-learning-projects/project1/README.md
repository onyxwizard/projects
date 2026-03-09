# 📝 Project 1: Simple Todo App (Frontend‑Only)

A beginner‑friendly introduction to React fundamentals. This project is a fully client‑side todo application that helps you learn components, props, state management, and event handling – all without a backend.



## 🎯 Learning Objectives
- Set up a React development environment.
- Understand JSX and component composition.
- Use functional components and props.
- Manage local state with the `useState` hook.
- Handle user events (clicks, input changes).
- Render lists dynamically with `.map()`.
- Implement conditional rendering.
- Style components with basic CSS.



## ✨ Features
- ✅ Add new todos with a text input.
- ✅ Mark todos as complete/incomplete by clicking.
- ✅ Delete individual todos.
- ✅ Filter todos: All / Active / Completed.
- ✅ Clear all completed todos.
- ✅ Persistent state within the browser session (data resets on refresh).
- ✅ Responsive, clean UI with basic CSS.



## 🛠️ Tech Stack
| Technology | Purpose |
|------------|---------|
| **React** (Create React App) | Frontend library |
| **JavaScript (ES6+)** | Core language |
| **CSS3** | Styling |
| **Local Storage** (optional stretch goal) | Persist todos across page refreshes |



## 🗂️ Project Structure
```
todo-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── TodoForm.js
│   │   ├── TodoList.js
│   │   ├── TodoItem.js
│   │   └── FilterButtons.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```



## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher) and npm installed.
- A code editor (VS Code recommended).

### Installation
1. **Create the React app**
   ```bash
   npx create-react-app todo-app
   cd todo-app
   ```

2. **Clean up default files**  
   Delete `src/App.test.js`, `src/logo.svg`, `src/setupTests.js`, `src/reportWebVitals.js`.  
   Replace `src/App.js` and `src/App.css` with your own code (see below).

3. **Run the development server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🧩 Component Breakdown

### `App.js` (Main Container)
- Holds the main state: `todos` array and `filter` string.
- Defines functions to add, toggle, delete, and clear todos.
- Renders `TodoForm`, `FilterButtons`, and `TodoList`.
- Passes state and handlers as props.

### `TodoForm.js`
- Controlled component with an input field.
- On form submit, calls `addTodo` prop with the current input value.
- Clears the input after submission.

### `TodoList.js`
- Receives `todos`, `filter`, and `toggleTodo`, `deleteTodo` props.
- Filters the todos based on the `filter` value.
- Maps over the filtered list to render `TodoItem` components.

### `TodoItem.js`
- Displays a single todo with a checkbox (for completion) and a delete button.
- Uses props to show text and completion status.
- Calls `toggleTodo` when checkbox changes, and `deleteTodo` when delete button clicked.

### `FilterButtons.js`
- Receives `filter` and `setFilter` props.
- Renders three buttons: All, Active, Completed.
- Highlights the currently active filter.

---

## 🔧 Core Code Snippets

### State Management in `App.js`
```javascript
const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState('all');

const addTodo = (text) => {
  const newTodo = { id: Date.now(), text, completed: false };
  setTodos([...todos, newTodo]);
};

const toggleTodo = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};

const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
};

const clearCompleted = () => {
  setTodos(todos.filter(todo => !todo.completed));
};
```

### Filtering Logic (inside `TodoList`)
```javascript
const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.completed;
  if (filter === 'completed') return todo.completed;
  return true; // 'all'
});
```

### Controlled Input in `TodoForm`
```javascript
const [input, setInput] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  if (input.trim()) {
    addTodo(input);
    setInput('');
  }
};

return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Add a new todo..."
    />
    <button type="submit">Add</button>
  </form>
);
```



## 🎨 Styling
Add basic styles in `App.css` to make the app visually appealing. Example:

```css
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

input[type="text"] {
  width: 70%;
  padding: 8px;
  margin-right: 5px;
}

button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #ccc;
}

.todo-item span {
  cursor: pointer;
  flex: 1;
  margin-left: 8px;
}

.completed span {
  text-decoration: line-through;
  color: gray;
}
```

---

## 📘 What You'll Learn
- **React fundamentals** – components, JSX, props, state.
- **Hooks** – `useState` for local state.
- **Event handling** – form submissions, button clicks.
- **Conditional rendering** – show/hide elements based on state.
- **List rendering** – using `map()` with unique keys.
- **Component composition** – splitting UI into reusable pieces.
- **Controlled components** – form inputs bound to state.



## 🧪 Testing the App
- Add a few todos.
- Mark them as complete/incomplete.
- Delete a todo.
- Use the filter buttons to see only active or completed todos.
- Try clearing completed todos.
- (Optional) Implement **localStorage** to persist todos on refresh – a great stretch challenge.



## 🔮 Stretch Goals / Next Steps
- 🌟 **Persist with localStorage** – save todos to browser storage and load on initial render.
- 🌟 **Edit todo** – double‑click a todo to edit its text.
- 🌟 **Drag & drop** – reorder todos using `react-beautiful-dnd`.
- 🌟 **Animations** – add smooth transitions when adding/deleting todos.



## 💡 Key Takeaways for Interviews
- Understand the **unidirectional data flow** in React (state down, events up).
- Explain the difference between **props** and **state**.
- Describe how `useState` works and why we use the updater function.
- Discuss **controlled vs uncontrolled components**.
- Talk about **keys** in lists and why they are important.



## 📄 License
This project is open source and available under the [MIT License](LICENSE).


**Happy coding!** 🚀 Next step: build this project, experiment with the code, and then move on to **Project 2** to add a backend.