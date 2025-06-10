// Importar a configuração centralizada da API
import api from "./apiConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface para dados do usuário
interface User {
  id: string;
  nome: string;
  email: string;
  foto?: string;
  altura?: number;
  peso?: number;
  // Adicione outros campos conforme necessário
}

interface UserDisplay {
  nome: string;
  foto?: string;
}

interface VolumeGoal {
  muscleGroup: string;
  goal: number;
}

interface UserRecord {
  grupo: string;
  recordeVolume: number;
  metaVolume: number;
  data: string | null;
}

interface IMCResult {
  value: number | null;
  classification: string;
}

interface UserGoals {
  peito?: number;
  costas?: number;
  perna?: number;
  ombro?: number;
  braco?: number;
  [key: string]: number | undefined; // Index signature
}

const userService = {
  // Função para pegar dados do usuário
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get("users/profile");
      return response.data as User;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Erro ao buscar dados do usuário"
      );
    }
  },

  // Função para o TopMenu pegar dados do usuário
  async getUserDisplay(): Promise<UserDisplay> {
    try {
      const response = await api.get("users/profile");
      return {
        nome: response.data.nome,
        foto: response.data.foto,
      };
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Erro ao buscar dados de exibição do usuário"
      );
    }
  },

  // Função para atualizar perfil do usuário
  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await api.put("users/profile", userData);

      // Atualizar dados do usuário no AsyncStorage se necessário
      if (response.data.user) {
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data as User;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar perfil"
      );
    }
  },

  async updateVolumeGoal(muscleGroup: string, newGoal: number): Promise<VolumeGoal> {
    try {
      const response = await api.put("users/volume-goals", {
        muscleGroup,
        goal: newGoal,
      });
      return response.data as VolumeGoal;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar meta de volume"
      );
    }
  },

  // Função para calcular recordes a partir do histórico
  calculateRecordsFromHistory(treinos: Array<{grupoMuscular: string; volumeTotal: number; data: string}>, metas: UserGoals): UserRecord[] {
    const grupos = ["Peito", "Costas", "Perna", "Ombro", "Braço"] as const;

    return grupos.map((grupo) => {
      // Filtrar treinos deste grupo muscular
      const treinosDoGrupo = treinos.filter((t) => t.grupoMuscular === grupo);

      if (treinosDoGrupo.length === 0) {
        return {
          grupo,
          recordeVolume: 0,
          metaVolume: metas[grupo.toLowerCase() as keyof UserGoals] || 0,
          data: null,
        };
      }

      // Encontrar o treino com maior volume
      const melhorTreino = treinosDoGrupo.reduce((max, atual) =>
        atual.volumeTotal > max.volumeTotal ? atual : max
      );

      return {
        grupo,
        recordeVolume: melhorTreino.volumeTotal,
        metaVolume: metas[grupo.toLowerCase() as keyof UserGoals] || 0,
        data: melhorTreino.data,
      };
    });
  },

  // Função para calcular IMC
  calculateIMC(altura: number | undefined, peso: number | undefined): IMCResult {
    if (!altura || !peso) return { value: null, classification: "" };

    const heightInMeters = altura / 100;
    const imcValue = parseFloat((peso / (heightInMeters * heightInMeters)).toFixed(2));
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

    return { value: imcValue, classification };
  },

  async getUserGoals(): Promise<UserGoals> {
    try {
      const response = await api.get("users/goals");
      return response.data as UserGoals;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Erro ao buscar metas do usuário"
      );
    }
  },
};

export default userService;
