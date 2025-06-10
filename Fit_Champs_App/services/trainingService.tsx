// src/services/trainingService.tsx

import { AxiosError } from 'axios';
import api from './apiConfig';

/** Tipos vindos do backend */
export interface RawExercise {
  repetitions: string;
  load: number | string;
}
export interface RawTrain {
  id: number | string;
  muscular_group: string;
  train_date: string;
  exercises: RawExercise[];
  volumeTotal?: number;
}

/** Tipos internos do serviço */
export interface FormattedExercise {
  series: string;
  peso: string;
}
export interface Training {
  id: number | string;
  nome: string;
  data: string;
  exercicios: FormattedExercise[];
  volumeTotal?: number;
}
export interface DataPoint {
  data: string;
  volume: number;
}
export type ChartData = Record<string, DataPoint[]>;

const trainingService = {
  /** Busca e formata os treinos do usuário */
  getUserTrainings: async (): Promise<Training[]> => {
    try {
      const response = await api.get<RawTrain[]>('exercise/trains/three_month');
      return response.data.map(train => ({
        id:          train.id,
        nome:        train.muscular_group,
        data:        train.train_date,
        exercicios:  train.exercises.map(ex => ({
          series: String(ex.repetitions),
          peso:   String(ex.load),
        })),
        volumeTotal: train.volumeTotal,
      }));
    } catch (error: unknown) {
      console.error('Erro ao buscar treinos do usuário:', error);
      return [];
    }
  },

  /** Agrupa array de Training por nome (grupo muscular) */
  groupTrainingsByName: (
    trainings: Training[]
  ): Record<string, Training[]> => {
    return trainings.reduce((acc, tr) => {
      const key = tr.nome;
      if (!acc[key]) acc[key] = [];
      acc[key].push(tr);
      return acc;
    }, {} as Record<string, Training[]>);
  },

  /** Calcula volume total de uma lista de exercícios */
  calculateTotalVolume: (exercicios?: FormattedExercise[]): number => {
    if (!exercicios) return 0;
    return exercicios.reduce((sum, ex) => {
      const [a, b] = (ex.series || '0x0')
        .split('x')
        .map(s => parseInt(s.trim(), 10) || 0);
      const peso = parseInt(ex.peso, 10) || 0;
      return sum + a * b * peso;
    }, 0);
  },

  /** Converte YYYY-MM-DD ou ISO para dd/mm/yyyy */
  formatDateForChart: (dt?: string): string => {
    if (!dt) return '';
    if (dt.includes('/')) return dt;
    let part = dt.includes('T') ? dt.split('T')[0] : dt;
    if (part.includes('-') && part.length === 10) {
      const [y, m, d] = part.split('-');
      return `${d}/${m}/${y}`;
    }
    const date = new Date(dt);
    if (isNaN(date.getTime())) {
      console.warn(`Data inválida: ${dt}`);
      return dt;
    }
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  },

  /** Compara duas datas para ordenação */
  compareDates: (d1: string, d2: string): number => {
    const toDate = (s: string): Date => {
      if (s.includes('-')) {
        // desestruturação em vez de spread
        const [yearStr, monthStr, dayStr] = s.split('-');
        const year  = Number(yearStr);
        const month = Number(monthStr) - 1; // JS: 0-based
        const day   = Number(dayStr);
        return new Date(year, month, day);
      }
      return new Date(s);
    };
    return toDate(d1).getTime() - toDate(d2).getTime();
  },

  /** Estrutura inicial vazia para gráficos */
  getEmptyChartData: (): ChartData => ({
    Peito: [],
    Costas: [],
    Braço: [],
    Perna: [],
    Ombro: [],
  }),

  /** Monta os dados prontos para os componentes de gráfico */
  formatTrainingDataForCharts: (trains: Training[]): ChartData => {
    if (!Array.isArray(trains)) {
      console.error('Dados de treino inválidos – esperado array');
      return trainingService.getEmptyChartData();
    }
    const grouped = trainingService.groupTrainingsByName(trains);
    const result: ChartData = {};
    Object.entries(grouped).forEach(([muscle, list]) => {
      result[muscle] = list
        .map(t => ({
          data:   trainingService.formatDateForChart(t.data),
          volume:
            t.volumeTotal ??
            trainingService.calculateTotalVolume(t.exercicios),
        }))
        .sort((a, b) => trainingService.compareDates(a.data, b.data));
    });
    return result;
  },

  /** Pega e formata tudo em um passo só */
  getFormattedTrainingData: async (): Promise<ChartData> => {
    try {
      const ts = await trainingService.getUserTrainings();
      return trainingService.formatTrainingDataForCharts(ts);
    } catch (error: unknown) {
      console.error('Erro ao buscar dados de treino:', error);
      return trainingService.getEmptyChartData();
    }
  },


      //ignore isso aq 
//   getMockUserTrainings: () => {
//     return [
//       // Treinos de Peito
//       {
//         id: 1,
//         nome: "Peito",
//         data: "2025-01-10",
//         volumeTotal: 2400,
//         exercicios: [
//           { nome: "Supino Reto", series: "4x10", peso: 80 },
//           { nome: "Supino Inclinado", series: "3x12", peso: 70 },
//           { nome: "Fly Peck Deck", series: "3x15", peso: 50 },
//         ],
//       },
//       {
//         id: 2,
//         nome: "Peito",
//         data: "2025-01-17",
//         exercicios: [
//           { nome: "Supino Reto", series: "4x8", peso: 85 },
//           { nome: "Supino Inclinado", series: "3x10", peso: 75 },
//         ],
//       },
//       {
//         id: 3,
//         nome: "Peito",
//         data: "2025-01-24",
//         exercicios: [{ nome: "Supino Reto", series: "4x10", peso: 82 }],
//       },
//       { id: 4, nome: "Peito", data: "2025-01-31", volumeTotal: 2800 },
//       { id: 5, nome: "Peito", data: "2025-02-07", volumeTotal: 3000 },
//       { id: 6, nome: "Peito", data: "2025-02-14", volumeTotal: 3200 },

//       // Treinos de Costas
//       {
//         id: 7,
//         nome: "Costas",
//         data: "2025-01-11",
//         exercicios: [
//           { nome: "Puxada Frontal", series: "4x12", peso: 60 },
//           { nome: "Remada Curvada", series: "3x10", peso: 70 },
//         ],
//       },
//       { id: 8, nome: "Costas", data: "2025-01-18", volumeTotal: 2500 },
//       { id: 9, nome: "Costas", data: "2025-01-25", volumeTotal: 2700 },
//       { id: 10, nome: "Costas", data: "2025-02-01", volumeTotal: 2650 },
//       { id: 11, nome: "Costas", data: "2025-02-08", volumeTotal: 2900 },
//       { id: 12, nome: "Costas", data: "2025-02-15", volumeTotal: 3100 },

//       // Treinos de Braço
//       {
//         id: 13,
//         nome: "Braço",
//         data: "2025-01-12",
//         exercicios: [
//           { nome: "Rosca Direta", series: "3x12", peso: 20 },
//           { nome: "Tríceps Pulley", series: "3x15", peso: 25 },
//         ],
//       },
//       { id: 14, nome: "Braço", data: "2025-01-19", volumeTotal: 1500 },
//       { id: 15, nome: "Braço", data: "2025-01-26", volumeTotal: 1700 },
//       { id: 16, nome: "Braço", data: "2025-02-02", volumeTotal: 1650 },
//       { id: 17, nome: "Braço", data: "2025-02-09", volumeTotal: 1800 },
//       { id: 18, nome: "Braço", data: "2025-02-16", volumeTotal: 1900 },

//       // Treinos de Perna
//       { id: 19, nome: "Perna", data: "2025-01-13", volumeTotal: 3200 },
//       { id: 20, nome: "Perna", data: "2025-01-20", volumeTotal: 3400 },
//       { id: 21, nome: "Perna", data: "2025-01-27", volumeTotal: 3600 },
//       { id: 22, nome: "Perna", data: "2025-02-10", volumeTotal: 3750 },
//       { id: 23, nome: "Perna", data: "2025-02-17", volumeTotal: 4000 },
//       { id: 24, nome: "Perna", data: "2025-02-24", volumeTotal: 3900 },

//       // Treinos de Ombro
//       { id: 25, nome: "Ombro", data: "2025-01-14", volumeTotal: 1800 },
//       { id: 26, nome: "Ombro", data: "2025-01-21", volumeTotal: 1850 },
//       { id: 27, nome: "Ombro", data: "2025-01-28", volumeTotal: 1900 },
//       { id: 28, nome: "Ombro", data: "2025-02-04", volumeTotal: 2000 },
//       { id: 29, nome: "Ombro", data: "2025-02-11", volumeTotal: 1950 },
//       { id: 30, nome: "Ombro", data: "2025-02-18", volumeTotal: 2400 },

//       // Treinos de março
//       { id: 31, nome: "Peito", data: "2025-03-03", volumeTotal: 3300 },
//       { id: 32, nome: "Costas", data: "2025-03-04", volumeTotal: 3200 },
//       { id: 33, nome: "Braço", data: "2025-03-05", volumeTotal: 2000 },
//       { id: 34, nome: "Perna", data: "2025-03-06", volumeTotal: 4100 },
//       { id: 35, nome: "Ombro", data: "2025-03-07", volumeTotal: 2500 },
//     ];
//   },
};

export default trainingService;
