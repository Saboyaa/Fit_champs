// src/components/GraficosEvolucao/utils.js
import trainingService from "../../services/trainingService";

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

// src/components/GraficosEvolucao/chartUtils.js

/**
 * Calcula configuração do eixo Y com exatamente 5 ticks personalizados
 * @param {Array} dataValues - Array com os valores numéricos dos dados
 * @param {Array} metaValues - Array com os valores das metas (opcional)
 * @param {boolean} includeMetas - Se deve considerar as metas no cálculo
 * @returns {Object} - {domain: [min, max], ticks: [val1, val2, val3, val4, val5]}
 */
export const calculateYAxisConfig = (
  dataValues,
  metaValues = [],
  includeMetas = false
) => {
  // Caso sem dados
  if (!dataValues || dataValues.length === 0) {
    return { domain: [0, 100], ticks: [0, 25, 50, 75, 100] };
  }

  // Filtrar valores válidos (remover null, undefined, 0)
  const validDataValues = dataValues.filter((val) => val != null && val > 0);

  if (validDataValues.length === 0) {
    return { domain: [0, 100], ticks: [0, 25, 50, 75, 100] };
  }

  let maxValue = Math.max(...validDataValues);
  let minValue = Math.min(...validDataValues);

  // Incluir metas no cálculo se solicitado
  if (includeMetas && metaValues && metaValues.length > 0) {
    const validMetaValues = metaValues.filter(
      (meta) => meta != null && meta > 0
    );

    if (validMetaValues.length > 0) {
      const maxMeta = Math.max(...validMetaValues);
      const minMeta = Math.min(...validMetaValues);
      maxValue = Math.max(maxValue, maxMeta);
      minValue = Math.min(minValue, minMeta);
    }
  }

  // Calcular a diferença entre max e min
  const range = maxValue - minValue;

  // Se todos os valores são iguais, criar um range artificial
  if (range === 0) {
    const buffer = maxValue * 0.2 || 100; // 20% do valor ou 100 se for 0
    minValue = Math.max(0, maxValue - buffer);
    maxValue = maxValue + buffer;
  } else {
    // Adicionar buffer: 15% abaixo do mínimo e 20% acima do máximo
    const bufferMin = range * 0.15;
    const bufferMax = range * 0.2;

    minValue = Math.max(0, minValue - bufferMin);
    maxValue = maxValue + bufferMax;
  }

  // Arredondar para valores limpos
  const min = Math.floor(minValue / 50) * 50; // Arredonda para múltiplos de 50
  const max = Math.ceil(maxValue / 50) * 50; // Arredonda para múltiplos de 50

  // Gerar exatamente 5 ticks distribuídos uniformemente
  const step = (max - min) / 4;
  const ticks = [
    min,
    Math.round((min + step) / 25) * 25, // Arredonda para múltiplos de 25
    Math.round((min + 2 * step) / 25) * 25,
    Math.round((min + 3 * step) / 25) * 25,
    max,
  ];

  // Garantir que os ticks são únicos e estão em ordem crescente
  const uniqueTicks = [...new Set(ticks)].sort((a, b) => a - b);

  // Se temos menos de 5 ticks únicos, ajustar
  while (uniqueTicks.length < 5) {
    let tickAdded = false;

    for (let i = 1; i < uniqueTicks.length && !tickAdded; i++) {
      const midPoint =
        Math.round((uniqueTicks[i - 1] + uniqueTicks[i]) / 2 / 25) * 25;
      if (midPoint > uniqueTicks[i - 1] && midPoint < uniqueTicks[i]) {
        uniqueTicks.splice(i, 0, midPoint);
        tickAdded = true;
      }
    }

    // Se não conseguiu adicionar nenhum tick, usar fallback
    if (!tickAdded || uniqueTicks.length >= 5) break;
  }

  // Fallback: se ainda não temos 5 ticks, usar distribuição linear simples
  if (uniqueTicks.length < 5) {
    const finalTicks = [];
    const finalStep = (max - min) / 4;
    for (let i = 0; i < 5; i++) {
      finalTicks.push(Math.round((min + i * finalStep) / 25) * 25);
    }
    return { domain: [min, max], ticks: finalTicks };
  }

  return {
    domain: [min, max],
    ticks: uniqueTicks.slice(0, 5), // Garantir apenas 5 ticks
  };
};

/**
 * Wrapper específico para TrainingChart
 * @param {Array} data - Array de objetos com propriedade 'volume'
 * @param {Object} metas - Objeto com as metas por tipo
 * @param {string} type - Tipo do treino (ex: "Peito", "Costas")
 * @param {boolean} showMetas - Se deve mostrar as metas
 * @returns {Object} - Configuração do eixo Y
 */
export const calculateTrainingChartYAxis = (data, metas, type, showMetas) => {
  const dataValues = data.map((item) => item.volume);
  const metaValues = showMetas && metas[type] ? [metas[type]] : [];

  return calculateYAxisConfig(dataValues, metaValues, showMetas);
};

/**
 * Wrapper específico para ComparisonChart
 * @param {Array} comparisonData - Array de objetos com 'volume' e 'meta'
 * @param {boolean} showMetas - Se deve mostrar as metas
 * @returns {Object} - Configuração do eixo Y
 */
export const calculateComparisonChartYAxis = (comparisonData, showMetas) => {
  const dataValues = comparisonData.map((item) => item.volume);
  const metaValues = showMetas ? comparisonData.map((item) => item.meta) : [];

  return calculateYAxisConfig(dataValues, metaValues, showMetas);
};

/**
 * Wrapper específico para SummaryChart
 * @param {Array} data - Array de objetos com dados de múltiplos tipos
 * @param {Array} trainingTypes - Array com os tipos de treino
 * @returns {Object} - Configuração do eixo Y
 */
export const calculateSummaryChartYAxis = (data, trainingTypes) => {
  const allValues = [];

  data.forEach((entry) => {
    trainingTypes.forEach((type) => {
      if (entry[type] && entry[type] > 0) {
        allValues.push(entry[type]);
      }
    });
  });

  return calculateYAxisConfig(allValues, [], false);
};
