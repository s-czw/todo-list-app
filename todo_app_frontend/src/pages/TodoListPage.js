import React, { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoDetailsPane from '../components/TodoDetailsPane';
import { getRequest } from '../utils/apiUtils';
import { useNavigate } from 'react-router-dom';
import { performLogout } from '../utils/authUtils';

const TodoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // fetch TODOs from API on load
    getRequest('/todos')
      .then(data => {
        if (data.error) {
          setTodos([]);
          console.error(`${data.error}${data.message ? ':' + data.message : ''}`);
        } else {
          setTodos(data)
        }
      })
      .catch(error => {
        setTodos([]);
        console.error('Error fetching TODOs:', error);
      });
      setIsUpdated(false);
  }, [isUpdated]);

  const handleLogout = () => {
    performLogout();
    navigate('/login');
  };

  return (
    <div className='flex max-w-7xl mx-auto p-4 space-x-6'>
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className='absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
        Logout
      </button>

      {/* TODO List */}
      <div className='w-1/3 bg-white shadow-lg rounded-lg p-6' style={{maxHeight: '660px'}}>
        <TodoList todos={todos} setTodos={setTodos} onSelectTodo={setSelectedTodo} />
      </div>

      {/* Details Pane */}
      <div className='w-1/3 h-fit bg-white shadow-lg rounded-lg p-6'>
        {selectedTodo ? (
          <TodoDetailsPane todo={selectedTodo} setSelectedTodo={setSelectedTodo} setIsUpdated={setIsUpdated} />
        ) : (
          <p>Select a TODO to view details</p>
        )}
      </div>

      {/* TODO Form */}
      <div className='w-1/4 h-fit bg-white shadow-lg rounded-lg p-6'>
        <TodoForm setTodos={setTodos} />
      </div>
    </div>
  );
}

export default TodoListPage;