import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

// Helper to render Footer inside a Router context (required for Link components)
const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

describe('Footer Component', () => {
  it('renders the copyright text and current year', () => {
    renderFooter();
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(new RegExp(`© ${currentYear} CivicAI`, 'i'));
    expect(copyrightText).toBeInTheDocument();
  });

  it('renders the disclaimer text', () => {
    renderFooter();
    const disclaimer = screen.getByText(/Disclaimer: This is an educational tool/i);
    expect(disclaimer).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /resources/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ask ai/i })).toBeInTheDocument();
  });

  it('has a contentinfo landmark role', () => {
    renderFooter();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
