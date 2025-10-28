// src/components/EducationCard.jsx

import React from 'react';
import '../styles/EducationCard.css'; // We'll create this next

function EducationCard({ degree, institution, details }) {
  return (
    <div className="education-card">
      <h3 className="degree-title">{degree}</h3>
      <p className="institution">{institution}</p>
      <p className="details">{details}</p>
    </div>
  );
}

export default EducationCard;