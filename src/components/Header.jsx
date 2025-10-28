// src/components/Header.jsx
import React from 'react';
import '../styles/Header.css'; // You'll create this file
import ThemeToggle from './ThemeToggle'; // 💡 NEW IMPORT 💡

// src/components/Header.jsx (Updated Content)

function Header() {
  return (
    <header className="header-bar">
      {/* 💡 NEW DIV WRAPPER for centering */}
      <div className="header-content"> 
        <div className="logo">
          <a href="#hero">Mani Reddy<span className="accent-dot">.</span></a>
        </div>
        <nav className="nav-links">
          <a href="#hero">Home</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
          
          <a 
            href="/resume.pdf"  /* Points to the file in the 'public' directory */
            download="Mani_Reddy.pdf" /* 💡 The 'download' attribute triggers the download */
            className="btn-primary"
          >
            Resume
          </a>

        </nav>
      
      </div> 
      {/* 💡 END NEW DIV WRAPPER */}
    </header>
  );
}
export default Header; 