import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import TodoListPage from './pages/TodoListPage';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <Routes>
        {/* TodoListPage */}
        <Route 
          path='/' 
          element={
            <PrivateRoute>
              <TodoListPage />
            </PrivateRoute>
          }
        />
        {/* Registration page */}
        <Route path='/register' element={<Register />} />
        {/* Login page */}
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
