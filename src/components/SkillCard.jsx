// src/components/SkillCard.jsx

import React from 'react';
import '../styles/SkillCard.css'; // We'll create this next

function SkillCard({ skillName, imageUrl }) {
  return (
    <div className="skill-card">
      <div className="skill-icon-container">
        {/* Placeholder: Replace this with an actual <img> tag later */}
        <img src={imageUrl} alt={`${skillName} icon`} className="skill-icon" />
      </div>
      <p className="skill-name">{skillName}</p>
    </div>
  );
}

export default SkillCard;