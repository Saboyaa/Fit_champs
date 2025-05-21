// Importar a configuração centralizada da API
import api from "./apiConfig";

const userService = {
  // Função para atualizar perfil do usuário
  updateProfile: async (userData) => {
    try {
      const response = await api.put("users/profile", userData);

      // Atualizar dados do usuário no localStorage se necessário
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar perfil"
      );
    }
  },

  updateVolumeGoal: async (muscleGroup, newGoal) => {
    try {
      const response = await api.put("users/volume-goals", {
        muscleGroup,
        goal: newGoal,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar meta de volume"
      );
    }
  },

  // Função para calcular IMC
  calculateIMC: (altura, peso) => {
    if (!altura || !peso) return { value: null, classification: "" };

    const heightInMeters = altura / 100;
    const imcValue = (peso / (heightInMeters * heightInMeters)).toFixed(2);
    let classification = "";

    if (imcValue < 18.5) {
      classification = "Abaixo do peso";
    } else if (imcValue >= 18.5 && imcValue < 25) {
      classification = "Peso normal";
    } else if (imcValue >= 25 && imcValue < 30) {
      classification = "Sobrepeso";
    } else if (imcValue >= 30 && imcValue < 35) {
      classification = "Obesidade grau I";
    } else if (imcValue >= 35 && imcValue < 40) {
      classification = "Obesidade grau II";
    } else {
      classification = "Obesidade grau III";
    }

    return { value: parseFloat(imcValue), classification };
  },
};

export default userService;
