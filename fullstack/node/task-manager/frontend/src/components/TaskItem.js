import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-item">
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;