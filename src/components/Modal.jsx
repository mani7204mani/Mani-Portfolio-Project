// src/components/Modal.jsx

import React from 'react';
import '../styles/Modal.css'; // New CSS for the modal

function Modal({ isOpen, closeModal, experience }) {
  if (!isOpen) return null;

  const { role, company, duration, location, details, project } = experience;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeModal}>&times;</button>
        
        <h2 className="modal-role">{role}, {company}</h2>
        <p className="modal-meta">{duration} | {location}</p>

        {/* Display Project/Tech Stack if available */}
        {project && <p className="modal-project">{project}</p>}

        <ul className="modal-details-list">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Modal;