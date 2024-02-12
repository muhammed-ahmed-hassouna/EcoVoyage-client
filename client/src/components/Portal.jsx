import React, { useState } from 'react'
import Modal from './Modal';

const Portal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl mb-8">Popup Example</h1>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Open Popup
        </button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <h2 className="text-2xl mb-4">Popup Content</h2>
            <p>This is the content of the popup.</p>
          </Modal>
        )}
        <div id="root"></div>
        <div id="portal-root"></div>

      </div>
    );
}

export default Portal
