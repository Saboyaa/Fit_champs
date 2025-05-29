export const exerciseService = {
  async getExercisesByWorkout(workoutId) {
    try {
      return await api.get(`/exercises/workout/${workoutId}`);
    } catch (error) {
      console.error("Erro ao buscar exercícios do treino:", error);
      throw error;
    }
  },
  async deleteExercise(exerciseId) {
    try {
      return await api.delete(`/exercises/${exerciseId}`);
    } catch (error) {
      console.error("Erro ao deletar exercício:", error);
      throw error;
    }
  },
  async saveWorkoutWithExercises(workoutData) {
    try {
      return await api.post("/workouts/complete", workoutData);
    } catch (error) {
      console.error("Erro ao salvar treino completo:", error);
      throw error;
    }
  },
};
