import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-content">
        <p>&copy; {year} CivicAI – Election Process Education. All rights reserved.</p>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/timeline">Process</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/assistant">Ask AI</Link>
        </nav>

        <p className="disclaimer">
          Disclaimer: This is an educational tool. For official election information, always refer to your
          local government election portal.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
