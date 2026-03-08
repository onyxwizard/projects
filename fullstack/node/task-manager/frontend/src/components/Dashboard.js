import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/api/tasks');
    setTasks(response.data);
  };

  const handleSave = () => {
    setShowForm(false);
    setCurrentTask(null);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome, {user?.name}</h2>
        <button onClick={() => { setCurrentTask(null); setShowForm(true); }}>+ Add Task</button>
      </div>

      {showForm && (
        <TaskForm task={currentTask} onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}

      <div>
        {tasks.length === 0 ? (
          <p>No tasks yet. Click "Add Task" to create one.</p>
        ) : (
          tasks.map(task => (
            <TaskItem key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;