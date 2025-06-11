import api from "./apiConfig";

const trainingService = {
  // Buscar todos os treinos do usuário logado
  getUserTrainings: async () => {
    try {
      const response = await api.get("exercise/trains/three_month");

      console.log("🔍 Raw response from backend:", response.data);

      const formattedTrains = [];

      response.data.forEach((train) => {
        const exercicios = [];

        train.exercises.forEach((exercise) => {
          console.log("🔍 Processing exercise from backend:", exercise);

          const exercicioFormatado = {
            exerciseId: exercise.exercise_id, // ✅ Mapeamento correto do backend
            series: exercise.repetitions,
            peso: exercise.load,
          };

          console.log("✅ Formatted exercise:", exercicioFormatado);
          exercicios.push(exercicioFormatado);
        });

        const treinoFormatado = {
          id: train.id,
          nome: train.muscular_group,
          data: train.train_date,
          exercicios: exercicios,
        };

        console.log("✅ Formatted train:", treinoFormatado);
        formattedTrains.push(treinoFormatado);
      });

      console.log("✅ Final formatted trains:", formattedTrains);
      return formattedTrains;
    } catch (error) {
      console.error("❌ Erro ao buscar treinos:", error);
      throw new Error(error?.message || "Erro ao buscar treinos do usuário");
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

    // Se já está no formato dd/mm/yyyy
    if (dateString.includes("/") && dateString.split("/").length === 3) {
      const parts = dateString.split("/");
      if (parts[2].length === 4) {
        return dateString;
      }
    }

    // Se estiver em formato dd-mm-yy (formato dos treinos)
    if (dateString.includes("-") && dateString.split("-").length === 3) {
      const parts = dateString.split("-");
      if (parts[2].length === 2) {
        const [day, month, year] = parts;
        const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
        return `${day}/${month}/${fullYear}`;
      }
    }

    // Se estiver em formato YYYY-MM-DD, converte para dd/mm/yyyy
    if (dateString.includes("-") && dateString.length === 10) {
      const [year, month, day] = dateString.split("-");
      return `${day}/${month}/${year}`;
    }

    // Se contém 'T' (formato ISO), pega apenas a parte da data
    if (dateString.includes("T")) {
      const datePart = dateString.split("T")[0];
      const [year, month, day] = datePart.split("-");
      return `${day}/${month}/${year}`;
    }

    // Fallback: tentar converter usando Date
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.warn(`Data inválida: ${dateString}`);
        return dateString;
      }

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.warn(`Erro ao formatar data: ${dateString}`, error);
      return dateString;
    }
  },

  // Comparar datas para ordenação cronológica (aceita ambos os formatos)
  compareDates: (dateStr1, dateStr2) => {
    const parseDate = (dateStr) => {
      // Formato YYYY-MM-DD
      if (dateStr.includes("-") && dateStr.length === 10) {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      }

      // Formato dd/mm/yyyy
      if (dateStr.includes("/")) {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day);
      }

      // Fallback
      return new Date(dateStr);
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

  // Função utilitária para debug
  debugTrainingData: async () => {
    try {
      const data = await trainingService.getUserTrainings();
      console.log("Dados de treino brutos:", data);
      return data;
    } catch (error) {
      console.error("Erro no debug:", error);
      return [];
    }
  },
};

export default trainingService;
