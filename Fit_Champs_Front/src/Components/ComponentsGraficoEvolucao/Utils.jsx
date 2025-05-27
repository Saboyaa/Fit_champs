// src/components/GraficosEvolucao/utils.js
import trainingService from "../../services/trainingService";

// ========== FUNÇÕES DE ANÁLISE DOS DADOS ==========

// Função para calcular a tendência (melhora ou piora)
export const calculateTrend = (data) => {
  if (data.length < 2) return { type: "mesmo", diff: 0 };

  const lastVolume = data[data.length - 1].volume;
  const previousVolume = data[data.length - 2].volume;
  const diff = ((lastVolume / previousVolume - 1) * 100).toFixed(1);

  if (diff > 0) return { type: "melhora", diff };
  if (diff < 0) return { type: "piora", diff: Math.abs(diff) };
  return { type: "mesmo", diff: 0 };
};

// Calcular o progresso em relação à meta
export const calculateProgress = (data, meta) => {
  if (data.length === 0) return 0;
  const lastVolume = data[data.length - 1].volume;
  return ((lastVolume / meta) * 100).toFixed(1);
};

// ========== FUNÇÕES DE RENDERIZAÇÃO ==========

// Função para obter o ícone do grupo muscular
export const getIconComponent = (grupo, icons) => {
  const { peito, perna, ombro, costas, braco } = icons;

  switch (grupo.toLowerCase()) {
    case "peito":
      return <img src={peito} alt="Peito" className="w-8 h-8" />;
    case "perna":
      return <img src={perna} alt="Perna" className="w-8 h-8" />;
    case "ombro":
      return <img src={ombro} alt="Ombro" className="w-8 h-8" />;
    case "costas":
      return <img src={costas} alt="Costas" className="w-8 h-8" />;
    case "braço":
      return <img src={braco} alt="Braço" className="w-8 h-8" />;
    default:
      return null;
  }
};

// ========== FUNÇÕES DE PREPARAÇÃO DE DADOS PARA GRÁFICOS ==========

// Prepara dados para gráfico de comparação
export const prepareComparisonData = (trainingData, metas) => {
  const result = [];

  Object.keys(trainingData).forEach((type) => {
    const data = trainingData[type];
    if (data.length > 0) {
      const lastEntry = data[data.length - 1];
      result.push({
        nome: type,
        volume: lastEntry.volume,
        meta: metas[type],
      });
    }
  });

  return result;
};

// Prepara dados para gráfico de progresso total (resumo)
export const prepareSummaryData = (trainingData, trainingTypes) => {
  // Criamos um conjunto de todas as datas
  const allDates = new Set();
  Object.values(trainingData).forEach((data) => {
    data.forEach((entry) => allDates.add(entry.data));
  });

  // Ordenamos as datas usando a função centralizada do trainingService
  const sortedDates = Array.from(allDates).sort(trainingService.compareDates);

  // Criamos um array de objetos com a data e o volume de cada tipo de treino
  return sortedDates.map((date) => {
    const entry = { data: date };

    trainingTypes.forEach((type) => {
      const matchingEntry = trainingData[type].find((e) => e.data === date);
      entry[type] = matchingEntry ? matchingEntry.volume : 0;
    });

    return entry;
  });
};
