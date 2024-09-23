import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({
  todo,
  onSelectTodo,
  handleDelete
}) => {
  return (
    <li
      className='p-4 bg-gray-50 shadow-md rounded flex justify-between items-center cursor-pointer hover:bg-gray-100'
      onClick={() => onSelectTodo(todo)}
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
