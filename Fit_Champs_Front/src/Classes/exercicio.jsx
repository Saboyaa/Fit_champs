function Exercicio() {
  const Exercicio = {
    nome: "Supino Reto",
    imagem: "imagem",
    volumeexercicio: 3,
    descricao: "Treino de Peito",
  };

  return (
    <div>
      <h1>{Exercicio.nome}</h1>
      <img src={Exercicio.imagem} alt={Exercicio.nome} />
      <p>{Exercicio.descricao}</p>
      <p>Volume: {Exercicio.volumeexercicio}</p>
    </div>
  );
}
