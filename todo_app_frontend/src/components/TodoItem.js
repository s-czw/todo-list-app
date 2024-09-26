import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({
  todo,
  onSelectTodo,
  handleDelete
}) => {
  const [hasChanges, setHasChanges] = useState(false);

  const handleSelectTodo = (todo) => {
    onSelectTodo(todo);
    setHasChanges(false);
  }

  return (
    <li
      className={`p-4 shadow-md item-gray rounded flex justify-between items-center cursor-pointer ${hasChanges ? 'item-border-blue' : ''}`}
      onClick={() => handleSelectTodo(todo)}
    >
      <div>
        <h3 className='font-bold'>{todo.name}</h3>
        <p>{todo.description}</p>
        <p className='text-sm text-gray-500'>Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
      </div>
      <DeleteIcon onClick={(e) => handleDelete(todo._id, e)} className='icon-red' />
    </li>
  );
}

export default TodoItem;
