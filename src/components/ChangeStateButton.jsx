// src/components/ChangeStateButton.jsx
import React from 'react';

const ChangeStateButton = ({ isAdmin, req, changeState }) => {
  if (!isAdmin) return null;

  const renderButton = () => {
    if (req.estado === 'aberta') {
      return <button onClick={() => changeState(req.id, 'em cotacao')}>Em Cotação</button>;
    }
    if (req.estado === 'em cotacao') {
      return <button onClick={() => changeState(req.id, 'cotada')}>Cotada</button>;
    }
    return null;
  };

  return <>{renderButton()}</>;
};

export default ChangeStateButton;
