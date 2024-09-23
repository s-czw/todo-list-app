import SortFormItem from './SortFormItem';

const SortForm = ({
  filteredTodos,
  setFilteredTodos,
  setIsSortModalOpen,
  prioritySort,
  setPrioritySort,
  statusSort,
  setStatusSort,
  dueDateSort,
  setDueDateSort
}) => {
  const clearForm = () => {
    setPrioritySort(0);
    setStatusSort(0);
    setDueDateSort(0);
  }

  const sortProc = (sortBy) => {
    switch (sortBy) {
      case 'priority':
        triggerSort(prioritySort, setPrioritySort);
        break;
      case 'status':
        triggerSort(statusSort, setStatusSort);
        break;
      case 'dueDate':
        triggerSort(dueDateSort, setDueDateSort);
        break;
      default:
        console.error('Incorrect sort key');
        break;
    }
  }

  const triggerSort = (check, set) => {
    if (check === 0) {
      set(1);
    } else if (check === 1) {
      set(2);
    } else {
      set(0);
    }
  }

  const handleSort = () => {
    const sortedTodos = [...filteredTodos];
    const priorityOrder = { Low: 1, Medium: 2, High: 3 };
    const statusOrder = { NotStarted: 1, InProgress: 2, Completed: 3 }

    if (prioritySort === 0 && statusSort === 0 && dueDateSort === 0) {
      sortedTodos.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      if (prioritySort === 1) {
        sortedTodos.sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      } else if (prioritySort === 2) {
        sortedTodos.sort((a,b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      }
      if (statusSort === 1) {
        sortedTodos.sort((a,b) => statusOrder[a.status] - statusOrder[b.status]);
      } else if (statusSort === 2) {
        sortedTodos.sort((a,b) => statusOrder[b.status] - statusOrder[a.status]);
      }
      if (dueDateSort === 1) {
        sortedTodos.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
      } else if (dueDateSort === 2) {
        sortedTodos.sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate));
      }
    }

    setFilteredTodos(sortedTodos);
    setIsSortModalOpen(false);
  }

  return (
    <div className='w-60 m-2'>
      <div className='text-xs'>Click on icon to trigger sort</div>
      <SortFormItem sortLabel={'Sort by Priority'} sortState={prioritySort} handleSort={() => sortProc('priority')} />
      <SortFormItem sortLabel={'Sort by Status'} sortState={statusSort} handleSort={() => sortProc('status')} />
      <SortFormItem sortLabel={'Sort by Due Date'} sortState={dueDateSort} handleSort={() => sortProc('dueDate')} />
      <div className='flex justify-end mt-4 space-x-2'>
        <button onClick={() => clearForm()} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
          Clear
        </button>
        <button onClick={() => handleSort()} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          Sort
        </button>
      </div>
    </div>
  );
}

export default SortForm;