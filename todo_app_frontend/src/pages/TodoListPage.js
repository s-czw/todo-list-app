import React, { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoDetailsPane from '../components/TodoDetailsPane';
import { getRequest } from '../utils/apiUtils';
import { useNavigate } from 'react-router-dom';
import { performLogout } from '../utils/authUtils';
import { socket } from '../socket';

const TodoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isSharedList, setIsSharedList] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Real-time: Listen for new shared TODO creation
    socket.on('newSharedTodo', (newTodo) => {
      if (isSharedList) {
        setTodos(t => [...t, newTodo]);
      }
    });

    // Real-time: Listen for shared TODO update
    socket.on('updatedSharedTodo', (updatedTodo) => {
      if (isSharedList) {
        setIsUpdated(true);
        if (selectedTodo && selectedTodo._id === updatedTodo._id) {
          setSelectedTodo(updatedTodo);
        }
      }
    });

    // Real-time: Listen for TODO deletion
    socket.on('deletedSharedTodo', (todoId) => {
      if (isSharedList) {
        setTodos(t => t.filter(todo => todo._id !== todoId));
      }
    });

    // fetch TODOs from API on load
    let requestUrl = '/todos'
    if (isSharedList) {
      requestUrl = '/todos/shared';
    }
    getRequest(requestUrl).then(data => {
      if (data.error) {
        setTodos([]);
        console.error(`${data.error}${data.message ? ':' + data.message : ''}`);
      } else {
        setTodos(data);
      }
    }).catch(error => {
      setTodos([]);
      console.error('Error fetching TODOs:', error);
    });
    setIsUpdated(false);

    return () => {
      socket.off('newSharedTodo');
      socket.off('updatedSharedTodo');
      socket.off('deletedSharedTodo');
    }
  }, [isUpdated, isSharedList, selectedTodo]);

  const handleLogout = () => {
    performLogout();
    navigate('/login');
  };

  return (
    <div className='flex flex-wrap max-w-7xl mx-auto p-4 lg:space-x-6'>
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className='absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
        Logout
      </button>

      {/* TODO List */}
      <div className='w-full lg:w-1/3 mb-10 bg-white shadow-lg rounded-lg p-6' style={{maxHeight: '660px'}}>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          onSelectTodo={setSelectedTodo}
          isSharedList={isSharedList}
          setIsSharedList={setIsSharedList} />
      </div>

      {/* Details Pane */}
      <div className='w-full lg:w-1/3 mb-10 h-fit bg-white shadow-lg rounded-lg p-6'>
        {selectedTodo ? (
          <TodoDetailsPane todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
        ) : (
          <p>Select a TODO to view details</p>
        )}
      </div>

      {/* TODO Form */}
      <div className='w-full lg:w-1/4 h-fit bg-white shadow-lg rounded-lg p-6'>
        <TodoForm setIsUpdated={setIsUpdated} />
      </div>
    </div>
  );
}

export default TodoListPage;