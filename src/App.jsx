import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Assistant from './pages/Assistant';
import Timeline from './pages/Timeline';
import Resources from './pages/Resources';

function App() {
  const location = useLocation();

  return (
    <>
      {/* Accessibility: skip to main content */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default App;
