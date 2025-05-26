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

  groupTrainingsByName: (trainings) => {
    return trainings.reduce((grouped, training) => {
      // O nome do treino é o grupo muscular (Peito, Costas, etc.)
      const groupName = training.nome || training.grupoMuscular;

      if (!grouped[groupName]) {
        grouped[groupName] = [];
      }
      grouped[groupName].push(training);
      return grouped;
    }, {});
  },

  // Calcular volume total de um treino baseado nos exercícios
  // Estrutura: exercicios[{ nome, series, repeticoes, peso }]
  // Volume = series * repeticoes * peso
  calculateTotalVolume: (exercicios) => {
    if (!exercicios || !Array.isArray(exercicios)) return 0;

    return exercicios.reduce((total, exercicio) => {
      const series = parseInt(exercicio.series) || 0;
      const repeticoes = parseInt(exercicio.repeticoes) || 0;
      const peso = parseFloat(exercicio.peso) || 0;

      // Volume do exercício = series * repetições * peso
      const volumeExercicio = series * repeticoes * peso;
      return total + volumeExercicio;
    }, 0);
  },

  // ========== FUNÇÕES UTILITÁRIAS ==========

  // Formatar data para exibição nos gráficos (dd/mm/yyyy)
  formatDateForChart: (dateString) => {
    if (!dateString) return "";

    // Se já estiver no formato dd/mm/yyyy, retorna como está
    if (dateString.includes("/")) {
      return dateString;
    }

    // Se estiver em formato ISO (yyyy-mm-dd), converte
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

  // Comparar datas para ordenação cronológica
  compareDates: (dateStr1, dateStr2) => {
    const [day1, month1, year1] = dateStr1.split("/").map(Number);
    const [day2, month2, year2] = dateStr2.split("/").map(Number);

    const date1 = new Date(year1, month1 - 1, day1);
    const date2 = new Date(year2, month2 - 1, day2);

    return date1 - date2;
  },

  // Retornar estrutura vazia para os gráficos
  getEmptyChartData: () => ({
    Peito: [],
    Costas: [],
    Braço: [],
    Perna: [],
    Ombro: [],
  }),

  // Função principal para formatar dados para os componentes de gráfico existentes
  formatTrainingDataForCharts: (userTrainings) => {
    if (!Array.isArray(userTrainings)) {
      console.error("Dados de treino inválidos - esperado array");
      return trainingService.getEmptyChartData();
    }

    // Agrupar treinos por grupo muscular (nome do treino)
    const groupedByMuscle = trainingService.groupTrainingsByName(userTrainings);
    const formattedData = {};

    // Para cada grupo muscular, formatar os dados para o gráfico
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

  // Agrupar treinos pelo nome (que corresponde ao grupo muscular)

  // ========== FUNÇÃO PRINCIPAL PARA OS COMPONENTES ==========

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

  // Simula o vetor de treinos que estará dentro do usuário
  getMockUserTrainings: () => {
    return [
      // Treinos de Peito
      {
        id: 1,
        nome: "Peito",
        data: "10/01/25",
        volumeTotal: 2400,
        exercicios: [
          {
            nome: "Supino Reto",
            series: "4",
            repeticoes: "10",
            peso: "80",
          },
          {
            nome: "Supino Inclinado",
            series: "3",
            repeticoes: "12",
            peso: "70",
          },
          {
            nome: "Fly Peck Deck",
            series: "3",
            repeticoes: "15",
            peso: "50",
          },
        ],
      },
      {
        id: 2,
        nome: "Peito",
        data: "17/01/25",
        exercicios: [
          {
            nome: "Supino Reto",
            series: "4",
            repeticoes: "8",
            peso: "85",
          },
          {
            nome: "Supino Inclinado",
            series: "3",
            repeticoes: "10",
            peso: "75",
          },
        ],
        // volumeTotal será calculado automaticamente: (4*8*85) + (3*10*75) = 2720 + 2250 = 4970
      },
      {
        id: 3,
        nome: "Peito",
        data: "24/01/25",
        exercicios: [
          {
            nome: "Supino Reto",
            series: "4",
            repeticoes: "10",
            peso: "82",
          },
        ],
      },
      {
        id: 4,
        nome: "Peito",
        data: "31/01/25",
        volumeTotal: 2800,
      },
      {
        id: 5,
        nome: "Peito",
        data: "07/02/25",
        volumeTotal: 3000,
      },
      {
        id: 6,
        nome: "Peito",
        data: "14/02/25",
        volumeTotal: 3200,
      },

      // Treinos de Costas
      {
        id: 7,
        nome: "Costas",
        data: "11/01/25",
        exercicios: [
          {
            nome: "Puxada Frontal",
            series: "4",
            repeticoes: "12",
            peso: "60",
          },
          {
            nome: "Remada Curvada",
            series: "3",
            repeticoes: "10",
            peso: "70",
          },
        ],
        // Volume calculado: (4*12*60) + (3*10*70) = 2880 + 2100 = 4980
      },
      {
        id: 8,
        nome: "Costas",
        data: "18/01/25",
        volumeTotal: 2500,
      },
      {
        id: 9,
        nome: "Costas",
        data: "25/01/25",
        volumeTotal: 2700,
      },
      {
        id: 10,
        nome: "Costas",
        data: "01/02/25",
        volumeTotal: 2650,
      },
      {
        id: 11,
        nome: "Costas",
        data: "08/02/25",
        volumeTotal: 2900,
      },
      {
        id: 12,
        nome: "Costas",
        data: "15/02/25",
        volumeTotal: 3100,
      },

      // Treinos de Braço
      {
        id: 13,
        nome: "Braço",
        data: "12/01/25",
        exercicios: [
          {
            nome: "Rosca Direta",
            series: "3",
            repeticoes: "12",
            peso: "20",
          },
          {
            nome: "Tríceps Pulley",
            series: "3",
            repeticoes: "15",
            peso: "25",
          },
        ],
        // Volume: (3*12*20) + (3*15*25) = 720 + 1125 = 1845
      },
      {
        id: 14,
        nome: "Braço",
        data: "19/01/25",
        volumeTotal: 1500,
      },
      {
        id: 15,
        nome: "Braço",
        data: "26/01/25",
        volumeTotal: 1700,
      },
      {
        id: 16,
        nome: "Braço",
        data: "02/02/25",
        volumeTotal: 1650,
      },
      {
        id: 17,
        nome: "Braço",
        data: "09/02/25",
        volumeTotal: 1800,
      },
      {
        id: 18,
        nome: "Braço",
        data: "16/02/25",
        volumeTotal: 1900,
      },

      // Treinos de Perna
      {
        id: 19,
        nome: "Perna",
        data: "13/01/25",
        volumeTotal: 3200,
      },
      {
        id: 20,
        nome: "Perna",
        data: "20/01/25",
        volumeTotal: 3400,
      },
      {
        id: 21,
        nome: "Perna",
        data: "27/01/25",
        volumeTotal: 3600,
      },
      {
        id: 22,
        nome: "Perna",
        data: "10/02/25",
        volumeTotal: 3750,
      },
      {
        id: 23,
        nome: "Perna",
        data: "17/02/25",
        volumeTotal: 4000,
      },
      {
        id: 24,
        nome: "Perna",
        data: "24/02/25",
        volumeTotal: 3900,
      },

      // Treinos de Ombro
      {
        id: 25,
        nome: "Ombro",
        data: "14/01/25",
        volumeTotal: 1800,
      },
      {
        id: 26,
        nome: "Ombro",
        data: "21/01/25",
        volumeTotal: 1850,
      },
      {
        id: 27,
        nome: "Ombro",
        data: "28/01/25",
        volumeTotal: 1900,
      },
      {
        id: 28,
        nome: "Ombro",
        data: "04/02/25",
        volumeTotal: 2000,
      },
      {
        id: 29,
        nome: "Ombro",
        data: "11/02/25",
        volumeTotal: 1950,
      },
      {
        id: 30,
        nome: "Ombro",
        data: "18/02/25",
        volumeTotal: 2400,
      },
    ];
  },
};

export default trainingService;
