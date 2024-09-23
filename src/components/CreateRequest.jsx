// src/components/CreateRequest.jsx
import React, { useState, useEffect } from 'react';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const CreateRequest = ({ user, editRequest, fetchRequisicoes, clearEdit }) => {
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (editRequest) {
      setItem(editRequest.item);
      setQuantidade(editRequest.quantidade);
      setJustificativa(editRequest.justificativa);
      setEditId(editRequest.id);
    }
  }, [editRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const requisicaoRef = doc(db, 'requisicoes', editId);
        await updateDoc(requisicaoRef, {
          item,
          quantidade,
          justificativa,
          estado: 'aberta',
        });
        clearEdit();
      } else {
        await addDoc(collection(db, 'requisicoes'), {
          item,
          quantidade,
          justificativa,
          estado: 'aberta',
          userId: user.uid,
          dataCriacao: new Date(),
        });
      }

      setItem('');
      setQuantidade('');
      setJustificativa('');
      fetchRequisicoes();
    } catch (error) {
      console.error('Erro ao adicionar/atualizar requisição:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Justificativa"
        value={justificativa}
        onChange={(e) => setJustificativa(e.target.value)}
        required
      />
      <button type="submit">{editId ? 'Atualizar Requisição' : 'Enviar Requisição'}</button>
    </form>
  );
};

export default CreateRequest;
