import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Timeline from './Timeline';

const renderTimeline = () =>
  render(
    <MemoryRouter>
      <Timeline />
    </MemoryRouter>
  );

describe('Timeline Page', () => {
  it('renders the page heading', () => {
    renderTimeline();
    expect(screen.getByRole('heading', { name: /the election process/i })).toBeInTheDocument();
  });

  it('renders all 4 timeline steps', () => {
    renderTimeline();
    expect(screen.getByText('Voter Registration')).toBeInTheDocument();
    expect(screen.getByText('Find Your Polling Station')).toBeInTheDocument();
    expect(screen.getByText('Cast Your Vote')).toBeInTheDocument();
    expect(screen.getByText('Results & Inauguration')).toBeInTheDocument();
  });

  it('renders the overall progress bar', () => {
    renderTimeline();
    expect(screen.getByLabelText(/overall checklist progress/i)).toBeInTheDocument();
  });

  it('renders date badges for each step', () => {
    renderTimeline();
    expect(screen.getByText('Months before Election')).toBeInTheDocument();
    expect(screen.getByText('Weeks before Election')).toBeInTheDocument();
    expect(screen.getByText('Election Day')).toBeInTheDocument();
    expect(screen.getByText('Post-Election')).toBeInTheDocument();
  });

  it('renders show checklist toggle buttons', () => {
    renderTimeline();
    const toggles = screen.getAllByText(/show checklist & tips/i);
    expect(toggles).toHaveLength(4);
  });

  it('expands a step when toggle is clicked', () => {
    renderTimeline();
    const firstToggle = screen.getAllByText(/show checklist & tips/i)[0];
    fireEvent.click(firstToggle);
    expect(screen.getByText(/confirm you meet age and citizenship requirements/i)).toBeInTheDocument();
  });

  it('collapses a step when toggle is clicked again', () => {
    renderTimeline();
    const firstToggle = screen.getAllByText(/show checklist & tips/i)[0];
    fireEvent.click(firstToggle);
    // After expanding, the hide button appears
    expect(screen.getByText(/hide details/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/hide details/i));
    // After collapsing, the show button reappears
    expect(screen.getAllByText(/show checklist & tips/i).length).toBeGreaterThan(0);
  });

  it('shows tip text when step is expanded', () => {
    renderTimeline();
    const firstToggle = screen.getAllByText(/show checklist & tips/i)[0];
    fireEvent.click(firstToggle);
    expect(screen.getByText(/most states allow online registration/i)).toBeInTheDocument();
  });

  it('shows external link when step is expanded', () => {
    renderTimeline();
    const firstToggle = screen.getAllByText(/show checklist & tips/i)[0];
    fireEvent.click(firstToggle);
    expect(screen.getByRole('link', { name: /register to vote/i })).toBeInTheDocument();
  });

  it('checklist items can be checked', () => {
    renderTimeline();
    const firstToggle = screen.getAllByText(/show checklist & tips/i)[0];
    fireEvent.click(firstToggle);
    const checkBtn = screen.getAllByRole('button', { name: /^check:/i })[0];
    fireEvent.click(checkBtn);
    expect(screen.getByRole('button', { name: /^uncheck:/i })).toBeInTheDocument();
  });

  it('progress updates when checklist items are checked', () => {
    renderTimeline();
    const firstToggle = screen.getAllByText(/show checklist & tips/i)[0];
    fireEvent.click(firstToggle);
    const checkBtn = screen.getAllByRole('button', { name: /^check:/i })[0];
    fireEvent.click(checkBtn);
    expect(screen.getByText(/25% done/i)).toBeInTheDocument();
  });

  it('has main landmark with correct id', () => {
    renderTimeline();
    expect(document.getElementById('main-content')).toBeInTheDocument();
  });

  it('renders the Google Maps section', () => {
    renderTimeline();
    expect(screen.getByText(/find polling stations near you/i)).toBeInTheDocument();
  });

  it('Google Maps iframe has a title for accessibility', () => {
    renderTimeline();
    const iframe = screen.getByTitle(/find polling stations/i);
    expect(iframe).toBeInTheDocument();
  });
});
