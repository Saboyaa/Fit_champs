import api from "./apiConfig";

const rankService = {
  generalRank: async (sex, ageRange) => {
    try {
      const gender = sex == "Masculino" ? "M" : "F";
      const age = parseInt(ageRange);
      const response = await api.get(`rank/general/${gender}/${age}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const formattedList = [];
      response.data.forEach((user) => {
        formattedList.push({
          id: user.id,
          nome: user.username,
          idade: user.age,
          pontos: user.total_volume,
          sexo: user.sex == "M" ? "Masculino" : "Feminino",
        });
      });

      return formattedList;
    } catch (error) {
      throw new Error(error?.detail || "Erro ao buscar o ranque geral");
    }
  },

  armRank: async (sex, ageRange) => {
    try {
      const gender = sex == "Masculino" ? "M" : "F";
      const age = parseInt(ageRange);
      const response = await api.get(`rank/arm/${gender}/${age}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const formattedList = [];
      response.data.forEach((user) => {
        formattedList.push({
          id: user.id,
          nome: user.username,
          idade: user.age,
          pontos: user.total_volume,
          sexo: user.sex == "M" ? "Masculino" : "Feminino",
        });
      });

      return formattedList;
    } catch (error) {
      throw new Error(error?.detail || "Erro ao buscar o ranque de braço");
    }
  },

  backRank: async (sex, ageRange) => {
    try {
      const gender = sex == "Masculino" ? "M" : "F";
      const age = parseInt(ageRange);
      const response = await api.get(`rank/back/${gender}/${age}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const formattedList = [];
      response.data.forEach((user) => {
        formattedList.push({
          id: user.id,
          nome: user.username,
          idade: user.age,
          pontos: user.total_volume,
          sexo: user.sex == "M" ? "Masculino" : "Feminino",
        });
      });

      return formattedList;
    } catch (error) {
      throw new Error(error?.detail || "Erro ao buscar o ranque de costas");
    }
  },

  chestRank: async (sex, ageRange) => {
    try {
      const gender = sex == "Masculino" ? "M" : "F";
      const age = parseInt(ageRange);
      const response = await api.get(`rank/chest/${gender}/${age}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const formattedList = [];
      response.data.forEach((user) => {
        formattedList.push({
          id: user.id,
          nome: user.username,
          idade: user.age,
          pontos: user.total_volume,
          sexo: user.sex == "M" ? "Masculino" : "Feminino",
        });
      });

      return formattedList;
    } catch (error) {
      throw new Error(error?.detail || "Erro ao buscar o ranque de peito");
    }
  },

  legRank: async (sex, ageRange) => {
    try {
      const gender = sex == "Masculino" ? "M" : "F";
      const age = parseInt(ageRange);
      const response = await api.get(`rank/leg/${gender}/${age}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const formattedList = [];
      response.data.forEach((user) => {
        formattedList.push({
          id: user.id,
          nome: user.username,
          idade: user.age,
          pontos: user.total_volume,
          sexo: user.sex == "M" ? "Masculino" : "Feminino",
        });
      });

      return formattedList;
    } catch (error) {
      throw new Error(error?.detail || "Erro ao buscar o ranque de perna");
    }
  },

  shoulderRank: async (sex, ageRange) => {
    try {
      const gender = sex == "Masculino" ? "M" : "F";
      const age = parseInt(ageRange);
      const response = await api.get(`rank/shoulder/${gender}/${age}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const formattedList = [];
      response.data.forEach((user) => {
        formattedList.push({
          id: user.id,
          nome: user.username,
          idade: user.age,
          pontos: user.total_volume,
          sexo: user.sex == "M" ? "Masculino" : "Feminino",
        });
      });

      return formattedList;
    } catch (error) {
      throw new Error(error?.detail || "Erro ao buscar o ranque de ombro");
    }
  },

  totalVolume: async () => {
    try {
      const response = await api.get("rank/total_volume", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return {
        Geral: response.data.general_total_volume,
        Peito: response.data.chest_total_volume,
        Costas: response.data.back_total_volume,
        Braço: response.data.arm_total_volume,
        Perna: response.data.leg_total_volume,
        Ombro: response.data.shoulder_total_volume,
      };
    } catch (error) {
      throw new Error(error?.detail || "Erro ao buscar os pontos dos usuários");
    }
  },
};

export default rankService;
