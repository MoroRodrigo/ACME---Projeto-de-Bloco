import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const Cotacao = () => {
  const [produtoId, setProdutoId] = useState("");
  const [preco, setPreco] = useState("");
  const [data, setData] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);
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
      alert("Você não tem permissão para adicionar cotações.");
      return;
    }

    try {
      // Adicionando cotação ao Firestore
      await addDoc(collection(db, "cotacoes"), {
        produtoId,
        preco: parseFloat(preco),
        data,
      });

      // Limpar os campos após o envio
      setProdutoId("");
      setPreco("");
      setData("");

      // Atualizar a lista de cotações
      fetchCotacoes();
    } catch (error) {
      console.error("Erro ao adicionar cotação: ", error);
    }
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

  // Função para buscar cotações do Firestore
  const fetchCotacoes = async () => {
    const querySnapshot = await getDocs(collection(db, "cotacoes"));
    const cotacoesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCotacoes(cotacoesList);
  };

  // Buscar produtos, cotações e verificar status de administrador ao carregar o componente
  useEffect(() => {
    checkAdminStatus();
    fetchProdutos();
    fetchCotacoes();
  }, []);

  return (
    <div className="cotacao-container">
      <h2>Cadastrar Cotação</h2>
      {isAdmin ? (
        <form onSubmit={handleSubmit} className="cotacao-form">
          <div className="form-group">
            <label htmlFor="produto">Produto:</label>
            <select
              id="produto"
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
              required
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome}
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
          <div className="form-group">
            <label htmlFor="data">Data da Cotação:</label>
            <input
              type="date"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      ) : (
        <p>Você não tem permissão para adicionar cotações.</p>
      )}
      <h2>Lista de Cotações</h2>
      <ul className="cotacoes-list">
        {cotacoes.map((cotacao) => (
          <li key={cotacao.id}>
            <p><strong>Produto:</strong> {produtos.find(p => p.id === cotacao.produtoId)?.nome || "N/A"}</p>
            <p><strong>Preço:</strong> R$ {cotacao.preco.toFixed(2)}</p>
            <p><strong>Data:</strong> {new Date(cotacao.data).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cotacao;
