import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Pages - Lazy loaded for efficiency
const Home = React.lazy(() => import('./pages/Home'));
const Assistant = React.lazy(() => import('./pages/Assistant'));
const Timeline = React.lazy(() => import('./pages/Timeline'));
const Resources = React.lazy(() => import('./pages/Resources'));

function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      {/* Accessibility: skip to main content */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Navbar />

      <React.Suspense fallback={<div className="loading-fallback" role="status" aria-live="polite">Loading content...</div>}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </AnimatePresence>
      </React.Suspense>

      <Footer />
    </ErrorBoundary>
  );
}

export default App;
