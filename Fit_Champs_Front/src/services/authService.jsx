// Importar a configuração centralizada da API
import api from "./apiConfig";

const authService = {
  // Função de login
  login: async (username, password) => {
    try {
      const response = await api.post("auth/login", { username, password });
      if (response.data.token) {
        // Se o token for recebido, armazena no localStorage
        localStorage.setItem("authToken", response.data.token);

        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
  },

  // Função de logout
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  // Ver se o usuário está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};

export default authService;
