import React, { useState } from 'react';
import axios from 'axios';

const ConsultaCotacoes = () => {
  const [produto, setProduto] = useState(''); // Produto a ser pesquisado
  const [cotas, setCotas] = useState([]);     // Dados de cotações
  const [loading, setLoading] = useState(false); // Indicador de carregamento

  // Função para buscar cotações na API do Mercado Livre
  const buscarCotacoes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`
      );
      setCotas(response.data.results); // Armazena os resultados no estado
    } catch (error) {
      console.error("Erro ao buscar cotações", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consulta-cotacoes">
      <h1>Consulta de Cotações de Produtos</h1>

      {/* Campo de pesquisa de produto */}
      <input 
        type="text" 
        placeholder="Digite o nome do produto" 
        value={produto} 
        onChange={(e) => setProduto(e.target.value)} 
      />

      <button onClick={buscarCotacoes}>Buscar Cotações</button>

      {/* Exibe indicador de carregamento */}
      {loading && <p>Carregando cotações...</p>}

      {/* Exibe as cotações */}
      <div className="resultado-cotacoes">
        {cotas.length > 0 ? (
          <ul>
            {cotas.map((cota) => (
              <li key={cota.id}>
                <h3>{cota.title}</h3>
                <p>Preço: R$ {cota.price.toFixed(2)}</p>

                {/* Checagem condicional para exibir city_name e state_name */}
                <p>Localização: {cota.address?.city_name || 'Cidade não informada'}, {cota.address?.state_name || 'Estado não informado'}</p>

                <a href={cota.permalink} target="_blank" rel="noopener noreferrer">Ver no Mercado Livre</a>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>Nenhuma cotação encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default ConsultaCotacoes;
