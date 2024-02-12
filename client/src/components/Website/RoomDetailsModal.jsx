import React from 'react';
import ReactDOM from 'react-dom';

const RoomDetailsModal = ({ children, onClose }) => {
  const portalRoot = document.getElementById('details');

  return ReactDOM.createPortal(
    <div className="fixed z-[55] top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 bg-opacity-50">
      <div className="bg-second-color p-6 rounded shadow-lg w-full md:w-2/5 text-black flex flex-col gap-3 justify-center">
        {children}
        <br />
        <button
          onClick={onClose}
          className="mt-4 ml-3 p-2 px-4 bg-white hover:bg-gray-200 border text-fourth-color border-fourth-color md:text-lg rounded shadow-md"
        >
          Ok
        </button>
      </div>
    </div>,
    portalRoot
  );
};

export default RoomDetailsModal;
