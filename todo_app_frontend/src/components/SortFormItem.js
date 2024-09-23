import SwapVertIcon from '@mui/icons-material/SwapVert';

const SortFormItem = ({
  sortLabel,
  sortState,
  handleSort
}) => {
  return (
    <div
      className={`flex py-1 px-4 my-2 rounded cursor-pointer ${sortState === 0 ? 'sort-button' : sortState === 1 ? 'sort-selected-asc' : 'sort-selected-dsc'}`}
      onClick={handleSort}
    >
      <label className='flex-1 block text-sm font-bold my-2 cursor-pointer'>
        {sortLabel}
      </label>
      <div className='my-1'>{sortState === 0 ? '' : sortState === 2 ? 'dsc' : 'asc'}</div>
      <SwapVertIcon className='mt-2' />
    </div>
  );
}

export default SortFormItem;