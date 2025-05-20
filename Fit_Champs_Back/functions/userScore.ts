//Função para a calcular a pontuação do usuário com base nos treinos da semana

//Estão faltando os evidos imports e o codigo precisa ser passado para python

const getPrimeiroDiaDaSemana = (): Date => {
  const dataAtual = new Date();
  const primeiroDiaDaSemana = new Date(dataAtual);
  primeiroDiaDaSemana.setDate(dataAtual.getDate() - dataAtual.getDay());
  primeiroDiaDaSemana.setHours(0, 0, 0, 0);
  return primeiroDiaDaSemana;
};

// Função utilitária que filtra os treinos da semana atual
const getTreinosDaSemana = (user: User): Treino[] => {
  const primeiroDiaDaSemana = getPrimeiroDiaDaSemana();

  return user.listaTreinos.filter((treino) => {
    const dataTreino = new Date(treino.data);
    return dataTreino >= primeiroDiaDaSemana;
  });
};

// Função principal com multiplicadores
export const pontuacao = (user: User): number => {
  const treinosDaSemana = getTreinosDaSemana(user);

  // Soma a carga total dos treinos da semana
  const cargaTotal = treinosDaSemana.reduce((soma, treino) => {
    return soma + treino.cargaTot;
  }, 0);

  // Multiplicador 1: Tipos diferentes de treinos
  const tiposDeTreinos = new Set();
  treinosDaSemana.forEach((treino) => {
    tiposDeTreinos.add(treino.nome);
  });
  const multiplicadorTipos = Math.max(tiposDeTreinos.size / 5 + 1, 1);

  // Multiplicador 2: Dias diferentes da semana
  const diasDaSemana = new Set();
  treinosDaSemana.forEach((treino) => {
    const dataTreino = new Date(treino.data);
    const diaDaSemana = dataTreino.getDay();
    diasDaSemana.add(diaDaSemana);
  });
  const multiplicadorDias = Math.max(diasDaSemana.size / 5 + 1, 1);

  // Calcula a pontuação com os dois multiplicadores
  return (cargaTotal / 100) * multiplicadorTipos * multiplicadorDias;
};

// Função que retorna a pontuação por tipo de treino
export const pontuacaoPorTipo = (user: User): Record<string, number> => {
  const treinosDaSemana = getTreinosDaSemana(user);

  // Armazenar a carga total por tipo de treino
  const cargaPorTipo: Record<string, number> = {};

  // Soma a carga para cada tipo de treino
  treinosDaSemana.forEach((treino) => {
    const tipo = treino.nome;

    if (cargaPorTipo[tipo]) {
      cargaPorTipo[tipo] += treino.cargaTot;
    } else {
      cargaPorTipo[tipo] = treino.cargaTot;
    }
  });

  // dividr a a carga total por 100
  Object.keys(cargaPorTipo).forEach((tipo) => {
    cargaPorTipo[tipo] = cargaPorTipo[tipo] / 100;
  });

  return cargaPorTipo;
};
