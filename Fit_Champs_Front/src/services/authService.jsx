// Importar a configuração centralizada da API
import api from "./apiConfig";

const authService = {
  // Função de login
  login: async (username, password) => {
    try {
      // Preparar dados para envio ao backend
      const data = new URLSearchParams();
      data.append("grant_type", "password");
      data.append("username", username);
      data.append("password", password);
      data.append("scope", "");
      data.append("client_id", "string");
      data.append("client_secret", "string");
      const response = await api.post("auth/login", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data.access_token) {
        // Se o token for recebido, armazena no localStorage
        localStorage.setItem("authToken", response.data.access_token);
      }

      return response.data;
    } catch (error) {
      throw new Error(error?.detail || "Erro ao fazer login");
    }
  },

  register: async (userData) => {
    try {
      function extractDigits(phoneStr) {
        return phoneStr.replace(/\D/g, "");
      }
      // Preparar dados para envio ao backend
      const registrationData = {
        user: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          confirm_password: userData.confirm_password,
          phone: extractDigits(userData.phone),
          age: parseInt(userData.age),
          height: parseInt(userData.height),
          weight: parseInt(userData.weight),
          city: userData.city,
          sex: userData.sex === "masculino" ? "M" : "F",
        },
      };

      console.log(registrationData);
      const response = await api.post("auth/signup", registrationData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      // Tratar diferentes tipos de erro do backend
      if (error?.detail) {
        // Se o backend retornar erros de validação específicos
        const errors = error.detail;
        if (Array.isArray(errors)) {
          throw new Error(errors.join(", "));
        } else if (typeof errors === "object") {
          const errordetails = Object.values(errors).join(", ");
          throw new Error(errordetails);
        }
      }

      throw new Error(
        error?.detail || "Erro ao realizar cadastro. Tente novamente."
      );
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
