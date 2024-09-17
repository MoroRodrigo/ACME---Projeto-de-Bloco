import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const NavBar = () => {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Função para verificar se o usuário é administrador
  const checkAdminStatus = async () => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid)); // Mudança no caminho da coleção
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Erro ao verificar o papel do usuário:', error);
      }
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <nav>
      <ul>
        {/* Links de navegação */}
        <li><NavLink to="/fornecedor">Fornecedor</NavLink></li>
        <li><NavLink to="/contato">Contato</NavLink></li>
        <li><NavLink to="/produto">Produto</NavLink></li>
        <li><NavLink to="/cotacao">Cotação</NavLink></li>
        <li><NavLink to="/consultacotacoes">Consulta de Cotações</NavLink></li>
        <li><NavLink to="/requisicao">Requisição</NavLink></li>
        
        {/* Links visíveis apenas para administradores */}
        {isAdmin && (
          <>
            <li><NavLink to="/criarcontaadm">Criar conta Adm</NavLink></li>
            <li><NavLink to="/contas">Contas</NavLink></li>
          </>
        )}

        {/* Exibe e-mail do usuário e botão de sair, se o usuário estiver autenticado */}
        {user && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', color: 'blue' }}>
            <span>{user.email}</span>
            <button onClick={handleSignOut} style={{ display: 'flex', marginTop: '10px' }}>Sair</button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
