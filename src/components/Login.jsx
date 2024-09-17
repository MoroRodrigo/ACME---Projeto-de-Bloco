import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Certifique-se de importar 'db' para acessar o Firestore
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Tenta fazer o login com email e senha
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtém o documento do usuário no Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Verifica se o status do usuário é 'blocked'
        if (userData.status === 'blocked') {
          // Se o usuário estiver bloqueado, exibe uma mensagem de erro
          setError('Sua conta está bloqueada. Entre em contato com o administrador.');
          // Desloga o usuário
          auth.signOut();
        } else {
          // Se o usuário não estiver bloqueado, redireciona para a página desejada
          navigate('/fornecedor');
        }
      } else {
        setError('Usuário não encontrado no sistema.');
      }
    } catch (error) {
      // Mensagem de erro para login falho
      if (error.code === 'auth/user-not-found') {
        setError('Usuário não encontrado. Verifique o email e tente novamente.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Senha incorreta. Verifique a senha e tente novamente.');
      } else {
        setError('Erro ao fazer login: ' + error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Entrar</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>
        Não tem uma conta? <a href="/register">Crie uma aqui</a>
      </p>
    </div>
  );
};

export default Login;
