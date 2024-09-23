// src/__tests__/Login.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';

describe('Login Component', () => {
  test('renders login form', () => {
    render(
    <MemoryRouter>
        <Login />
    </MemoryRouter>
    );
    const headingElement = screen.getByText(/login/i);
    expect(headingElement).to.exist;
  });
});
