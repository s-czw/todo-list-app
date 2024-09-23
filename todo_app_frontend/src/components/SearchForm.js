import React from 'react';

const SearchForm = ({
  todos,
  setFilteredTodos,
  setIsSearchModalOpen,
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter
}) => {
  const clearForm = () => {
    setSearchTerm('');
    setPriorityFilter('');
  }

  const handleFilter = () => {
    let filtered = todos;

    if (searchTerm) {
      filtered = filtered.filter((todos) =>
        todos.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todos.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priorityFilter) {
      filtered = filtered.filter((todo) => priorityFilter === todo.priority)
    }

    setFilteredTodos(filtered);
    setIsSearchModalOpen(false);
  };

  return (
    <div className='w-80 m-2'>
      <label className='block text-gray-700 text-sm font-bold mb-2 mt-4' htmlFor='searchTerm'>
        Search Todos
      </label>
      <input
        id='searchTerm'
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search by name or description'
        className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
      />

      <label className='block text-gray-700 text-sm font-bold mb-2 mt-4' htmlFor='priorityFilter'>
        Filter by Priority
      </label>
      <select
        id='priorityFilter'
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
      >
        <option value=''>All Priorities</option>
        <option value='Low'>Low</option>
        <option value='Medium'>Medium</option>
        <option value='High'>High</option>
      </select>

      <div className='flex justify-end mt-6 space-x-4'>
        <button onClick={() => clearForm()} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>Clear</button>
        <button onClick={() => handleFilter()} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Search</button>
      </div>
    </div>
  );
};

export default SearchForm;
