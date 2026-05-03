import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navbar from './Navbar';

const renderNavbar = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar />
    </MemoryRouter>
  );

describe('Navbar Component', () => {
  it('renders the CivicAI logo', () => {
    renderNavbar();
    expect(screen.getByLabelText(/CivicAI/i)).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderNavbar();
    // Use getAllByRole since "Home" matches both logo and nav link
    const homeLinks = screen.getAllByRole('link', { name: /home/i });
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: /election process timeline/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /voter resources/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ask the ai assistant/i })).toBeInTheDocument();
  });

  it('has a banner landmark role', () => {
    renderNavbar();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('has a navigation landmark', () => {
    renderNavbar();
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });

  it('renders hamburger button on mobile', () => {
    renderNavbar();
    const hamburger = screen.getByRole('button', { name: /open navigation menu/i });
    expect(hamburger).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    renderNavbar();
    const hamburger = screen.getByRole('button', { name: /open navigation menu/i });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes mobile menu when hamburger is clicked again', () => {
    renderNavbar();
    const hamburger = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(hamburger);
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('logo links to home page', () => {
    renderNavbar();
    const logo = screen.getByLabelText(/CivicAI – go to home page/i);
    expect(logo).toHaveAttribute('href', '/');
  });
});
