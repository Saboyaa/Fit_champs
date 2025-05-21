import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/"; //configuração do backend colocar dps a url do backend

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  // Adiciona o token de autenticação em todas as requisições
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authService = {
  //função de login
  login: async (username, password) => {
    try {
      const response = await api.post("login", { username, password });
      if (response.data.token) {
        // se o token for recebido, armazena no localStorage para ser usado nas requisições
        localStorage.setItem("authToken", response.data.token);

        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Erro ao fazer login");
    }
  },

  //função de logout
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  //ver se o usuario ta autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem("authToken");
    return !!localStorage.getItem("authToken");
  },
};
export default authService;
