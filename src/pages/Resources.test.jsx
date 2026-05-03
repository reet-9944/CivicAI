import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Resources from './Resources';

// Mock framer-motion fully to ensure components render their children
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  const mockComponent = (type) => {
    return React.forwardRef(({ children, ...props }, ref) => {
      // Remove framer-motion specific props
      const { 
        initial, animate, exit, transition, whileHover, whileTap, 
        whileFocus, whileDrag, whileInView, viewport, style, ...validProps 
      } = props;
      return React.createElement(type, { ref, style, ...validProps }, children);
    });
  };

  return {
    ...actual,
    motion: {
      div: mockComponent('div'),
      button: mockComponent('button'),
      circle: mockComponent('circle'),
      li: mockComponent('li'),
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

describe('Resources Page', () => {
  it('renders resources header and sections', () => {
    render(<Resources />);
    expect(screen.getAllByText(/Voter/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/How to Register/i).length).toBeGreaterThan(0);
  });
});
