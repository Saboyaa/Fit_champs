// src/services/apiConfig.tsx
import axios,
  {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosHeaders
  } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { CommonActions, NavigationContainerRef } from '@react-navigation/native';

export let navigationRef: NavigationContainerRef<any>;

// aponte pro seu backend
const API_URL = 'https://seu-backend.com/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { Accept: 'application/json' },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = await AsyncStorage.getItem('authToken');
    if (token && config.headers) {
      // Se for instância do AxiosHeaders, use o método .set()
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        // Caso seja um objeto plano (RawHeaders), faça o cast e mutação
        (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await AsyncStorage.multiRemove(['authToken', 'user']);
      Alert.alert('Sessão expirada', 'Faça login novamente.');
      if (navigationRef?.isReady()) {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          }),
        );
      }
    }
    return Promise.reject(error);
  },
);

export default api;



