import api from "./apiConfig";

const trainingService = {
  // Buscar todos os treinos do usuário logado
  getUserTrainings: async () => {
    try {
      const response = await api.get("exercise/trains/three_month");

      const formattedTrains = [];

      response.data.forEach((train) => {
        const exercicios = [];

        train.exercises.forEach((exercise) => {
          exercicios.push({
            series: exercise.repetitions,
            peso: exercise.load,
          });
        });

        formattedTrains.push({
          id: train.id,
          nome: train.muscular_group,
          data: train.train_date,
          exercicios: exercicios,
        });
      });

      return formattedTrains;
    } catch (error) {
      console.error(error);
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
      // Parse do formato "axb" para extrair séries e repetições
      const seriesRepeticoes = exercicio.series || "0x0";
      const [a, b] = seriesRepeticoes
        .split("x")
        .map((num) => parseInt(num.trim()) || 0);
      const y = parseInt(exercicio.peso) || 0;

      const volumeExercicio = a * b * y;

      return total + volumeExercicio;
    }, 0);
  },

  // Formatar data de YYYY-MM-DD para dd/mm/yyyy para exibição
  formatDateForChart: (dateString) => {
    if (!dateString) return "";

    if (dateString.includes("/")) {
      return dateString;
    }

    // Se estiver em formato YYYY-MM-DD, converte para dd/mm/yyyy
    if (dateString.includes("-") && dateString.length === 10) {
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    }

    if (dateString.includes("T")) {
      const datePart = dateString.split("T")[0];
      const [year, month, day] = datePart.split("-");
      return `${day}/${month}/${year}`;
    }

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

      // Fallback
      else {
        return new Date(dateStr);
      }
    };

    return parseDate(dateStr1) - parseDate(dateStr2);
  },

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
};

export default trainingService;
