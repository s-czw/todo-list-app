import React, { useState } from 'react';
import { postRequest } from '../utils/apiUtils';
import { Checkbox, FormControlLabel } from '@mui/material';

const TodoForm = ({
  setIsUpdated
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [isShared, setIsShared] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = { name, description, priority, dueDate, isShared };
    postRequest('/todos', newTodo)
      .then(() => {
        setIsUpdated(true);
        setName('');
        setDescription('');
        setPriority('Low');
        setDueDate('');
        setIsShared(false);
      })
      .catch(error => console.error('Error adding TODO:', error));
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <h2 className='text-xl font-bold mb-4'>Add a New TODO</h2>
      <div className='mb-4'>
        <label className='block text-gray-700'>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mt-1'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mt-1'
          required
        ></textarea>
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Priority</label>
        <select
          id='priority'
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
          required
        >
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Due Date</label>
        <input
          type='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mt-1'
          required
        />
      </div>
      <div className='mb-4'>
        <FormControlLabel
          label='Share with team'
          className='text-gray-700'
          control={<Checkbox checked={isShared} onChange={(e) => setIsShared(e.target.checked)} />} />
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Add TODO
      </button>
    </form>
  );
}

export default TodoForm;
