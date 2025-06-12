// Importar a configuração centralizada da API
import api from "./apiConfig";

const userService = {
  // Função para pegar dados do usuário
  getCurrentUser: async () => {
    const formattedPhoneFunction = (value) => {
      let formattedPhone = value.replace(/\D/g, "");
      if (formattedPhone.length > 0) {
        formattedPhone = "(" + formattedPhone;
        if (formattedPhone.length > 3) {
          formattedPhone =
            formattedPhone.substring(0, 3) + ") " + formattedPhone.substring(3);
        }
        if (formattedPhone.length > 10) {
          formattedPhone =
            formattedPhone.substring(0, 10) +
            "-" +
            formattedPhone.substring(10);
        }
        if (formattedPhone.length > 15) {
          formattedPhone = formattedPhone.substring(0, 15);
        }
      }

      return formattedPhone;
    };

    try {
      const response = await api.get("user");
      return {
        nome: response.data.username,
        telefone: formattedPhoneFunction(response.data.phone),
        email: response.data.email,
        idade: response.data.age,
        altura: response.data.height,
        peso: response.data.weight,
        sexo: response.data.sex == "M" ? "Masculino" : "Feminino",
        cidade: response.data.city,
        recordes: {
          Peito: response.data.rank_chest,
          Costas: response.data.rank_back,
          Braço: response.data.rank_arm,
          Perna: response.data.rank_leg,
          Ombro: response.data.rank_shoulder,
        },
        metas: {
          peito: response.data.goal_chest,
          costas: response.data.goal_back,
          braço: response.data.goal_arm,
          perna: response.data.goal_leg,
          ombro: response.data.goal_shoulder,
        },
      };
    } catch (error) {
      throw new Error(error?.detail || "Erro ao buscar dados do usuário");
    }
  },

  // Função para pegar os dados do usuário na tela de Ranking Semanal
  getCurrentUser2: async () => {
    try {
      const response = await api.get("user");
      return {
        id: response.data.id,
        nome: response.data.username,
        idade: response.data.age,
        sexo: response.data.sex == "M" ? "Masculino" : "Feminino",
        recordes: {
          Peito: response.data.rank_chest,
          Perna: response.data.rank_leg,
          Ombro: response.data.rank_shoulder,
          Costas: response.data.rank_back,
          Braço: response.data.rank_arm,
          Geral: response.data.rank_general,
        },
      };
    } catch (error) {
      throw new Error(error?.detail || "Erro ao buscar dados do usuário");
    }
  },

  // Função para atualizar perfil do usuário
  updateProfile: async (userData) => {
    try {
      function extractDigits(phoneStr) {
        return phoneStr.replace(/\D/g, "");
      }

      const newUserData = {
        user_data: {
          username: userData.nome,
          email: userData.email,
          city: userData.cidade,
          age: parseInt(userData.idade),
          phone: extractDigits(userData.telefone),
          height: parseInt(userData.altura),
          weight: parseInt(userData.peso),
        },
      };
      const response = await api.patch("user", newUserData);

      return response.data;
    } catch (error) {
      throw new Error(error?.detail || "Erro ao atualizar perfil");
    }
  },

  updateVolumeGoal: async (muscleGroup, newGoal) => {
    try {
      const muscleGroupMap = {
        Peito: "chest",
        Costas: "back",
        Braço: "arm",
        Perna: "leg",
        Ombro: "shoulder",
      };

      const newGoalData = {
        user_goal: {
          goal: parseInt(newGoal),
        },
      };

      const url = `user/${muscleGroupMap[muscleGroup]}_goal`;
      const response = await api.patch(url, newGoalData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error?.detail || "Erro ao atualizar meta de volume");
    }
  },

  // Função para calcular recordes a partir do histórico
  calculateRecordsFromHistory: (treinos, metas) => {
    const grupos = ["Peito", "Costas", "Perna", "Ombro", "Braço"];

    return grupos.map((grupo) => {
      const treinosDoGrupo = treinos[grupo] || [];

      if (treinosDoGrupo.length === 0) {
        return {
          grupo,
          recordeVolume: 0,
          metaVolume: metas[grupo.toLowerCase()] || 0,
          data: null,
        };
      }

      // Encontrar o treino com maior volume
      const melhorTreino = treinosDoGrupo.reduce((max, atual) =>
        atual.volume > max.volume ? atual : max
      );

      return {
        grupo,
        recordeVolume: melhorTreino.volume,
        metaVolume: metas[grupo.toLowerCase()] || 0,
        data: melhorTreino.data,
      };
    });
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

  getUserGoals: async () => {
    try {
      const response = await api.get("user");
      return {
        peito: response.data.goal_chest,
        costas: response.data.goal_back,
        braço: response.data.goal_arm,
        perna: response.data.goal_leg,
        ombro: response.data.goal_shoulder,
      };
    } catch (error) {
      throw new Error(error?.detail || "Erro ao buscar metas do usuário");
    }
  },
};

export default userService;
