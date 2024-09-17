import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const Produto = () => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");
  const [preco, setPreco] = useState("");
  const [produtos, setProdutos] = useState([]);
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
      alert("Você não tem permissão para adicionar produtos.");
      return;
    }

    try {
      // Adicionando produto ao Firestore
      await addDoc(collection(db, "produtos"), {
        nome,
        categoria,
        fornecedorId,
        preco: parseFloat(preco),
      });

      // Limpar os campos após o envio
      setNome("");
      setCategoria("");
      setFornecedorId("");
      setPreco("");

      // Atualizar a lista de produtos
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao adicionar produto: ", error);
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

  // Função para buscar produtos do Firestore
  const fetchProdutos = async () => {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    const produtosList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProdutos(produtosList);
  };

  // Buscar fornecedores e produtos ao carregar o componente
  useEffect(() => {
    checkAdminStatus();
    fetchFornecedores();
    fetchProdutos();
  }, []);

  return (
    <div className="produto-container">
      <h2>Cadastrar Produto</h2>
      {isAdmin && (
        <form onSubmit={handleSubmit} className="produto-form">
          <div className="form-group">
            <label htmlFor="nome">Nome do Produto:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoria:</label>
            <input
              type="text"
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="preco">Preço:</label>
            <input
              type="number"
              id="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      )}
      {!isAdmin && <p>Você não tem permissão para adicionar produtos.</p>}
      <h2>Lista de Produtos</h2>
      <ul className="produtos-list">
        {produtos.map((produto) => (
          <li key={produto.id}>
            <p><strong>Nome:</strong> {produto.nome}</p>
            <p><strong>Categoria:</strong> {produto.categoria}</p>
            <p><strong>Fornecedor:</strong> {fornecedores.find(f => f.id === produto.fornecedorId)?.nome || "N/A"}</p>
            <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produto;
