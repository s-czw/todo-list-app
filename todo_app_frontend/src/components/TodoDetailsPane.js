import React, { useEffect, useState } from 'react';
import { putRequest } from '../utils/apiUtils';
import CloseIcon from '@mui/icons-material/Close';
import FeedIcon from '@mui/icons-material/Feed';
import Modal from './Modal';
import ActivityFeed from '../pages/ActivityFeed';

const TodoDetailsPane = ({
  todo,
  setSelectedTodo
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  useEffect(() => {
    setName(todo.name);
    setDescription(todo.description);
    setPriority(todo.priority);
    setDueDate(todo.dueDate.slice(0, 10));
    setStatus(todo.status);
  }, [todo]);

  const exitDetails = () => {
    setSelectedTodo(null);
  }

  const handleUpdate = (e) => {
    e.preventDefault();

    todo.name = name;
    todo.description = description;
    todo.priority = priority;
    todo.dueDate = dueDate;
    todo.status = status;
    putRequest(`/todos/${todo._id}`, todo)
      .then(updatedTodo => {
        setSelectedTodo(updatedTodo);
      })
      .catch(error => console.error('Error update TODO:', error));
  }

  return (
    <form onSubmit={handleUpdate} className='mb-4'>
      <div className='flex mb-1'>
        <div className='flex flex-1'><h2 className='text-xl font-bold'>TODO Details</h2></div>
        <CloseIcon onClick={exitDetails} className='icon-red cursor-pointer' />
      </div>
      <div className='mb-3 space-x-1 cursor-pointer' onClick={() => setIsActivityModalOpen(true)}>
        <FeedIcon className='icon-gray' />
        <label className='icon-gray text-sm underline cursor-pointer'>activity feed</label>
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>ID</label>
        <div className='text-gray-700'>{todo._id}</div>
      </div>
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
        <label className='block text-gray-700'>Status</label>
        <select
          id='status'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
          required
        >
          <option value='NotStarted'>Not Started</option>
          <option value='InProgress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Update TODO
      </button>
      {/* Activity Feed Modal */}
      <Modal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)}>
        <h2 className='text-xl font-bold mb-4'>Activity Feed</h2>
        <ActivityFeed todoId={todo._id} />
      </Modal>
    </form>
  );
}

export default TodoDetailsPane;
