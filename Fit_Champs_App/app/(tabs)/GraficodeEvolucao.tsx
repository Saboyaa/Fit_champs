import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Image,
  Dimensions,
  RefreshControl
} from "react-native";
import { useGlobalContext } from "../../hooks/ContextoGlobal";
import trainingService from "../../services/trainingService";
import userService from "../../services/userService";

// Components
import Header from "../../components/ComponentsGraficoEvolucao/Header";
import ChartControls from "../../components/ComponentsGraficoEvolucao/ChartControls";
import { GroupChartView } from "../../components/ComponentsGraficoEvolucao/GroupChartView";
import ComparisonChart from "../../components/ComponentsGraficoEvolucao/ComparisonChart";
import SummaryChart from "../../components/ComponentsGraficoEvolucao/SummaryChart";

// Icons
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react-native";

// Images
const icons = {
  peito: require("../../images/peito.png"),
  perna: require("../../images/perna.png"),
  ombro: require("../../images/ombro.png"),
  costas: require("../../images/costas.png"),
  braco: require("../../images/musculo.png"),
};

const GraficosEvolucao = () => {
  const { isMenuOpen } = useGlobalContext();

  // States for data
  const [trainingData, setTrainingData] = useState({});
  const [metas, setMetas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // States for UI controls
  const [hoveredChart, setHoveredChart] = useState(null);
  const [viewMode, setViewMode] = useState("cards");
  const [visualizationType, setVisualizationType] = useState("line");
  const [showMetas, setShowMetas] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  // Function to load training data
  const loadTrainingData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get training data
      const formattedTrainingData = await trainingService.getFormattedTrainingData();
      setTrainingData(formattedTrainingData);

      // Get user goals
      try {
        const userGoals = await userService.getUserGoals();

        // Format goals to expected structure
        const formattedGoals = {
          Peito: userGoals.peito || userGoals.Peito || 3500,
          Costas: userGoals.costas || userGoals.Costas || 3400,
          Braço: userGoals.braco || userGoals.Braço || userGoals.braço || 2100,
          Perna: userGoals.perna || userGoals.Perna || 4500,
          Ombro: userGoals.ombro || userGoals.Ombro || 2300,
        };

        setMetas(formattedGoals);
      } catch (goalsError) {
        console.warn("Error fetching goals, using defaults:", goalsError);
        
        // Use default goals on error
        setMetas({
          Peito: 3500,
          Costas: 3400,
          Braço: 2100,
          Perna: 4500,
          Ombro: 2300,
        });
      }
    } catch (err) {
      setError(err.message);
      console.error("Error loading data:", err);

      // Empty data on error
      setTrainingData(trainingService.getEmptyChartData());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadTrainingData();
  }, []);

  // Check if there's training data to show
  const hasTrainingData =
    Object.keys(trainingData).length > 0 &&
    Object.values(trainingData).some(
      (data) => Array.isArray(data) && data.length > 0
    );

  // Get workout types that have data
  const trainingTypes = Object.keys(trainingData).filter(
    (type) =>
      trainingData[type] &&
      Array.isArray(trainingData[type]) &&
      trainingData[type].length > 0
  );

  // Stats calculations
  const stats = {
    totalWorkouts: Object.values(trainingData).reduce(
      (total, workouts) =>
        total + (Array.isArray(workouts) ? workouts.length : 0),
      0
    ),
    muscleGroups: trainingTypes.length,

    // Get all available months sorted
    availableMonths: Object.values(trainingData)
      .flat()
      .filter((workout) => workout && workout.data)
      .map((workout) => {
        const [day, month, year] = workout.data.split("/");
        return `${year}-${String(month).padStart(2, "0")}`;
      })
      .filter((month, index, array) => array.indexOf(month) === index)
      .sort()
      .reverse(),

    // Function to get workouts for selected month
    getWorkoutsForMonth: (monthIndex) => {
      const availableMonths = Object.values(trainingData)
        .flat()
        .filter((workout) => workout && workout.data)
        .map((workout) => {
          const [day, month, year] = workout.data.split("/");
          return `${year}-${String(month).padStart(2, "0")}`;
        })
        .filter((month, index, array) => array.indexOf(month) === index)
        .sort()
        .reverse();

      const selectedMonth = availableMonths[monthIndex];
      if (!selectedMonth) return 0;

      return Object.values(trainingData)
        .flat()
        .filter((workout) => {
          if (!workout || !workout.data) return false;
          const [day, month, year] = workout.data.split("/");
          const workoutMonth = `${year}-${String(month).padStart(2, "0")}`;
          return workoutMonth === selectedMonth;
        }).length;
    },
  };

  // Format month for display
  const formatMonthDisplay = (monthKey) => {
    if (!monthKey) return "N/A";
    const [year, month] = monthKey.split("-");
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  // Navigation functions
  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prev) =>
      prev < stats.availableMonths.length - 1 ? prev + 1 : prev
    );
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Refresh function
  const onRefresh = () => {
    setRefreshing(true);
    loadTrainingData();
  };

  // Loading component
  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#60a5fa" />
        <Text style={styles.loadingText}>Carregando dados de treino...</Text>
      </View>
    );
  }

  // Error component
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>⚠️ Erro ao carregar dados</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity
            onPress={loadTrainingData}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // No data component
  if (!hasTrainingData) {
    return (
      <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
          />
        }
      >
        <Header />
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataEmoji}>📊</Text>
          <Text style={styles.noDataTitle}>Nenhum treino encontrado</Text>
          <Text style={styles.noDataText}>
            Comece registrando seus treinos para visualizar sua evolução nos
            gráficos.
          </Text>
          <TouchableOpacity
            onPress={loadTrainingData}
            style={styles.refreshButton}
          >
            <Text style={styles.refreshButtonText}>Atualizar Dados</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
        />
      }
    >
      {/* Header */}
      <Header />

      {/* Summary statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Total de Treinos</Text>
          </View>

          {/* Monthly workouts section */}
          <View style={styles.statItem}>
            <View style={styles.monthNavContainer}>
              <TouchableOpacity
                onPress={handlePreviousMonth}
                disabled={currentMonthIndex >= stats.availableMonths.length - 1}
                style={[
                  styles.navButton,
                  currentMonthIndex >= stats.availableMonths.length - 1 && styles.disabledButton
                ]}
              >
                <ChevronLeft size={16} color="#fff" />
              </TouchableOpacity>

              <View style={styles.monthStat}>
                <Text style={styles.monthStatValue}>
                  {stats.getWorkoutsForMonth(currentMonthIndex)}
                </Text>
                <Text style={styles.monthStatLabel}>
                  Treinos mensais{"\n"}
                  {formatMonthDisplay(stats.availableMonths[currentMonthIndex])}
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleNextMonth}
                disabled={currentMonthIndex <= 0}
                style={[
                  styles.navButton,
                  currentMonthIndex <= 0 && styles.disabledButton
                ]}
              >
                <ChevronRight size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={loadTrainingData}
            style={styles.refreshIcon}
          >
            <RefreshCw size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Controls */}
      <ChartControls
        viewMode={viewMode}
        setViewMode={setViewMode}
        visualizationType={visualizationType}
        setVisualizationType={setVisualizationType}
        showMetas={showMetas}
        setShowMetas={setShowMetas}
      />

      {/* Views */}
      {viewMode === "cards" && (
        <GroupChartView
          trainingData={trainingData}
          trainingTypes={trainingTypes}
          hoveredChart={hoveredChart}
          setHoveredChart={setHoveredChart}
          visualizationType={visualizationType}
          showMetas={showMetas}
          metas={metas}
          icons={icons}
        />
      )}

      {viewMode === "comparison" && (
        <View style={styles.chartContainer}>
          <ComparisonChart
            trainingData={trainingData}
            visualizationType={visualizationType}
            showMetas={showMetas}
            metas={metas}
          />
        </View>
      )}

      {viewMode === "summary" && (
        <View style={styles.chartContainer}>
          <SummaryChart
            trainingData={trainingData}
            trainingTypes={trainingTypes}
            visualizationType={visualizationType}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  loadingText: {
    color: "#e2e8f0",
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  errorBox: {
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f87171",
    alignItems: "center",
    width: "80%",
  },
  errorTitle: {
    color: "#f87171",
    fontSize: 20,
    marginBottom: 16,
  },
  errorMessage: {
    color: "#e2e8f0",
    marginBottom: 24,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noDataContainer: {
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 24,
  },
  noDataEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  noDataTitle: {
    color: "#e2e8f0",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  noDataText: {
    color: "#94a3b8",
    marginBottom: 24,
    textAlign: "center",
  },
  refreshButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  statsContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  statsBox: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#60a5fa",
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: 12,
  },
  monthNavContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  navButton: {
    backgroundColor: "#334155",
    padding: 8,
    borderRadius: 24,
    marginHorizontal: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  monthStat: {
    alignItems: "center",
    minWidth: 120,
  },
  monthStatValue: {
    color: "#4ade80",
    fontSize: 24,
    fontWeight: "bold",
  },
  monthStatLabel: {
    color: "#94a3b8",
    fontSize: 10,
    textAlign: "center",
  },
  refreshIcon: {
    padding: 8,
  },
  chartContainer: {
    width: "95%",
    alignSelf: "center",
    marginBottom: 32,
  },
});

export default GraficosEvolucao;

