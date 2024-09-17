import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CriarContaAdm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Adicionar nova conta ao Firestore
      await addDoc(collection(db, 'users'), {
        email,
        password,
        role: 'admin'
      });

      // Limpar os campos após o envio
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError('Erro ao criar conta de administrador.');
      console.error('Erro ao criar conta de administrador:', error);
    }
  };

  return (
    <div className="criar-conta-adm-container">
      <h2>Criar Conta de Administrador</h2>
      <form onSubmit={handleSubmit} className="criar-conta-adm-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Conta</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CriarContaAdm;
