import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, getDoc } from 'firebase/firestore'; // Certifique-se de que 'deleteDoc' está importado
import { db, auth } from '../firebase';
import { CSVLink } from 'react-csv';
import { useAuthState } from 'react-firebase-hooks/auth';

const Requisicao = () => {
  const [descricao, setDescricao] = useState('');
  const [requisicoes, setRequisicoes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, loading] = useAuthState(auth);

  // Verifica se o usuário é administrador
  const checkAdminStatus = async () => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  };

  // Função para adicionar uma nova requisição
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'requisicoes'), {
        descricao,
        estado: 'aberta', // Estado inicial da requisição
        userId: user.uid,
        dataCriacao: new Date()
      });

      setDescricao('');
      fetchRequisicoes();
    } catch (error) {
      console.error('Erro ao adicionar requisição:', error);
    }
  };

  // Função para buscar todas as requisições
  const fetchRequisicoes = async () => {
    const q = query(collection(db, 'requisicoes'), orderBy('dataCriacao', 'asc'));
    const querySnapshot = await getDocs(q);
    const requisicoesList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setRequisicoes(requisicoesList);
  };

  // Função para alterar o estado de uma requisição
  const changeState = async (id, newState) => {
    const requisicaoRef = doc(db, 'requisicoes', id);
    await updateDoc(requisicaoRef, { estado: newState });
    fetchRequisicoes();
  };

  // Função para excluir uma requisição
  const deleteRequisicao = async (id) => {
    const requisicaoRef = doc(db, 'requisicoes', id);
    await deleteDoc(requisicaoRef); // Correção aqui: deleteDoc foi adicionado
    fetchRequisicoes();
  };

  // Verifica status de administrador e busca requisições ao carregar o componente
  useEffect(() => {
    if (user && !loading) {
      checkAdminStatus();
      fetchRequisicoes();
    }
  }, [user, loading]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Requisitar Compras</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <button type="submit">Enviar Requisição</button>
      </form>

      <h2>Minhas Requisições</h2>
      <ul>
        {requisicoes.map((req) => (
          <li key={req.id}>
            <p>{req.descricao}</p>
            <p>{req.estado}</p>
            {isAdmin && req.estado === 'aberta' && (
              <button onClick={() => changeState(req.id, 'em cotacao')}>Em Cotação</button>
            )}
            {isAdmin && req.estado === 'em cotacao' && (
              <button onClick={() => changeState(req.id, 'cotada')}>Cotada</button>
            )}
            <button onClick={() => deleteRequisicao(req.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <CSVLink data={requisicoes} filename="cotacoes.csv">
        Exportar Cotações em CSV
      </CSVLink>
    </div>
  );
};

export default Requisicao;
