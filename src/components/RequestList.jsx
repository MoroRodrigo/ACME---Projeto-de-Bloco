// src/components/RequestList.jsx
import React from 'react';
import ChangeStateButton from './ChangeStateButton';
import DeleteRequest from './DeleteRequest';
import '../App.css';

const RequestList = ({ requisicoes, isAdmin, changeState, handleEdit, fetchRequisicoes }) => {
  return (
    <ul>
      {requisicoes.map((req) => (
        <li key={req.id}>
          <p className="request-item">Item: {req.item}</p>
          <p className="request-item">Quantidade: {req.quantidade}</p>
          <p className="request-item">Justificativa: {req.justificativa}</p>
          <p className="request-item">Estado: {req.estado}</p>
          <div className="button-group">
            <ChangeStateButton isAdmin={isAdmin} req={req} changeState={changeState} />
            <button className="action-button" onClick={() => handleEdit(req)}>Editar</button>
            <DeleteRequest id={req.id} fetchRequisicoes={fetchRequisicoes} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RequestList;
