// src/Requisicao.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import CreateRequest from './CreateRequest';
import RequestList from './RequestList';
import ExportCSV from './ExportCSV';
import CheckAdminStatus from './CheckAdminStatus';

const Requisicao = () => {
  const [requisicoes, setRequisicoes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [editRequest, setEditRequest] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchRequisicoes = async () => {
    if (!user) return; // Garante que o usuário está logado antes de buscar as requisições
    // Consulta para buscar apenas as requisições do usuário logado
    const q = query(
      collection(db, 'requisicoes'),
      where('userId', '==', user.uid), // Filtra as requisições pelo uid do usuário logado
      orderBy('dataCriacao', sortOrder)
    );

    const querySnapshot = await getDocs(q);
    const requisicoesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRequisicoes(requisicoesList);
  };

  const changeState = async (id, newState) => {
    const requisicaoRef = doc(db, 'requisicoes', id);
    await updateDoc(requisicaoRef, { estado: newState });
    fetchRequisicoes();
  };

  const handleEdit = (req) => {
    setEditRequest(req);
  };

  const clearEdit = () => {
    setEditRequest(null);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    if (user && !loading) {
      fetchRequisicoes();
    }
  }, [user, loading, sortOrder]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Requisitar Compras</h2>
      <CheckAdminStatus user={user} setIsAdmin={setIsAdmin} />
      <CreateRequest user={user} editRequest={editRequest} fetchRequisicoes={fetchRequisicoes} clearEdit={clearEdit} />
      <h2>Minhas Requisições</h2>
      <button onClick={toggleSortOrder}>
        Ordenar por data: {sortOrder === 'asc' ? 'Mais antigas primeiro' : 'Mais novas primeiro'}
      </button>
      <RequestList
        requisicoes={requisicoes}
        isAdmin={isAdmin}
        changeState={changeState}
        handleEdit={handleEdit}
        fetchRequisicoes={fetchRequisicoes}
      />
      <ExportCSV requisicoes={requisicoes} />
    </div>
  );
};

export default Requisicao;
