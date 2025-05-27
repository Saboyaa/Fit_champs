// src/services/trainingService.jsx
import api from "./apiConfig";

const trainingService = {
  // Buscar todos os treinos do usuário logado
  getUserTrainings: async () => {
    try {
      const response = await api.get("users/trainings");
      return response.data;
    } catch (error) {
      console.warn("Backend não disponível, usando dados mock");
      return trainingService.getMockUserTrainings();
    }
  },

  // Agrupar treinos por nome (grupo muscular)
  groupTrainingsByName: (trainings) => {
    return trainings.reduce((grouped, training) => {
      const groupName = training.nome || training.grupoMuscular;
      if (!grouped[groupName]) {
        grouped[groupName] = [];
      }
      grouped[groupName].push(training);
      return grouped;
    }, {});
  },

  // Calcular volume total de um treino baseado nos exercícios
  calculateTotalVolume: (exercicios) => {
    if (!exercicios || !Array.isArray(exercicios)) return 0;

    return exercicios.reduce((total, exercicio) => {
      const series = parseInt(exercicio.series) || 0;
      const repeticoes = parseInt(exercicio.repeticoes) || 0;
      const peso = parseFloat(exercicio.peso) || 0;
      return total + series * repeticoes * peso;
    }, 0);
  },

  // ========== FUNÇÕES DE MANIPULAÇÃO DE DATAS ==========

  // Formatar data de YYYY-MM-DD para dd/mm/yyyy para exibição
  formatDateForChart: (dateString) => {
    if (!dateString) return "";

    // Se já estiver no formato dd/mm/yyyy, retorna como está
    if (dateString.includes("/")) {
      return dateString;
    }

    // Se estiver em formato YYYY-MM-DD, converte para dd/mm/yyyy
    if (dateString.includes("-") && dateString.length === 10) {
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    }

    // Se estiver em formato ISO completo, extrai apenas a data
    if (dateString.includes("T")) {
      const datePart = dateString.split("T")[0];
      const [year, month, day] = datePart.split("-");
      return `${day}/${month}/${year}`;
    }

    // Fallback para outros formatos
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn(`Data inválida: ${dateString}`);
      return dateString;
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },

  // Comparar datas para ordenação cronológica (aceita ambos os formatos)
  compareDates: (dateStr1, dateStr2) => {
    const parseDate = (dateStr) => {
      // Formato YYYY-MM-DD
      if (dateStr.includes("-")) {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      }
      // Formato dd/mm/yyyy
      else if (dateStr.includes("/")) {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day);
      }
      // Fallback
      else {
        return new Date(dateStr);
      }
    };

    return parseDate(dateStr1) - parseDate(dateStr2);
  },

  // ========== FUNÇÕES PRINCIPAIS ==========

  // Retornar estrutura vazia para os gráficos
  getEmptyChartData: () => ({
    Peito: [],
    Costas: [],
    Braço: [],
    Perna: [],
    Ombro: [],
  }),

  // Função principal para formatar dados para os componentes de gráfico
  formatTrainingDataForCharts: (userTrainings) => {
    if (!Array.isArray(userTrainings)) {
      console.error("Dados de treino inválidos - esperado array");
      return trainingService.getEmptyChartData();
    }

    const groupedByMuscle = trainingService.groupTrainingsByName(userTrainings);
    const formattedData = {};

    Object.keys(groupedByMuscle).forEach((muscleGroup) => {
      formattedData[muscleGroup] = groupedByMuscle[muscleGroup]
        .map((training) => ({
          data: trainingService.formatDateForChart(training.data),
          volume:
            training.volumeTotal ||
            trainingService.calculateTotalVolume(training.exercicios),
        }))
        .sort((a, b) => trainingService.compareDates(a.data, b.data));
    });

    return formattedData;
  },

  // Função que os componentes de gráfico vão usar
  getFormattedTrainingData: async () => {
    try {
      const userTrainings = await trainingService.getUserTrainings();
      return trainingService.formatTrainingDataForCharts(userTrainings);
    } catch (error) {
      console.error("Erro ao buscar dados de treino:", error);
      return trainingService.getEmptyChartData();
    }
  },

  // ========== DADOS MOCK ==========
  getMockUserTrainings: () => {
    return [
      // Treinos de Peito
      {
        id: 1,
        nome: "Peito",
        data: "2025-01-10",
        volumeTotal: 2400,
        exercicios: [
          { nome: "Supino Reto", series: "4", repeticoes: "10", peso: "80" },
          {
            nome: "Supino Inclinado",
            series: "3",
            repeticoes: "12",
            peso: "70",
          },
          { nome: "Fly Peck Deck", series: "3", repeticoes: "15", peso: "50" },
        ],
      },
      {
        id: 2,
        nome: "Peito",
        data: "2025-01-17",
        exercicios: [
          { nome: "Supino Reto", series: "4", repeticoes: "8", peso: "85" },
          {
            nome: "Supino Inclinado",
            series: "3",
            repeticoes: "10",
            peso: "75",
          },
        ],
      },
      {
        id: 3,
        nome: "Peito",
        data: "2025-01-24",
        exercicios: [
          { nome: "Supino Reto", series: "4", repeticoes: "10", peso: "82" },
        ],
      },
      { id: 4, nome: "Peito", data: "2025-01-31", volumeTotal: 2800 },
      { id: 5, nome: "Peito", data: "2025-02-07", volumeTotal: 3000 },
      { id: 6, nome: "Peito", data: "2025-02-14", volumeTotal: 3200 },

      // Treinos de Costas
      {
        id: 7,
        nome: "Costas",
        data: "2025-01-11",
        exercicios: [
          { nome: "Puxada Frontal", series: "4", repeticoes: "12", peso: "60" },
          { nome: "Remada Curvada", series: "3", repeticoes: "10", peso: "70" },
        ],
      },
      { id: 8, nome: "Costas", data: "2025-01-18", volumeTotal: 2500 },
      { id: 9, nome: "Costas", data: "2025-01-25", volumeTotal: 2700 },
      { id: 10, nome: "Costas", data: "2025-02-01", volumeTotal: 2650 },
      { id: 11, nome: "Costas", data: "2025-02-08", volumeTotal: 2900 },
      { id: 12, nome: "Costas", data: "2025-02-15", volumeTotal: 3100 },

      // Treinos de Braço
      {
        id: 13,
        nome: "Braço",
        data: "2025-01-12",
        exercicios: [
          { nome: "Rosca Direta", series: "3", repeticoes: "12", peso: "20" },
          { nome: "Tríceps Pulley", series: "3", repeticoes: "15", peso: "25" },
        ],
      },
      { id: 14, nome: "Braço", data: "2025-01-19", volumeTotal: 1500 },
      { id: 15, nome: "Braço", data: "2025-01-26", volumeTotal: 1700 },
      { id: 16, nome: "Braço", data: "2025-02-02", volumeTotal: 1650 },
      { id: 17, nome: "Braço", data: "2025-02-09", volumeTotal: 1800 },
      { id: 18, nome: "Braço", data: "2025-02-16", volumeTotal: 1900 },

      // Treinos de Perna
      { id: 19, nome: "Perna", data: "2025-01-13", volumeTotal: 3200 },
      { id: 20, nome: "Perna", data: "2025-01-20", volumeTotal: 3400 },
      { id: 21, nome: "Perna", data: "2025-01-27", volumeTotal: 3600 },
      { id: 22, nome: "Perna", data: "2025-02-10", volumeTotal: 3750 },
      { id: 23, nome: "Perna", data: "2025-02-17", volumeTotal: 4000 },
      { id: 24, nome: "Perna", data: "2025-02-24", volumeTotal: 3900 },

      // Treinos de Ombro
      { id: 25, nome: "Ombro", data: "2025-01-14", volumeTotal: 1800 },
      { id: 26, nome: "Ombro", data: "2025-01-21", volumeTotal: 1850 },
      { id: 27, nome: "Ombro", data: "2025-01-28", volumeTotal: 1900 },
      { id: 28, nome: "Ombro", data: "2025-02-04", volumeTotal: 2000 },
      { id: 29, nome: "Ombro", data: "2025-02-11", volumeTotal: 1950 },
      { id: 30, nome: "Ombro", data: "2025-02-18", volumeTotal: 2400 },

      // Treinos de março
      { id: 31, nome: "Peito", data: "2025-03-03", volumeTotal: 3300 },
      { id: 32, nome: "Costas", data: "2025-03-04", volumeTotal: 3200 },
      { id: 33, nome: "Braço", data: "2025-03-05", volumeTotal: 2000 },
      { id: 34, nome: "Perna", data: "2025-03-06", volumeTotal: 4100 },
      { id: 35, nome: "Ombro", data: "2025-03-07", volumeTotal: 2500 },
    ];
  },
};

export default trainingService;
