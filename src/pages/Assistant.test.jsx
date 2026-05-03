import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Assistant from './Assistant';

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: 'div',
    },
  };
});

describe('Assistant Page', () => {
  it('renders the chat interface and input', () => {
    render(<Assistant />);
    expect(screen.getByText(/Ask CivicAI/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter your Google Gemini API key/i)).toBeInTheDocument();
  });
  
  it('shows error if API key is missing when sending message', () => {
    render(<Assistant />);
    const input = screen.getByLabelText(/Type your question/i);
    const button = screen.getByLabelText(/Send message/i);
    
    // Clear the API key (which might be populated by import.meta.env)
    const apiKeyInput = screen.getByLabelText(/Enter your Google Gemini API key/i);
    fireEvent.change(apiKeyInput, { target: { value: '' } });

    fireEvent.change(input, { target: { value: 'How do I register?' } });
    fireEvent.click(button);

    expect(screen.getByText(/Please provide a Google Gemini API Key/i)).toBeInTheDocument();
  });
});
