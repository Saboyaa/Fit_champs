import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import trainingService, { ChartData as ServiceChartData, DataPoint } from '../../services/trainingService';
import userService, { Metas } from '../../services/userService';

const screenWidth = Dimensions.get('window').width;

// Tipos internos para gráficos
interface ChartPoint {
  x: string;
  y: number;
}

interface MuscleGroupData {
  name: string;
  icon: string;
  data: ChartPoint[];
  lastDate: string;
  improvement: number;
  color: string;
}

// Mapeamentos fixos de cores e ícones
const colorMap: Record<string, string> = {
  Peito: '#4F46E5',
  Costas: '#059669',
  Braço: '#7C3AED',
  Perna: '#DC2626',
  Ombro: '#EA580C',
};
const iconMap: Record<string, string> = {
  Peito: '💪',
  Costas: '🏋️',
  Braço: '💪',
  Perna: '🦵',
  Ombro: '🏋️‍♂️',
};

// Estilo básico do gráfico
const chartConfig = {
  backgroundColor: '#1F2937',
  backgroundGradientFrom: '#1F2937',
  backgroundGradientTo: '#1F2937',
  decimalPlaces: 0,
  color: (opacity: number = 1) => `rgba(156, 163, 175, ${opacity})`,
  labelColor: (opacity: number = 1) => `rgba(156, 163, 175, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: '4', strokeWidth: '2' },
  propsForBackgroundLines: { strokeDasharray: '', stroke: '#374151', strokeWidth: 1 },
};

const TrainingStatsScreen: React.FC = () => {
  // Estado de dados e metas
  const [trainingData, setTrainingData] = useState<ServiceChartData>({});
  const [metas, setMetas] = useState<Metas>({
    peito: 0,
    costas: 0,
    braço: 0,
    perna: 0,
    ombro: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carrega dados de treino e metas
  const loadData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    
    try {
      const td = await trainingService.getFormattedTrainingData();
      setTrainingData(td);
      
      try {
        const goals = await userService.getUserGoals();
        setMetas(goals);
      } catch (e) {
        console.warn('Falha ao buscar metas', e);
      }
    } catch (e: any) {
      setError(e.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Carrega dados na primeira vez e quando a tela fica em foco
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  // Função para pull-to-refresh
  const onRefresh = () => {
    loadData(true);
  };

  // Processa ServiceChartData em estrutura para componentes
  const muscleGroups = useMemo<MuscleGroupData[]>(() =>
    Object.entries(trainingData).map(([name, points]) => {
      // points: DataPoint[] ordered
      const pts: DataPoint[] = points;
      const chart: ChartPoint[] = pts.map(p => ({ x: p.data.slice(0,5), y: p.volume }));
      const len = chart.length;
      const last = chart[len - 1]?.y ?? 0;
      const prev = chart[len - 2]?.y ?? last;
      const improvement = prev > 0 ? parseFloat(((last - prev) / prev * 100).toFixed(1)) : 0;
      const lastDate = chart[len - 1]?.x ?? '';
      return {
        name,
        icon: iconMap[name] || '💪',
        data: chart,
        lastDate,
        improvement,
        color: colorMap[name] || '#4F46E5',
      };
    })
  , [trainingData]);

  // Prepara dados para o LineChart
  const prepareChartData = (mg: MuscleGroupData) => ({
    labels: mg.data.map(pt => pt.x),
    datasets: [{ data: mg.data.map(pt => pt.y), color: () => mg.color, strokeWidth: 3 }],
  });

  if (loading) return (
    <SafeAreaView style={styles.centered}><Text style={styles.statusText}>Carregando...</Text></SafeAreaView>
  );
  if (error) return (
    <SafeAreaView style={styles.centered}><Text style={styles.statusText}>Erro: {error}</Text></SafeAreaView>
  );
  if (muscleGroups.length === 0) return (
    <SafeAreaView style={styles.centered}><Text style={styles.statusText}>Sem dados de treino</Text></SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Evolução de Treinos</Text>
        <Text style={styles.headerSubtitle}>Volume por grupo muscular</Text>
      </View>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4F46E5']} // Android
            tintColor="#4F46E5" // iOS
          />
        }
      >
        {muscleGroups.map(mg => (
          <View key={mg.name} style={styles.chartCard}>
            <View style={styles.cardHeader}>
              <Text style={[styles.chartIcon, { color: mg.color }]}>{mg.icon}</Text>
              <Text style={styles.chartName}>{mg.name}</Text>
              <Text style={styles.chartDate}>Último: {mg.lastDate}</Text>
            </View>
            <LineChart
              data={prepareChartData(mg)}
              width={screenWidth - 48}
              height={180}
              chartConfig={{ ...chartConfig, color: () => mg.color }}
              style={styles.chart}
              fromZero
              bezier
            />
            <View style={styles.cardFooter}>
              <Text style={[styles.statusText, { color: mg.color }]}>↗ {mg.improvement}%</Text>
              <Text style={styles.statusText}>Meta: {metas[nameKey(mg.name)]?.toLocaleString()}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Converte nome para chave de Metas
const nameKey = (name: string): keyof Metas => {
  switch (name.toLowerCase()) {
    case 'peito': return 'peito';
    case 'costas': return 'costas';
    case 'braço':
    case 'braco': return 'braço';
    case 'perna': return 'perna';
    case 'ombro': return 'ombro';
    default: return 'peito';
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827', paddingTop: 20},
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  statusText: { color: '#F9FAFB', fontSize: 16 },
  header: { backgroundColor: '#1F2937', padding: 16 },
  headerTitle: { color: '#F9FAFB', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#9CA3AF', fontSize: 14 },
  scrollContent: { padding: 16 },
  chartCard: { backgroundColor: '#1F2937', borderRadius: 12, marginBottom: 16, padding: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  chartIcon: { fontSize: 24, marginRight: 8 },
  chartName: { color: '#F9FAFB', fontSize: 18, flex: 1 },
  chartDate: { color: '#9CA3AF', fontSize: 12 },
  chart: { borderRadius: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
});

export default TrainingStatsScreen;
