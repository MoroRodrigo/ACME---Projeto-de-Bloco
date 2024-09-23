// src/__tests__/ExportCSV.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ExportCSV from '../components/ExportCSV';

describe('ExportCSV Component', () => {
  test('renders export button', () => {
    const mockRequisicoes = [
      { id: 1, item: 'Produto 1', valor: 100 },
      { id: 2, item: 'Produto 2', valor: 200 },
    ];

    render(
      <MemoryRouter>
        <ExportCSV requisicoes={mockRequisicoes} />
      </MemoryRouter>
    );

    const buttonElement = screen.getByText(/exportar cotações em csv/i);
    expect(buttonElement).to.exist; // Altere aqui para to.exist
  });
});
