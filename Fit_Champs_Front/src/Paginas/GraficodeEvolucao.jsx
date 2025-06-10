import { useState, useEffect } from "react";
import { useGlobalContext } from "../Hooks/ContextoGlobal";
import trainingService from "../services/trainingService";
import userService from "../services/userService";

import Header from "../Components/ComponentsGraficoEvolucao/Header";
import ChartControls from "../Components/ComponentsGraficoEvolucao/ChartControls";
import GroupChartView from "../Components/ComponentsGraficoEvolucao/GroupChartview";
import ComparisonChart from "../Components/ComponentsGraficoEvolucao/ComparisonChart";
import SummaryChart from "../Components/ComponentsGraficoEvolucao/SummaryChart";

import peito from "../images/peito.png";
import perna from "../images/perna.png";
import ombro from "../images/ombro.png";
import costas from "../images/costas.png";
import braco from "../images/musculo.png";
import { LucideRefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";

const GraficosEvolucao = () => {
  const { isMenuOpen } = useGlobalContext();

  // Estados para dados
  const [trainingData, setTrainingData] = useState({});
  const [metas, setMetas] = useState({
    Peito: 3500,
    Costas: 3400,
    Braço: 2100,
    Perna: 4500,
    Ombro: 2300,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para controles da interface
  const [hoveredChart, setHoveredChart] = useState(null);
  const [viewMode, setViewMode] = useState("cards");
  const [visualizationType, setVisualizationType] = useState("line");
  const [showMetas, setShowMetas] = useState(false);

  // Ícones para os grupos musculares
  const icons = {
    peito,
    perna,
    ombro,
    costas,
    braco,
  };

  // Função para carregar dados de treinos
  const loadTrainingData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar dados de treinos
      const formattedTrainingData =
        await trainingService.getFormattedTrainingData();
      setTrainingData(formattedTrainingData);

      // Buscar metas do usuário
      try {
        const userGoals = await userService.getUserGoals();

        // Formatar metas para a estrutura esperada
        const formattedGoals = {
          Peito: userGoals.peito,
          Costas: userGoals.costas,
          Braço: userGoals.braco,
          Perna: userGoals.perna,
          Ombro: userGoals.ombro,
        };

        setMetas(formattedGoals);
      } catch (error) {
        console.error(error);
      }
    } catch (err) {
      setError(err);
      console.error(err);
      setTrainingData(trainingService.getEmptyChartData());
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados quando o componente é montado
  useEffect(() => {
    loadTrainingData();
  }, []);

  // Verificar se existem dados para mostrar
  const hasTrainingData =
    Object.keys(trainingData).length > 0 &&
    Object.values(trainingData).some(
      (data) => Array.isArray(data) && data.length > 0
    );

  // Obter tipos de treino que têm dados
  const trainingTypes = Object.keys(trainingData).filter(
    (type) =>
      trainingData[type] &&
      Array.isArray(trainingData[type]) &&
      trainingData[type].length > 0
  );

  // Adicione este estado no seu componente
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  // Modifique a função stats para incluir navegação por mês
  const stats = {
    totalWorkouts: Object.values(trainingData).reduce(
      (total, workouts) =>
        total + (Array.isArray(workouts) ? workouts.length : 0),
      0
    ),
    muscleGroups: trainingTypes.length,

    // Obter todos os meses disponíveis ordenados
    availableMonths: Object.values(trainingData)
      .flat()
      .filter((workout) => workout && workout.data)
      .map((workout) => {
        const [day, month, year] = workout.data.split("/");
        return `${year}-${String(month).padStart(2, "0")}`;
      })
      .filter((month, index, array) => array.indexOf(month) === index) // remover duplicatas
      .sort() // ordenar cronologicamente
      .reverse(), // mais recente primeiro

    // Função para obter treinos do mês selecionado
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

  // Função para formatar o mês para exibição
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

  // Funções para navegar
  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prev) =>
      prev < stats.availableMonths.length - 1 ? prev + 1 : prev
    );
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Função para recarregar dados
  const handleRefreshData = () => {
    loadTrainingData();
  };

  // Componente de loading
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">
            Carregando dados de treino...
          </p>
        </div>
      </div>
    );
  }

  // Componente de erro
  if (error) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900">
        <div className="text-center bg-slate-800/90 p-8 rounded-xl border border-red-500/30">
          <div className="text-red-400 text-xl mb-4">
            ⚠️ Erro ao carregar dados
          </div>
          <p className="text-slate-300 mb-6">{error}</p>
          <button
            onClick={handleRefreshData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // Componente para quando não há dados
  if (!hasTrainingData) {
    return (
      <div className="w-screen h-full flex justify-center bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 p-6">
        <div
          className={`rounded-md mt-6 transition-all duration-300 ${
            isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
          }`}
        >
          <Header />

          <div className="text-center bg-slate-800/90 p-12 rounded-xl border border-slate-700 w-[80%] mx-auto">
            <div className="text-slate-400 text-6xl mb-6">📊</div>
            <h2 className="text-2xl font-bold text-slate-200 mb-4">
              Nenhum treino encontrado
            </h2>
            <p className="text-slate-400 mb-6">
              Comece registrando seus treinos para visualizar sua evolução nos
              gráficos.
            </p>
            <button
              onClick={handleRefreshData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Atualizar Dados
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-full flex justify-center bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 p-6">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        {/* Cabeçalho */}
        <Header />

        {/* Estatísticas resumidas */}

        <div className="flex justify-center mb-6">
          <div className="bg-slate-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-700 flex space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {stats.totalWorkouts}
              </div>
              <div className="text-sm text-slate-400">Total de Treinos</div>
            </div>

            {/* Nova seção para treinos por mês */}
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousMonth}
                  disabled={
                    currentMonthIndex >= stats.availableMonths.length - 1
                  }
                  className="bg-slate-700 hover:bg-sky-700 p-2 rounded-full text-white shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="text-center min-w-[120px]">
                  <div className="text-2xl font-bold text-green-400">
                    {stats.getWorkoutsForMonth(currentMonthIndex)}
                  </div>
                  <div className="text-xs text-slate-400">
                    Treinos mensais
                    <br />
                    {formatMonthDisplay(
                      stats.availableMonths[currentMonthIndex]
                    )}{" "}
                  </div>
                </div>

                <button
                  onClick={handleNextMonth}
                  disabled={currentMonthIndex <= 0}
                  className="bg-slate-700 hover:bg-sky-700 p-2 rounded-full text-white shadow-lg transition-all duration-300 transform hover:scale-110"
                  aria-label="Semana anterior"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleRefreshData}
                className="text-slate-400 hover:text-blue-400 transition-colors"
                title="Atualizar dados"
              >
                <LucideRefreshCcw />
              </button>
            </div>
          </div>
        </div>

        {/* Controles */}
        <ChartControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          visualizationType={visualizationType}
          setVisualizationType={setVisualizationType}
          showMetas={showMetas}
          setShowMetas={setShowMetas}
        />

        {/* Visualizações */}
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
          <div className="w-[95%] md:w-[90%] mx-auto pb-8">
            <ComparisonChart
              trainingData={trainingData}
              visualizationType={visualizationType}
              showMetas={showMetas}
              metas={metas}
            />
          </div>
        )}

        {viewMode === "summary" && (
          <div className="w-[95%] md:w-[90%] mx-auto pb-8">
            <SummaryChart
              trainingData={trainingData}
              trainingTypes={trainingTypes}
              visualizationType={visualizationType}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GraficosEvolucao;
