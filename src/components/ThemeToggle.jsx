// src/components/ThemeToggle.jsx

import React, { useState, useEffect } from 'react';
import '../styles/ThemeToggle.css'; // New CSS file for the switch

function ThemeToggle() {
  // 1. Initialize state with the value from local storage, or default to 'light'
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // 2. Effect runs when 'theme' changes
  useEffect(() => {
    // Save the new theme to local storage
    localStorage.setItem('theme', theme);

    // Apply or remove the 'dark-mode' class on the document body
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]); // Re-run effect when theme state changes

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="theme-toggle-container">
      <button 
        onClick={toggleTheme} 
        className="theme-switch"
        aria-label="Toggle dark and light mode"
      >
        {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
}

export default ThemeToggle;