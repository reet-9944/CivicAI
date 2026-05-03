import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Home from './Home';

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

describe('Home Page', () => {
  it('renders a hero heading', () => {
    renderHome();
    // Heading text may vary — just check h1 exists
    const h1 = document.querySelector('h1');
    expect(h1).toBeInTheDocument();
  });

  it('renders the hero badge with Google Gemini AI text', () => {
    renderHome();
    expect(screen.getByLabelText(/powered by google gemini ai/i)).toBeInTheDocument();
  });

  it('renders the Ask CivicAI CTA button', () => {
    renderHome();
    expect(screen.getByRole('link', { name: /start chatting with civicai/i })).toBeInTheDocument();
  });

  it('Ask CivicAI button links to /assistant', () => {
    renderHome();
    expect(screen.getByRole('link', { name: /start chatting with civicai/i })).toHaveAttribute('href', '/assistant');
  });

  it('renders the View Process button', () => {
    renderHome();
    expect(screen.getByRole('link', { name: /view the election process timeline/i })).toBeInTheDocument();
  });

  it('renders hero statistics', () => {
    renderHome();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('renders the Prepare to Vote section', () => {
    renderHome();
    expect(screen.getByText('Prepare to Vote')).toBeInTheDocument();
  });

  it('renders the Election Timeline section', () => {
    renderHome();
    expect(screen.getByText('The Election Timeline')).toBeInTheDocument();
  });

  it('renders the AI Assistant section', () => {
    renderHome();
    expect(screen.getByText('Ask the AI Assistant')).toBeInTheDocument();
  });

  it('renders the Electoral Process steps section', () => {
    renderHome();
    expect(screen.getByText(/electoral process/i)).toBeInTheDocument();
  });

  it('renders all 6 registration steps', () => {
    renderHome();
    expect(screen.getByLabelText('Step 01')).toBeInTheDocument();
    expect(screen.getByLabelText('Step 06')).toBeInTheDocument();
  });

  it('renders the Your Voice Matters gallery section', () => {
    renderHome();
    expect(screen.getByRole('heading', { name: /your voice matters/i })).toBeInTheDocument();
  });

  it('renders the election cycle section', () => {
    renderHome();
    expect(screen.getByText(/typical presidential election cycle/i)).toBeInTheDocument();
  });

  it('hero image has descriptive alt text', () => {
    renderHome();
    const heroImg = screen.getByAltText(/illustration of people voting/i);
    expect(heroImg).toBeInTheDocument();
  });

  it('Explore Resources link points to /resources', () => {
    renderHome();
    expect(screen.getByRole('link', { name: /explore voter resources/i })).toHaveAttribute('href', '/resources');
  });

  it('View Timeline link points to /timeline', () => {
    renderHome();
    expect(screen.getByRole('link', { name: /view the election timeline/i })).toHaveAttribute('href', '/timeline');
  });
});
