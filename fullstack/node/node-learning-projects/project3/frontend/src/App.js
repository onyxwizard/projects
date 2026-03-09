import React, { useState, useEffect } from 'react';
import axios from './utils/axios';
import TodoForm from './components/TodoForm';
import FilterButtons from './components/FilterButtons';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/todos');
      setTodos(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new todo
  const addTodo = async (text) => {
    try {
      const response = await axios.post('/todos', { text });
      // Add the new todo to state (optimistic update)
      setTodos([...todos, response.data]);
    } catch (err) {
      console.error('Add failed', err);
      // Optionally show a user-friendly message
    }
  };

  // Toggle completion status
  const toggleTodo = async (id) => {
    // Find the current todo
    const todo = todos.find(t => t._id === id);
    if (!todo) return;

    // Optimistically update UI
    const updatedTodos = todos.map(t =>
      t._id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);

    try {
      await axios.put(`/todos/${id}`, { completed: !todo.completed });
    } catch (err) {
      // Revert on error
      setTodos(todos);
      console.error('Toggle failed', err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    // Optimistically remove
    const previousTodos = [...todos];
    setTodos(todos.filter(t => t._id !== id));

    try {
      await axios.delete(`/todos/${id}`);
    } catch (err) {
      // Revert on error
      setTodos(previousTodos);
      console.error('Delete failed', err);
    }
  };

  // Clear completed todos
  const clearCompleted = async () => {
    const completedIds = todos.filter(t => t.completed).map(t => t._id);
    if (completedIds.length === 0) return;

    // Optimistically remove completed
    const previousTodos = [...todos];
    setTodos(todos.filter(t => !t.completed));

    try {
      // Delete each completed todo (or use a bulk endpoint if you have one)
      await Promise.all(completedIds.map(id => axios.delete(`/todos/${id}`)));
    } catch (err) {
      // Revert on error
      setTodos(previousTodos);
      console.error('Clear completed failed', err);
    }
  };

  // Filter logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // all
  });

  if (loading && todos.length === 0) return <div className="loading">Loading todos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TodoList
        filteredTodos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}

export default App;