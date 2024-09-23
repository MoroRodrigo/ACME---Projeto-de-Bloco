// src/components/DeleteRequest.jsx
import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import '../App.css';

const DeleteRequest = ({ id, fetchRequisicoes }) => {
  const handleDelete = async () => {
    try {
      const requisicaoRef = doc(db, 'requisicoes', id);
      await deleteDoc(requisicaoRef);
      fetchRequisicoes();
    } catch (error) {
      console.error('Erro ao excluir requisição:', error);
    }
  };

  return <button className="action-button" onClick={handleDelete}>Excluir</button>;
};

export default DeleteRequest;
