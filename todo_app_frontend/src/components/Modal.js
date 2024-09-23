import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg relative'>
        <CloseIcon onClick={onClose} className='absolute top-2 right-2 icon-red cursor-pointer' />
        {children}
      </div>
    </div>
  );
};

export default Modal;
