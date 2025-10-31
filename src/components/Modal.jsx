import React from 'react'
import { FaTimes } from "react-icons/fa";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null; // ...existing code...

  return <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black/40'>
    <div className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}>
      {!hideHeader && (
        <div className='flex items-center justify-between px-4 border-b border-gray-200'>
          <h2 className='md:text-lg font-medium text-gray-900'>
            {title}
          </h2>
        </div>
      )}

      <button
        onClick={onClose}
        className='text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm h-8 w-8 flex items-center justify-center absolute right-3.5 cursor-pointer'
      >
        < FaTimes />
      </button>

      <div className='flex-1 overflow-y-auto custom-scrollbar'>
        {children}
      </div>
    </div>
  </div>

}

export default Modal