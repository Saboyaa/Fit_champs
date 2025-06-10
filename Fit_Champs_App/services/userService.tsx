// src/services/userService.tsx

import { AxiosError, isAxiosError } from 'axios';
import api from './apiConfig';

/** Tipos das respostas do backend */
export interface RawUser {
  id?: number | string;
  username: string;
  phone: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  sex: 'M' | 'F';
  city: string;
  rank_chest: number;
  rank_back: number;
  rank_arm: number;
  rank_leg: number;
  rank_shoulder: number;
  goal_chest: number;
  goal_back: number;
  goal_arm: number;
  goal_leg: number;
  goal_shoulder: number;
}

/** Tipos para uso no app */
export interface Recordes {
  peito: number;
  costas: number;
  braço: number;
  perna: number;
  ombro: number;
}

export interface Metas {
  peito: number;
  costas: number;
  braço: number;
  perna: number;
  ombro: number;
}

export interface CurrentUser {
  nome: string;
  telefone: string;
  email: string;
  idade: number;
  altura: number;
  peso: number;
  sexo: 'Masculino' | 'Feminino';
  cidade: string;
  recordes: Recordes;
  metas: Metas;
}

export interface CurrentUserBasic {
  id?: number | string;
  nome: string;
  idade: number;
  sexo: 'Masculino' | 'Feminino';
}

export interface ProfileUpdateData {
  nome: string;
  email: string;
  cidade: string;
  idade: string | number;
  telefone: string;
  altura: string | number;
  peso: string | number;
}

export interface UpdateRecord {
  grupo: string;
  recordeVolume: number;
  metaVolume: number;
  data: string | null;
}

export interface IMCResult {
  value: number | null;
  classification: string;
}

const userService = {
  /** Formata telefone como (XX) XXXXX-XXXX */
  formatPhone(value: string): string {
    let digits = value.replace(/\D/g, '');
    if (digits.length > 0) digits = '(' + digits;
    if (digits.length > 3) digits = digits.slice(0, 3) + ') ' + digits.slice(3);
    if (digits.length > 10)
      digits = digits.slice(0, 10) + '-' + digits.slice(10);
    return digits.slice(0, 15);
  },

  /** Pega dados completos do usuário */
  getCurrentUser: async (): Promise<CurrentUser> => {
    try {
      const { data } = await api.get<RawUser>('user');
      return {
        nome:     data.username,
        telefone: userService.formatPhone(data.phone),
        email:    data.email,
        idade:    data.age,
        altura:   data.height,
        peso:     data.weight,
        sexo:     data.sex === 'M' ? 'Masculino' : 'Feminino',
        cidade:   data.city,
        recordes: {
          peito:  data.rank_chest,
          costas: data.rank_back,
          braço:  data.rank_arm,
          perna:  data.rank_leg,
          ombro:  data.rank_shoulder,
        },
        metas: {
          peito:  data.goal_chest,
          costas: data.goal_back,
          braço:  data.goal_arm,
          perna:  data.goal_leg,
          ombro:  data.goal_shoulder,
        },
      };
    } catch (error: unknown) {
      let msg = 'Erro ao buscar dados do usuário';
      if (isAxiosError(error)) msg = error.message;
      else if (error instanceof Error) msg = error.message;
      throw new Error(msg);
    }
  },

  /** Pega dados básicos para Ranking Semanal */
  getCurrentUser2: async (): Promise<CurrentUserBasic> => {
    try {
      const { data } = await api.get<RawUser>('user');
      return {
        id:    data.id,
        nome:  data.username,
        idade: data.age,
        sexo:  data.sex === 'M' ? 'Masculino' : 'Feminino',
      };
    } catch (error: unknown) {
      let msg = 'Erro ao buscar dados do usuário';
      if (isAxiosError(error)) msg = error.message;
      else if (error instanceof Error) msg = error.message;
      throw new Error(msg);
    }
  },

  /** Atualiza perfil do usuário */
  updateProfile: async (
    userData: ProfileUpdateData
  ): Promise<RawUser> => {
    try {
      const extractDigits = (s: string) => s.replace(/\D/g, '');
      const payload = {
        user_data: {
          username: userData.nome,
          email:    userData.email,
          city:     userData.cidade,
          age:      Number(userData.idade),
          phone:    extractDigits(String(userData.telefone)),
          height:   Number(userData.altura),
          weight:   Number(userData.peso),
        },
      };
      const { data } = await api.patch<RawUser>('user', payload);
      return data;
    } catch (error: unknown) {
      let msg = 'Erro ao atualizar perfil';
      if (isAxiosError(error)) msg = error.message;
      else if (error instanceof Error) msg = error.message;
      throw new Error(msg);
    }
  },

  /** Atualiza meta de volume por grupo muscular */
  updateVolumeGoal: async (
    muscleGroup: keyof Metas,
    newGoal: string | number
  ): Promise<any> => {
    try {
      const mapKey: Record<keyof Metas, string> = {
        peito:  'chest',
        costas: 'back',
        braço:  'arm',
        perna:  'leg',
        ombro:  'shoulder',
      };
      const payload = {
        user_goal: { goal: Number(newGoal) },
      };
      const url = `user/${mapKey[muscleGroup]}_goal`;
      const { data } = await api.patch(url, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      return data;
    } catch (error: unknown) {
      let msg = 'Erro ao atualizar meta de volume';
      if (isAxiosError(error)) msg = error.message;
      else if (error instanceof Error) msg = error.message;
      throw new Error(msg);
    }
  },

  /** Calcula recordes a partir do histórico */
  calculateRecordsFromHistory: (
    history: { grupoMuscular: string; volumeTotal: number; data: string }[],
    metas: Record<string, number>
  ): UpdateRecord[] => {
    const groups = ['Peito', 'Costas', 'Perna', 'Ombro', 'Braço'];
    return groups.map(grupo => {
      const entries = history.filter(h => h.grupoMuscular === grupo);
      if (entries.length === 0) {
        return { grupo, recordeVolume: 0, metaVolume: metas[grupo.toLowerCase()] || 0, data: null };
      }
      const best = entries.reduce((m, c) =>
        c.volumeTotal > m.volumeTotal ? c : m
      );
      return {
        grupo,
        recordeVolume: best.volumeTotal,
        metaVolume: metas[grupo.toLowerCase()] || 0,
        data: best.data,
      };
    });
  },

  /** Calcula IMC */
  calculateIMC: (
    altura: number,
    peso: number
  ): IMCResult => {
    if (!altura || !peso) return { value: null, classification: '' };
    const h = altura / 100;
    const val = Number((peso / (h * h)).toFixed(2));
    let cls = '';
    if (val < 18.5)           cls = 'Abaixo do peso';
    else if (val < 25)        cls = 'Peso normal';
    else if (val < 30)        cls = 'Sobrepeso';
    else if (val < 35)        cls = 'Obesidade grau I';
    else if (val < 40)        cls = 'Obesidade grau II';
    else                       cls = 'Obesidade grau III';
    return { value: val, classification: cls };
  },

  /** Pega metas do usuário */
  getUserGoals: async (): Promise<Metas> => {
    try {
      const { data } = await api.get<RawUser>('user');
      return {
        peito:  data.goal_chest,
        costas: data.goal_back,
        braço:  data.goal_arm,
        perna:  data.goal_leg,
        ombro:  data.goal_shoulder,
      };
    } catch (error: unknown) {
      let msg = 'Erro ao buscar metas do usuário';
      if (isAxiosError(error)) msg = error.message;
      else if (error instanceof Error) msg = error.message;
      throw new Error(msg);
    }
  },
};

export default userService;

