import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Home from './Home';

// Mock framer-motion and react-intersection-observer if needed
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: 'div',
      section: 'section',
      h1: 'h1',
      p: 'p',
      img: 'img',
    },
    useScroll: () => ({ scrollYProgress: { get: () => 0, onChange: () => {} } }),
    useTransform: () => ({ get: () => 0, onChange: () => {} }),
  };
});

describe('Home Page', () => {
  it('renders main headings', () => {
    // Basic test
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/Election Process/i).length).toBeGreaterThan(0);
  });
});
