// src/components/ExportCSV.jsx
import React from 'react';
import { CSVLink } from 'react-csv';

const ExportCSV = ({ requisicoes }) => {
  return (
    <CSVLink data={requisicoes} filename="cotacoes.csv">
      Exportar Cotações em CSV
    </CSVLink>
  );
};

export default ExportCSV;
