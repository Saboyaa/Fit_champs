import React from "react";

function Usuario() {
  const user = {
    nome: "João Silva",
    foto: "imagem",
    telefone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    idade: 28,
    altura: 178,
    peso: 75,
    posicaoRank: 1,
    sexo: "Masculino",
    cidade: "São Paulo",
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
