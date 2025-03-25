import React from "react";

function Usuario() {
  const user = {
    nome: "João Silva",
    foto: "https://via.placeholder.com/150",
    telefone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    idade: 28,
    altura: 178,
    peso: 75,
    posicaoRank: 1,
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
  };

  return (
    <div>
      <h1>{user.nome}</h1>
      <img src={user.foto} alt={user.nome} />
      <p>Telefone: {user.telefone}</p>
      <p>Email: {user.email}</p>
      <p>Idade: {user.idade}</p>
      <p>Altura: {user.altura} cm</p>
      <p>Peso: {user.peso} kg</p>
      <p>Posição no Rank: {user.posicaoRank}</p>
      <p>Sexo: {user.sexo}</p>
      <p>Cidade: {user.cidade}</p>
    </div>
  );
}

export default Usuario;
