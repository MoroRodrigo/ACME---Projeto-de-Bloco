// src/__tests__/Register.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Register from '../components/Register';

describe('Register Component', () => {
  test('renders register form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const registerButton = screen.getByRole('button', { name: /registrar/i }); // Atualize aqui para "Registrar"
    expect(registerButton).to.exist;
  });
});
