import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Resources from './Resources';

const renderResources = () =>
  render(
    <MemoryRouter>
      <Resources />
    </MemoryRouter>
  );

describe('Resources Page', () => {
  it('renders the page heading', () => {
    renderResources();
    expect(screen.getByRole('heading', { name: /voter resources/i })).toBeInTheDocument();
  });

  it('renders all 4 guide tabs', () => {
    renderResources();
    expect(screen.getByRole('tab', { name: /how to register/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /understanding ballots/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /know your rights/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /community organizing/i })).toBeInTheDocument();
  });

  it('first guide is active by default', () => {
    renderResources();
    // The first tab should be selected by default
    expect(screen.getByRole('tab', { name: /how to register/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('switches content when a different tab is clicked', () => {
    renderResources();
    const ballotsTab = screen.getByRole('tab', { name: /understanding ballots/i });
    fireEvent.click(ballotsTab);
    // After switching, the active tab label changes
    expect(screen.getByRole('tab', { name: /understanding ballots/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('shows checklist items for active guide', () => {
    renderResources();
    expect(screen.getByText(/check eligibility/i)).toBeInTheDocument();
  });

  it('checklist items can be checked', () => {
    renderResources();
    const checkBtns = screen.getAllByRole('button', { name: /^check:/i });
    expect(checkBtns.length).toBeGreaterThan(0);
    fireEvent.click(checkBtns[0]);
    expect(screen.getAllByRole('button', { name: /^uncheck:/i }).length).toBeGreaterThan(0);
  });

  it('renders the donut chart SVG', () => {
    renderResources();
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('renders the tip section', () => {
    renderResources();
    expect(screen.getByText(/tip:/i)).toBeInTheDocument();
  });

  it('renders the external resource link', () => {
    renderResources();
    expect(screen.getByRole('link', { name: /register at vote.gov/i })).toBeInTheDocument();
  });

  it('external link opens in new tab', () => {
    renderResources();
    const link = screen.getByRole('link', { name: /register at vote.gov/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the overall progress tracker', () => {
    renderResources();
    // Progress rings on each tab show completion percentage
    const progressRings = screen.getAllByLabelText(/% complete/i);
    expect(progressRings.length).toBe(4); // one per guide
  });

  it('progress updates when tasks are checked', () => {
    renderResources();
    const checkBtns = screen.getAllByRole('button', { name: /^check:/i });
    fireEvent.click(checkBtns[0]);
    // After 1 check, the tab ring shows 20% (1/5 tasks for register guide)
    expect(screen.getByLabelText(/20% complete/i)).toBeInTheDocument();
  });

  it('switching tabs preserves checked state of previous tab', () => {
    renderResources();
    const checkBtns = screen.getAllByRole('button', { name: /^check:/i });
    fireEvent.click(checkBtns[0]);
    const ballotsTab = screen.getByRole('tab', { name: /understanding ballots/i });
    fireEvent.click(ballotsTab);
    const registerTab = screen.getByRole('tab', { name: /how to register/i });
    fireEvent.click(registerTab);
    expect(screen.getAllByRole('button', { name: /^uncheck:/i }).length).toBeGreaterThan(0);
  });

  it('has main landmark with correct id', () => {
    renderResources();
    expect(document.getElementById('main-content')).toBeInTheDocument();
  });

  it('tab panel has correct aria-labelledby', () => {
    renderResources();
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', 'res-tab-register');
  });
});
