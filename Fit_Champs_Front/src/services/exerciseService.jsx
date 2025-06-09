import api from "./apiConfig";

const exerciseService = {
  getExercisesList: async () => {
    try {
      const response = await api.get("exercise");

      const convertedData = {};

      for (const [muscleGroup, exercises] of Object.entries(response.data)) {
        const treinoKey =
          muscleGroup === "Day Off" ? "Day Off" : `Treino de ${muscleGroup}`;

        convertedData[treinoKey] = exercises
          .filter((ex) => ex.exercise_name)
          .map((ex) => ({
            id: ex.id,
            nome: ex.exercise_name,
            subgrupo: ex.submuscular_group,
          }));
      }

      return convertedData;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Erro ao buscar os exércicios disponíveis."
      );
    }
  },
};

export default exerciseService;
