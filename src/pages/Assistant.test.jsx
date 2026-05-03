import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Assistant from './Assistant';

// Mock @google/generative-ai
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: vi.fn().mockReturnValue('Voter registration is the process of signing up to vote.'),
        },
      }),
    }),
  })),
}));

// Mock DOMPurify
vi.mock('dompurify', () => ({
  default: {
    sanitize: vi.fn(html => html),
  },
}));

const renderAssistant = () =>
  render(
    <MemoryRouter>
      <Assistant />
    </MemoryRouter>
  );

describe('Assistant Page', () => {
  it('renders the page heading', () => {
    renderAssistant();
    expect(screen.getByRole('heading', { name: /ask civicai/i })).toBeInTheDocument();
  });

  it('renders the API key input', () => {
    renderAssistant();
    expect(screen.getByLabelText(/gemini api key/i)).toBeInTheDocument();
  });

  it('renders the initial welcome message', () => {
    renderAssistant();
    expect(screen.getByText(/hello! i am civicai/i)).toBeInTheDocument();
  });

  it('renders the chat input field', () => {
    renderAssistant();
    expect(screen.getByLabelText(/type your question/i)).toBeInTheDocument();
  });

  it('renders the send button', () => {
    renderAssistant();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('send button is disabled when input is empty', () => {
    renderAssistant();
    const sendBtn = screen.getByRole('button', { name: /send message/i });
    expect(sendBtn).toBeDisabled();
  });

  it('send button enables when user types a message', () => {
    renderAssistant();
    const input = screen.getByLabelText(/type your question/i);
    fireEvent.change(input, { target: { value: 'How do I register to vote?' } });
    const sendBtn = screen.getByRole('button', { name: /send message/i });
    expect(sendBtn).not.toBeDisabled();
  });

  it('shows error when sending without API key', async () => {
    renderAssistant();
    const input = screen.getByLabelText(/type your question/i);
    fireEvent.change(input, { target: { value: 'How do I register?' } });
    const form = input.closest('form');
    fireEvent.submit(form);
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('has a main landmark with correct id', () => {
    renderAssistant();
    expect(document.getElementById('main-content')).toBeInTheDocument();
  });

  it('chat messages region has aria-live attribute', () => {
    renderAssistant();
    const log = screen.getByRole('log');
    expect(log).toHaveAttribute('aria-live', 'polite');
  });

  it('API key input has autocomplete off for security', () => {
    renderAssistant();
    const apiInput = screen.getByLabelText(/gemini api key/i);
    expect(apiInput).toHaveAttribute('autocomplete', 'off');
  });

  it('updates API key input value when typed', () => {
    renderAssistant();
    const apiInput = screen.getByLabelText(/gemini api key/i);
    fireEvent.change(apiInput, { target: { value: 'test-key-123' } });
    expect(apiInput.value).toBe('test-key-123');
  });
});
