// src/components/ExperienceCard.jsx

import React from 'react';
import '../styles/ExperienceCard.css';

function ExperienceCard({ experience, openModal }) {
  const { role, company, duration, summary } = experience;

  return (
    <div className="experience-card" onClick={() => openModal(experience)}>
      <div>
        <h3 className="card-title">{role} | {company}</h3>
        <p className="card-duration">{duration}</p>
        <p className="card-summary">{summary}</p>
      </div>
      <div className="details-link">
        click here to view the details
      </div>
    </div>
  );
}

export default ExperienceCard;