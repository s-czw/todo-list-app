import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { performLogin } from '../utils/authUtils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    performLogin(email, password).then(() => {
      navigate('/');
    }).catch((error) => {
      setError(error.message ? error.message : 'Login failed');
    });
  };

  return (
    <div className='max-w-md mx-auto bg-white shadow-lg rounded-lg p-6'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium mb-2'>Email</label>
          <input
            id='email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full border border-gray-300 rounded-md p-2'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium mb-2'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full border border-gray-300 rounded-md p-2'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Login
        </button>
      </form>
      <p className='mt-4'>
        Don't have an account? <a href='/register' className='text-blue-500'>Register</a>
      </p>
    </div>
  );
}

export default Login;