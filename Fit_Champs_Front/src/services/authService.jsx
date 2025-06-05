// Importar a configuração centralizada da API
import api from "./apiConfig";

const authService = {
  // Função de login
  login: async (username, password) => {
    try {
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
      if (response.data.token) {
        // Se o token for recebido, armazena no localStorage
        localStorage.setItem("authToken", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
  },

  register: async (userData) => {
    try {
      // Preparar dados para envio ao backend
      const registrationData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        age: parseInt(userData.age),
        height: parseInt(userData.altura),
        weight: parseFloat(userData.weight),
        city: userData.cidade,
        gender: userData.sexo === "masculino" ? "M" : "F",
      };

      const response = await api.post("auth/register", registrationData);

      // Se o cadastro foi bem-sucedido e retornou um token, fazer login automático
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);

        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      }

      return response.data;
    } catch (error) {
      // Tratar diferentes tipos de erro do backend
      if (error.response?.data?.errors) {
        // Se o backend retornar erros de validação específicos
        const errors = error.response.data.errors;
        if (Array.isArray(errors)) {
          throw new Error(errors.join(", "));
        } else if (typeof errors === "object") {
          const errorMessages = Object.values(errors).join(", ");
          throw new Error(errorMessages);
        }
      }

      throw new Error(
        error.response?.data?.message ||
          "Erro ao realizar cadastro. Tente novamente."
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
