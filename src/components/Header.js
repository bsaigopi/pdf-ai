// Header.js
import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import logo from '../assets/image--copy.png';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
   <header className="header">
  <div className="logo">
    <Link to="/#landing" smooth className="nav-link" onClick={closeMenu}>
      <img src={logo} alt="Logo" className="logo-img" />
    </Link>
  </div>

  <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
    <span className="bar" />
    <span className="bar" />
    <span className="bar" />
  </button>



  <div className={`menu-container ${menuOpen ? 'open' : ''}`}>
    <nav className="nav">
      <Link to="/#landing" smooth className="nav-link" onClick={closeMenu}>Home</Link>
      <Link to="/#tools" smooth className="nav-link" onClick={closeMenu}>PDF Tools</Link>
      <Link to="/#aiPdfChat" smooth className="nav-link" onClick={closeMenu}>AI Chat PDF</Link>
      <Link to="/#support" smooth className="nav-link" onClick={closeMenu}>Support</Link>
      <Link to="/#faq" smooth className="nav-link" onClick={closeMenu}>FAQ’s</Link>
    </nav>
  </div>

  <div className="auth-links">
    <Link to="/#login" className="login">Login</Link>
    <Link to="/#signup" className="signup">Sign Up</Link>
  </div>
</header>

  );
};

export default Header;
