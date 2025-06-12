// src/services/exerciseService.tsx

import { AxiosError, isAxiosError } from 'axios';
import api from './apiConfig';

/** Tipos da lista de exercícios do backend */
export interface RawExercise {
  id: number | string;
  exercise_name: string;
  submuscular_group: string;
}
export interface RawExercisesResponse {
  [muscleGroup: string]: RawExercise[];
}
/** Formato convertido para uso no app */
export type ConvertedExercises = Record<
  string,
  { id: number | string; nome: string; subgrupo: string }[]
>;

/** Tipos para envio de treinos */
export interface RawTrainData {
  id: number | string;
  descripition: string;
  data: string; // dd-mm-yy
}
export interface RawExercisePerTrain {
  exerciseId: number;
  peso: number | string;
  repeticoes: string; // e.g. "3x12"
}
/** Payload final para o backend */
interface TrainPayload {
  muscular_group: string;
  train_date: string;         // YYYY-MM-DD
  exercises: {
    exercise_id: number;
    load: number | string;
    repetitions: string;
  }[];
}

const exerciseService = {
  /**
   * Busca os exercícios agrupados por grupo muscular e converte as chaves
   * para "Treino de X" (ou "Day Off").
   */
  getExercisesList: async (): Promise<ConvertedExercises> => {
    try {
      const { data } = await api.get<RawExercisesResponse>('exercise');
      const converted: ConvertedExercises = {};

      for (const [muscleGroup, exercises] of Object.entries(data)) {
        const key =
          muscleGroup === 'Day Off'
            ? 'Day Off'
            : `Treino de ${muscleGroup}`;

        converted[key] = exercises
          .filter(ex => !!ex.exercise_name)
          .map(ex => ({
            id: ex.id,
            nome: ex.exercise_name,
            subgrupo: ex.submuscular_group,
          }));
      }

      return converted;
    } catch (error: unknown) {
      let msg = 'Erro ao buscar os exercícios disponíveis.';
      if (isAxiosError(error)) msg = error.message;
      else if (error instanceof Error) msg = error.message;
      throw new Error(msg);
    }
  },

  /**
   * Recebe um array de dias de treino e um mapeamento de exercícios por dia,
   * normaliza as datas e envia para o backend.
   */
  postTrains: async (
    trainData: RawTrainData[],
    exercisesPerTrainData: Record<string, RawExercisePerTrain[]>
  ): Promise<any> => {
    try {
      const trains: TrainPayload[] = [];

      // helper para converter "dd-mm-yy" em "20yy-mm-dd"
      const convertDate = (d: string): string => {
        const [dd, mm, yy] = d.split('-');
        return `20${yy}-${mm}-${dd}`;
      };

      for (const day of trainData) {
        if (day.descripition !== 'Day Off') {
          const rawList = exercisesPerTrainData[String(day.id)] || [];
          const filtered = rawList.filter(ex => ex.exerciseId !== 0);

          const payload: TrainPayload = {
            muscular_group: day.descripition.slice(10),
            train_date:     convertDate(day.data),
            exercises:      filtered.map(ex => ({
              exercise_id:  ex.exerciseId,
              load:         ex.peso,
              repetitions:  ex.repeticoes.replace(/\s/g, ''),
            })),
          };
          trains.push(payload);
        }
      }

      const response = await api.post('exercise/trains', { trains: trains });
      return response.data;
    } catch (error: unknown) {
      let msg = 'Erro ao enviar os treinos.';
      if (isAxiosError(error)) msg = error.message;
      else if (error instanceof Error) msg = error.message;
      throw new Error(msg);
    }
  },
};

export default exerciseService;
