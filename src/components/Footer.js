import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} PDF Converter. All rights reserved.</p>
        {/* <ul className="footer-links">
          <li><a href="#landing">Home</a></li>
          <li><a href="#tools">Tools</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul> */}
      </div>
    </footer>
  );
};

export default Footer;
