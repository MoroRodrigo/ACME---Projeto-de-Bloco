import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const Contato = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");
  const [fornecedores, setFornecedores] = useState([]);
  const [contatos, setContatos] = useState([]);
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
      alert("Você não tem permissão para adicionar contatos.");
      return;
    }

    try {
      // Adicionando contato ao Firestore
      await addDoc(collection(db, "contatos"), {
        nome,
        email,
        telefone,
        fornecedorId,
      });

      // Limpar os campos após o envio
      setNome("");
      setEmail("");
      setTelefone("");
      setFornecedorId("");

      // Atualizar a lista de contatos
      fetchContatos();
    } catch (error) {
      console.error("Erro ao adicionar contato: ", error);
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

  // Função para buscar contatos do Firestore
  const fetchContatos = async () => {
    const querySnapshot = await getDocs(collection(db, "contatos"));
    const contatosList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setContatos(contatosList);
  };

  // Buscar fornecedores, contatos e verificar status de administrador ao carregar o componente
  useEffect(() => {
    checkAdminStatus();
    fetchFornecedores();
    fetchContatos();
  }, []);

  return (
    <div className="contato-container">
      <h2>Cadastrar Contato</h2>
      {isAdmin ? (
        <form onSubmit={handleSubmit} className="contato-form">
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
          <div className="form-group">
            <label htmlFor="fornecedor">Fornecedor:</label>
            <select
              id="fornecedor"
              value={fornecedorId}
              onChange={(e) => setFornecedorId(e.target.value)}
              required
            >
              <option value="">Selecione um fornecedor</option>
              {fornecedores.map((fornecedor) => (
                <option key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.nome}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      ) : (
        <p>Você não tem permissão para adicionar contatos.</p>
      )}
      <h2>Lista de Contatos</h2>
      <ul className="contatos-list">
        {contatos.map((contato) => (
          <li key={contato.id}>
            <p><strong>Nome:</strong> {contato.nome}</p>
            <p><strong>Email:</strong> {contato.email}</p>
            <p><strong>Telefone:</strong> {contato.telefone}</p>
            <p><strong>Fornecedor:</strong> {fornecedores.find(f => f.id === contato.fornecedorId)?.nome || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contato;
