/* global global */
import '@testing-library/jest-dom';

window.HTMLElement.prototype.scrollIntoView = function() {};

// Mock IntersectionObserver (required by framer-motion whileInView)
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) { this.callback = callback; }
  observe(el) {
    // Immediately trigger as intersecting so whileInView animations fire
    this.callback([{ isIntersecting: true, target: el }], this);
  }
  unobserve() {}
  disconnect() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
