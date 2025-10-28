// src/components/Header.jsx

import React, { useState } from 'react'; // 💡 Ensure useState is imported from 'react' 💡
import '../styles/Header.css';
import ThemeToggle from './ThemeToggle';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Helper function to close menu after clicking a link
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header-bar">
      <div className="header-content">
        <div className="logo">
          <a href="#hero" onClick={closeMenu}>Mani Reddy's Portfolio<span className="accent-dot">.</span></a>
        </div>

        {/* 💡 1. HAMBURGER BUTTON - SHOWN ON MOBILE 💡 */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* 💡 2. CONDITIONAL CLASS FOR MOBILE MENU 💡 */}
        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>

          <a href="#hero" onClick={closeMenu}>Home</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#education" onClick={closeMenu}>Education</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>

          

          <a
            href="/resume.pdf"
            download="Mani_Reddy.pdf"
            className="btn-primary"
            onClick={closeMenu}
          >
            Resume
          </a>

        </nav>

      </div>
    </header>
  );
}
export default Header;