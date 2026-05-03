import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaVoteYea, FaRobot, FaStream, FaHome, FaBookOpen } from 'react-icons/fa';
import '../styles/Navbar.css';

/**
 * Navbar component for the main application navigation.
 * @returns {JSX.Element} The rendered navigation bar.
 */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change / resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header role="banner">
      <motion.nav
        className="navbar-wrapper"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
        aria-label="Main navigation"
      >
        <div className="container nav-container">
          <Link to="/" className="nav-logo" aria-label="CivicAI – go to home page" onClick={closeMenu}>
            <FaVoteYea className="logo-icon" aria-hidden="true" />
            <span>
              <span className="logo-text-civic">Civic</span>
              <span className="logo-text-ai">AI</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links" role="list">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                aria-label="Home"
              >
                <FaHome aria-hidden="true" /> <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/timeline"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                aria-label="Election Process Timeline"
              >
                <FaStream aria-hidden="true" /> <span>Process</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resources"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                aria-label="Voter Resources"
              >
                <FaBookOpen aria-hidden="true" /> <span>Resources</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/assistant"
                className={({ isActive }) => isActive ? 'nav-link btn-assistant active' : 'nav-link btn-assistant'}
                aria-label="Ask the AI Assistant"
              >
                <FaRobot aria-hidden="true" /> <span>Ask AI</span>
              </NavLink>
            </li>
          </ul>

          {/* Google Translate widget */}
          <div id="google_translate_element" className="nav-translate" aria-label="Translate page" />

          {/* Hamburger button (mobile) */}
          <button
            className="nav-hamburger"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(prev => !prev)}
          >
            <span className="hamburger-line" aria-hidden="true" />
            <span className="hamburger-line" aria-hidden="true" />
            <span className="hamburger-line" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}
          aria-hidden={!menuOpen}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={closeMenu}
            aria-label="Home"
          >
            <FaHome aria-hidden="true" /> Home
          </NavLink>
          <NavLink
            to="/timeline"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={closeMenu}
            aria-label="Election Process Timeline"
          >
            <FaStream aria-hidden="true" /> Process
          </NavLink>
          <NavLink
            to="/resources"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            onClick={closeMenu}
            aria-label="Voter Resources"
          >
            <FaBookOpen aria-hidden="true" /> Resources
          </NavLink>
          <NavLink
            to="/assistant"
            className={({ isActive }) => isActive ? 'nav-link btn-assistant active' : 'nav-link btn-assistant'}
            onClick={closeMenu}
            aria-label="Ask the AI Assistant"
          >
            <FaRobot aria-hidden="true" /> Ask AI
          </NavLink>
        </div>
      </motion.nav>
    </header>
  );
};

export default React.memo(Navbar);
