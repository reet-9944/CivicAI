import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders the logo and navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/Civic/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Process/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Resources/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Ask AI/i).length).toBeGreaterThan(0);
  });
});

