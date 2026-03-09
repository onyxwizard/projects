import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ filteredTodos, toggleTodo, deleteTodo }) {
  return (
    <div>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo._id} // changed from todo.id
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;