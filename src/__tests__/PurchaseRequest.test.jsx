// src/__tests__/PurchaseRequest.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Register from '../components/Register';

describe('Register Component', () => {
  test('renders registration form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const headingElement = screen.getByText(/criar conta/i); // Atualize aqui para "Criar Conta"
    expect(headingElement).to.exist;
  });
});
