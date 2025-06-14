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
        error?.detail || "Erro ao buscar os exércicios disponíveis."
      );
    }
  },

  postTrains: async (trainData, exercisesPerTrainData) => {
    try {
      const trainList = [];

      trainData.forEach((train) => {
        if (train.descripition !== "Day Off") {
          const exercisesList = exercisesPerTrainData[train.id].filter(
            (ex) => ex.exerciseId !== 0
          );

          function convertDate(dateStr) {
            const [dd, mm, yy] = dateStr.split("-");
            return `20${yy}-${mm}-${dd}`;
          }

          trainList.push({
            muscular_group: train.descripition.slice(10),
            train_date: convertDate(train.data),
            exercises: exercisesList.map((ex) => ({
              exercise_id: ex.exerciseId,
              load: ex.peso,
              repetitions: ex.repeticoes.replaceAll(/\s/g, ""),
            })),
          });
        }
      });

      console.log({ trains: trainList });

      const response = await api.post("exercise/trains", {
        trains: trainList,
      });

      return response.data;
    } catch (error) {
      throw new Error(error?.detail || "Erro ao enviar os treinos.");
    }
  },
};

export default exerciseService;
