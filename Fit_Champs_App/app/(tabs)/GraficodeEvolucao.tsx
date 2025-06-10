import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface TrainingData {
  x: string;
  y: number;
  [key: string]: unknown;
}

interface MuscleGroupData {
  name: string;
  icon: string;
  data: TrainingData[];
  lastDate: string;
  improvement: number;
  color: string;
}

const TrainingStatsScreen: React.FC = () => {
  const muscleGroups: MuscleGroupData[] = [
    {
      name: 'Peito',
      icon: '💪',
      lastDate: '14/02/2025',
      improvement: 6.7,
      color: '#4F46E5',
      data: [
        { x: '10/01', y: 2400 },
        { x: '17/01', y: 2550 },
        { x: '24/01', y: 2650 },
        { x: '31/01', y: 2800 },
        { x: '07/02', y: 2950 },
        { x: '14/02', y: 3100 },
      ],
    },
    {
      name: 'Costas',
      icon: '🏋️',
      lastDate: '15/02/2025',
      improvement: 6.9,
      color: '#059669',
      data: [
        { x: '11/01', y: 2200 },
        { x: '18/01', y: 2400 },
        { x: '25/01', y: 2650 },
        { x: '01/02', y: 2550 },
        { x: '08/02', y: 2750 },
        { x: '15/02', y: 2900 },
      ],
    },
    {
      name: 'Pernas',
      icon: '🦵',
      lastDate: '13/02/2025',
      improvement: 8.2,
      color: '#DC2626',
      data: [
        { x: '09/01', y: 3500 },
        { x: '16/01', y: 3650 },
        { x: '23/01', y: 3800 },
        { x: '30/01', y: 3900 },
        { x: '06/02', y: 4100 },
        { x: '13/02', y: 4200 },
      ],
    },
    {
      name: 'Braços',
      icon: '💪',
      lastDate: '12/02/2025',
      improvement: 5.4,
      color: '#7C3AED',
      data: [
        { x: '08/01', y: 1800 },
        { x: '15/01', y: 1900 },
        { x: '22/01', y: 1950 },
        { x: '29/01', y: 2050 },
        { x: '05/02', y: 2100 },
        { x: '12/02', y: 2200 },
      ],
    },
    {
      name: 'Ombro',
      icon: '🏋️‍♂️',
      lastDate: '16/02/2025',
      improvement: 7.1,
      color: '#EA580C',
      data: [
        { x: '12/01', y: 1200 },
        { x: '19/01', y: 1300 },
        { x: '26/01', y: 1400 },
        { x: '02/02', y: 1450 },
        { x: '09/02', y: 1550 },
        { x: '16/02', y: 1650 },
      ],
    },
  ];

  const prepareChartData = (muscleGroup: MuscleGroupData) => {
    return {
      labels: muscleGroup.data.map(item => item.x),
      datasets: [
        {
          data: muscleGroup.data.map(item => item.y),
          color: (opacity = 1) => muscleGroup.color,
          strokeWidth: 3,
        },
      ],
    };
  };

  const chartConfig = {
    backgroundColor: '#1F2937',
    backgroundGradientFrom: '#1F2937',
    backgroundGradientTo: '#1F2937',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#374151',
      strokeWidth: 1,
    },
    fillShadowGradient: '',
    fillShadowGradientOpacity: 0,
  };

  const renderChart = (muscleGroup: MuscleGroupData) => {
    const chartData = prepareChartData(muscleGroup);
    
    return (
      <View key={muscleGroup.name} style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.chartIcon}>{muscleGroup.icon}</Text>
            <Text style={styles.chartTitle}>{muscleGroup.name}</Text>
          </View>
          <Text style={styles.lastDate}>Último: {muscleGroup.lastDate}</Text>
        </View>

        <View style={styles.chartWrapper}>
          <LineChart
            data={chartData}
            width={screenWidth - 72} // Adjusted for container padding
            height={200}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => muscleGroup.color,
            }}
            bezier
            style={styles.chart}
            withInnerLines={true}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={true}
            withDots={true}
            withShadow={false}
            fromZero={true}
            segments={4}
          />
        </View>

        <View style={styles.improvementContainer}>
          <View style={[styles.improvementBadge, { backgroundColor: `${muscleGroup.color}20` }]}>
            <Text style={[styles.improvementText, { color: muscleGroup.color }]}>
              ↗ Melhora de {muscleGroup.improvement}% em relação ao treino anterior, continue assim!
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Volume Atual</Text>
            <Text style={[styles.statValue, { color: muscleGroup.color }]}>
              {muscleGroup.data[muscleGroup.data.length - 1].y.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Progresso</Text>
            <Text style={[styles.statValue, { color: muscleGroup.color }]}>
              +{muscleGroup.improvement}%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Estatísticas de Treino</Text>
        <Text style={styles.headerSubtitle}>
          Acompanhe seu progresso e alcance seus objetivos!
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {muscleGroups.map(renderChart)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    color: '#F9FAFB',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  chartContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  chartTitle: {
    color: '#F9FAFB',
    fontSize: 20,
    fontWeight: '600',
  },
  lastDate: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  chartWrapper: {
    alignItems: 'center',
    marginVertical: 8,
    overflow: 'hidden',
    borderRadius: 16,
  },
  chart: {
    borderRadius: 16,
  },
  improvementContainer: {
    marginTop: 16,
    marginBottom: 12,
  },
  improvementBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  improvementText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TrainingStatsScreen;