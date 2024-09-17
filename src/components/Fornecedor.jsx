import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const Fornecedor = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [fornecedores, setFornecedores] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Função para verificar se o usuário é um administrador
  const checkAdminStatus = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && userDoc.data().role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  };


  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      alert("Você não tem permissão para adicionar fornecedores.");
      return;
    }

    try {
      // Adicionando fornecedor ao Firestore
      await addDoc(collection(db, "fornecedores"), {
        nome,
        email,
        telefone,
      });

      // Limpar os campos após o envio
      setNome("");
      setEmail("");
      setTelefone("");

      // Atualizar a lista de fornecedores
      fetchFornecedores();
    } catch (error) {
      console.error("Erro ao adicionar fornecedor: ", error);
    }
  };

  // Função para buscar fornecedores do Firestore
  const fetchFornecedores = async () => {
    const querySnapshot = await getDocs(collection(db, "fornecedores"));
    const fornecedoresList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFornecedores(fornecedoresList);
  };

  // Buscar fornecedores e verificar status de administrador ao carregar o componente
  useEffect(() => {
    checkAdminStatus();
    fetchFornecedores();
  }, []);

  return (
    <div className="fornecedor-container">
      <h2>Cadastrar Fornecedor</h2>
      {isAdmin ? (
        <form onSubmit={handleSubmit} className="fornecedor-form">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      ) : (
        <p>Você não tem permissão para adicionar fornecedores.</p>
      )}
      <h2>Lista de Fornecedores</h2>
      <ul className="fornecedores-list">
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.id}>
            <p><strong>Nome:</strong> {fornecedor.nome}</p>
            <p><strong>Email:</strong> {fornecedor.email}</p>
            <p><strong>Telefone:</strong> {fornecedor.telefone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fornecedor;
