import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Timeline from './Timeline';

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
      section: mockComponent('section'),
      li: mockComponent('li'),
      span: mockComponent('span'),
      button: mockComponent('button'),
      a: mockComponent('a'),
      h1: mockComponent('h1'),
      h2: mockComponent('h2'),
      p: mockComponent('p'),
      img: mockComponent('img'),
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

describe('Timeline Page', () => {
  it('renders timeline events and header', () => {
    render(<Timeline />);
    expect(screen.getAllByText(/The Election Process/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Voter Registration/i).length).toBeGreaterThan(0);
  });
});
