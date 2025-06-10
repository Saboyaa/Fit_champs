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
      throw new Error(error?.message || "Erro ao buscar o ranque geral");
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
      throw new Error(error?.message || "Erro ao buscar o ranque de braço");
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
      throw new Error(error?.message || "Erro ao buscar o ranque de costas");
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
      throw new Error(error?.message || "Erro ao buscar o ranque de peito");
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
      throw new Error(error?.message || "Erro ao buscar o ranque de perna");
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
      throw new Error(error?.message || "Erro ao buscar o ranque de ombro");
    }
  },
};

export default rankService;
