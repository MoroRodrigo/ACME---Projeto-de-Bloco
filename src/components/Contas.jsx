import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Contas = () => {
  const [contas, setContas] = useState([]);

  // Função para buscar contas do Firestore
  const fetchContas = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const contasList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setContas(contasList);
  };

  // Função para bloquear uma conta
  const handleBlock = async (id) => {
    try {
      await updateDoc(doc(db, 'users', id), {
        status: 'blocked'
      });
      fetchContas(); // Atualiza a lista de contas após bloqueio
    } catch (error) {
      console.error('Erro ao bloquear conta:', error);
    }
  };

  useEffect(() => {
    fetchContas();
  }, []);

  return (
    <div className="contas-container">
      <h2>Gerenciar Contas</h2>
      <ul className="contas-list">
        {contas.map((conta) => (
          <li key={conta.id}>
            <p><strong>Email:</strong> {conta.email}</p>
            <p><strong>Status:</strong> {conta.status || 'Ativo'}</p>
            {conta.role !== 'admin' && conta.status !== 'blocked' && (
              <button onClick={() => handleBlock(conta.id)}>Bloquear Conta</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contas;
