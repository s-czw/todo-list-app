import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { deleteRequest } from '../utils/apiUtils';
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import Modal from './Modal';
import SearchForm from './SearchForm';
import SortForm from './SortForm';

const TodoList = ({
  todos,
  setTodos,
  onSelectTodo
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  // search criteria
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  // sort criteria
  const [prioritySort, setPrioritySort] = useState(0);
  const [statusSort, setStatusSort] = useState(0);
  const [dueDateSort, setDueDateSort] = useState(0);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const onSortModalClose = () => {
    setPrioritySort(0);
    setStatusSort(0);
    setDueDateSort(0);
    setIsSortModalOpen(false);
  }

  const handleDelete = (id, e) => {
    if(e && e.stopPropagation) e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteRequest(`/todos/${id}`)
        .then(() => setTodos(todos.filter(todo => todo._id !== id)))
        .catch(error => {
          window.alert('Error deleting TODO:', error);
        });
    }
  };

  return (
    <div>
      <div className='flex justify-end pb-3 px-2 space-x-2'>
        <h2 className='flex-1 text-xl font-bold mb-4'>Your TODOs</h2>
        <div className='flex flex-col cursor-pointer' onClick={() => setIsSearchModalOpen(true)}>
          <TuneIcon className='icon-large icon-grey' />
          <label className='text-xs'>filter</label>
        </div>
        <div className='flex flex-col cursor-pointer' onClick={() => setIsSortModalOpen(true)}>
          <SortIcon className='icon-large icon-grey' />
          <label className='text-xs'>sort</label>
        </div>
      </div>
      {filteredTodos.length === 0 ? (
        <p>No TODOs found.</p>
      ) : (
        <ul className='overflow-y-scroll no-scrollbar space-y-4' style={{maxHeight: '520px'}}>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} onSelectTodo={onSelectTodo} handleDelete={handleDelete} />
          ))}
        </ul>
      )}
      {/* Search Modal */}
      <Modal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Search Todos</h2>
        <SearchForm todos={todos} setFilteredTodos={setFilteredTodos} setIsSearchModalOpen={setIsSearchModalOpen}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} />
      </Modal>
      {/* Sort Modal */}
      <Modal isOpen={isSortModalOpen} onClose={() => onSortModalClose()}>
        <h2 className="text-xl font-bold mb-4">Sort Todos</h2>
        <SortForm filteredTodos={filteredTodos} setFilteredTodos={setFilteredTodos} setIsSortModalOpen={setIsSortModalOpen}
          prioritySort={prioritySort} setPrioritySort={setPrioritySort}
          statusSort={statusSort} setStatusSort={setStatusSort}
          dueDateSort={dueDateSort} setDueDateSort={setDueDateSort} />
      </Modal>
    </div>
  );
}

export default TodoList;