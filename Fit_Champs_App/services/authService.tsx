// src/services/authService.tsx

import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './apiConfig';

export interface LoginResponse {
  access_token: string;
  // …outros campos que seu backend retorne no login
  [key: string]: any;
}

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;   // em formato “(XX) XXXXX-XXXX”
  age: string;     // string pra facilitar o parsing
  height: string;  // idem
  weight: string;  // idem
  city: string;
  sex: 'masculino' | 'feminino';
}

const authService = {
  /**
   * Faz login e armazena o token em AsyncStorage
   */
  login: async (
    username: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      // monta o body x-www-form-urlencoded
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('username', username);
      params.append('password', password);
      params.append('scope', '');
      params.append('client_id', 'string');
      params.append('client_secret', 'string');

      const response = await api.post<LoginResponse>(
        'auth/login',
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const token = response.data.access_token;
      if (token) {
        await AsyncStorage.setItem('authToken', token);
        // se quiser guardar o user também:
        // await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error: unknown) {
      let message = 'Erro ao fazer login';
      if (axios.isAxiosError(error)) {
        // customizar de acordo com seu backend
        message = error.response?.data?.error_description || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  },

  /**
   * Cadastro de novo usuário
   */
  register: async (
    userData: RegisterUserData
  ): Promise<any> => {
    try {
      // extrai só dígitos do telefone
      const extractDigits = (s: string) => s.replace(/\D/g, '');

      const payload = {
        user: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          confirm_password: userData.confirm_password,
          phone: extractDigits(userData.phone),
          age: Number(userData.age),
          height: Number(userData.height),
          weight: Number(userData.weight),
          city: userData.city,
          sex: userData.sex === 'masculino' ? 'M' : 'F',
        },
      };

      const response = await api.post(
        'auth/signup',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      return response.data;
    } catch (error: unknown) {
      // tratamento de erros do backend
      let message = 'Erro ao realizar cadastro. Tente novamente.';
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (data) {
          if (Array.isArray(data)) {
            message = data.join(', ');
          } else if (typeof data === 'object') {
            message = Object.values(data).flat().join(', ');
          } else {
            message = String(data);
          }
        } else {
          message = error.message;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  },

  /**
   * Remove credenciais
   */
  logout: async (): Promise<void> => {
    await AsyncStorage.multiRemove(['authToken', 'user']);
  },

  /**
   * Verifica se já existe token armazenado
   */
  isAuthenticated: async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem('authToken');
    return !!token;
  },
};

export default authService;