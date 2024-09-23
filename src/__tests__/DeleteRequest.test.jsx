// src/__tests__/DeleteRequest.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DeleteRequest from '../components/DeleteRequest';

describe('DeleteRequest Component', () => {
  test('renders delete request button', () => {
    render(
      <MemoryRouter>
        <DeleteRequest id="1" fetchRequisicoes={() => {}} />
      </MemoryRouter>
    );
    const buttonElement = screen.getByText(/excluir/i);
    expect(buttonElement).to.exist; // Altere aqui para to.exist
  });
});
