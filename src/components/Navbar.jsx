import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaVoteYea, FaRobot, FaStream, FaHome, FaBookOpen,
  FaGlobe, FaChevronDown, FaCheck,
} from 'react-icons/fa';
import '../styles/Navbar.css';

/* ── Language data ─────────────────────────────────────────── */
const LANGUAGES = [
  { code: '/auto/en', label: 'English', flag: '🇺🇸' },
  { code: '/auto/es', label: 'Español', flag: '🇪🇸' },
  { code: '/auto/fr', label: 'Français', flag: '🇫🇷' },
  { code: '/auto/de', label: 'Deutsch', flag: '🇩🇪' },
  { code: '/auto/hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: '/auto/zh-CN', label: '中文', flag: '🇨🇳' },
  { code: '/auto/ar', label: 'العربية', flag: '🇸🇦' },
  { code: '/auto/pt', label: 'Português', flag: '🇧🇷' },
  { code: '/auto/ja', label: '日本語', flag: '🇯🇵' },
  { code: '/auto/ko', label: '한국어', flag: '🇰🇷' },
  { code: '/auto/ru', label: 'Русский', flag: '🇷🇺' },
  { code: '/auto/it', label: 'Italiano', flag: '🇮🇹' },
];

/**
 * Reads the current language from the Google Translate cookie.
 * Returns the LANGUAGES entry or the English default.
 */
function getCurrentLang() {
  try {
    const match = document.cookie.match(/googtrans=([^;]+)/);
    if (match) {
      const val = decodeURIComponent(match[1]); // e.g. "/auto/es"
      const found = LANGUAGES.find(l => l.code === val);
      if (found) return found;
    }
  } catch (_) { /* ignore */ }
  return LANGUAGES[0];
}

/**
 * Sets the Google Translate cookie and reloads the page.
 * Uses the official googtrans cookie format that Google Translate reads.
 */
function applyGoogleTranslate(langCode) {
  const domain = window.location.hostname;
  if (langCode === '/auto/en') {
    // Reset to English — clear the cookie
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  } else {
    document.cookie = `googtrans=${langCode}; path=/;`;
    document.cookie = `googtrans=${langCode}; path=/; domain=${domain};`;
  }
  window.location.reload();
}

/* ── Language Selector component ───────────────────────────── */
function LangSelector() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(LANGUAGES[0]);
  const wrapRef = useRef(null);

  useEffect(() => {
    setCurrent(getCurrentLang());
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = useCallback((lang) => {
    setCurrent(lang);
    setOpen(false);
    applyGoogleTranslate(lang.code);
  }, []);

  return (
    <div className="lang-selector" ref={wrapRef}>
      {/* Trigger button */}
      <button
        className="lang-btn"
        onClick={() => setOpen(v => !v)}
        aria-label={`Language: ${current.label}. Click to change`}
        aria-expanded={open}
        aria-haspopup="listbox"
        type="button"
      >
        <FaGlobe aria-hidden="true" className="lang-globe-icon" />
        <span className="lang-btn-text">{current.flag} {current.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <FaChevronDown aria-hidden="true" className="lang-chevron-icon" />
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            className="lang-dropdown"
            role="listbox"
            aria-label="Select language"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            {LANGUAGES.map(lang => (
              <li key={lang.code} role="option" aria-selected={lang.code === current.code}>
                <button
                  className={`lang-option${lang.code === current.code ? ' active' : ''}`}
                  onClick={() => select(lang)}
                  type="button"
                  aria-label={`Switch to ${lang.label}`}
                >
                  <span className="lang-flag">{lang.flag}</span>
                  <span className="lang-name">{lang.label}</span>
                  {lang.code === current.code && (
                    <FaCheck aria-hidden="true" className="lang-check" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Navbar ─────────────────────────────────────────────────── */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
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

          {/* Logo */}
          <Link to="/" className="nav-logo" aria-label="CivicAI – go to home page" onClick={closeMenu}>
            <FaVoteYea className="logo-icon" aria-hidden="true" />
            <span>
              <span className="logo-text-civic">Civic</span>
              <span className="logo-text-ai">AI</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-links" role="list">
            <li>
              <NavLink to="/" end
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                aria-label="Home">
                <FaHome aria-hidden="true" /> <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/timeline"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                aria-label="Election Process Timeline">
                <FaStream aria-hidden="true" /> <span>Process</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/resources"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                aria-label="Voter Resources">
                <FaBookOpen aria-hidden="true" /> <span>Resources</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/assistant"
                className={({ isActive }) => isActive ? 'nav-link btn-assistant active' : 'nav-link btn-assistant'}
                aria-label="Ask the AI Assistant">
                <FaRobot aria-hidden="true" /> <span>Ask AI</span>
              </NavLink>
            </li>
          </ul>

          {/* Language selector — always visible, no CDN dependency */}
          <LangSelector />

          {/* Hamburger (mobile) */}
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
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu} aria-label="Home">
            <FaHome aria-hidden="true" /> Home
          </NavLink>
          <NavLink to="/timeline" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu} aria-label="Election Process Timeline">
            <FaStream aria-hidden="true" /> Process
          </NavLink>
          <NavLink to="/resources" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu} aria-label="Voter Resources">
            <FaBookOpen aria-hidden="true" /> Resources
          </NavLink>
          <NavLink to="/assistant" className={({ isActive }) => isActive ? 'nav-link btn-assistant active' : 'nav-link btn-assistant'} onClick={closeMenu} aria-label="Ask the AI Assistant">
            <FaRobot aria-hidden="true" /> Ask AI
          </NavLink>

          {/* Language selector in mobile menu */}
          <div className="mobile-lang-wrap">
            <LangSelector />
          </div>
        </div>
      </motion.nav>

      {/*
        Hidden Google Translate element — required for the googtrans cookie
        to be picked up by Google's translation service on page reload.
        The official Google Translate script is loaded in index.html.
      */}
      <div id="google_translate_element" style={{ display: 'none' }} aria-hidden="true" />
    </header>
  );
};

export default React.memo(Navbar);
