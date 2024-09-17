import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Fornecedor from './components/Fornecedor';
import Contato from './components/Contato';
import Produto from './components/Produto';
import Cotacao from './components/Cotacao';
import ConsultaCotacoes from './components/ConsultaCotacoes';
import Requisicao from './components/Requisicao';
import Login from './components/Login';
import Register from './components/Register';
import CriarContaAdm from './components/CriarContaAdm';
import Contas from './components/Contas';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Router>
      <div>
        {user && <NavBar />} {/* Mostra a NavBar apenas se o usuário estiver autenticado */}
        <Routes>
          {/* Rotas Públicas */}
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}

          {/* Rotas Privadas */}
          {user && (
            <>
              <Route path="/fornecedor" element={<Fornecedor />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/produto" element={<Produto />} />
              <Route path="/cotacao" element={<Cotacao />} />
              <Route path="/consultacotacoes" element={<ConsultaCotacoes />} />
              <Route path="/requisicao" element={<Requisicao />} />
              <Route path="/criarcontaadm" element={<CriarContaAdm />} />
              <Route path="/contas" element={<Contas />} />
              <Route path="*" element={<Navigate to="/fornecedor" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
