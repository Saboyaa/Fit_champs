import React from "react";
import peito from "../images/peito.png";

// Dados do usuário FORA da função (nível do módulo)
const userData = {
  id: 123,
  nome: "João Silva",
  foto: peito,
  telefone: "(11) 98765-4321",
  email: "joao.silva@email.com",
  idade: 28,
  altura: 178,
  peso: 75,
  posicaoanteriorRank: {
    rankpeito: 1,
    rankcostas: 1,
    rankperna: 1,
    rankbraco: 1,
    rankombro: 1,
  },
  posicaoRank: {
    rankpeito: 1,
    rankcostas: 1,
    rankperna: 1,
    rankbraco: 1,
    rankombro: 1,
  },
  sexo: "Masculino",
  cidade: "São Paulo",
  imc: {
    value: null,
    classification: "",
  },
  record: {
    peito: 4000,
    costas: 4000,
    perna: 4000,
    braco: 4000,
    ombro: 4000,
  },
  metas: {
    peito: 5000,
    costas: 5000,
    perna: 5000,
    braco: 5000,
    ombro: 5000,
  },
  treino: {
    data: "2022-10-10",
    Volume: 5,
    descricao: "Peito",
  },
};

// Função para retornar os dados do usuário
export const getUserDisplayInfo = () => {
  return {
    nome: userData.nome,
    foto: userData.foto,
  };
};

// Componente Usuario (se ainda precisar dele)
function Usuario() {
  const user = userData;

  return (
    <div>
      <h1>{user.nome}</h1>
      <img src={user.foto} alt={user.nome} />
      <p>Telefone: {user.telefone}</p>
      <p>Email: {user.email}</p>
      <p>Idade: {user.idade}</p>
      <p>Altura: {user.altura} cm</p>
      <p>Peso: {user.peso} kg</p>
      <p>Posição no Rank:</p>
      <ul>
        <li>Peito: {user.posicaoRank.rankpeito}</li>
        <li>Costas: {user.posicaoRank.rankcostas}</li>
        <li>Pernas: {user.posicaoRank.rankperna}</li>
        <li>Braços: {user.posicaoRank.rankbraco}</li>
        <li>Ombros: {user.posicaoRank.rankombro}</li>
      </ul>
      <p>Sexo: {user.sexo}</p>
      <p>Cidade: {user.cidade}</p>
    </div>
  );
}

export default Usuario;
