import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

/**
 * Footer component for the main application.
 * @returns {JSX.Element} The rendered footer.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-content">
        <p>&copy; {year} CivicAI – Election Process Education. All rights reserved.</p>
        
        <p className="mission-statement">
          Built for Hack2Skill to enhance civic tech, voter education, and clearly communicate the election process.
        </p>

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

export default React.memo(Footer);
