import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
} from "recharts";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  MinusCircle,
  Calendar,
  BarChart2,
  Filter,
  Target,
  Award,
} from "lucide-react";
import { useGlobalContext } from "../Context/ContextoGlobal";
import peito from "../images/peito.png";
import perna from "../images/perna.png";
import ombro from "../images/ombro.png";
import costas from "../images/costas.png";
import braco from "../images/musculo.png";

const GraficoEvolucao = () => {
  const { isMenuOpen } = useGlobalContext();
  const [hoveredChart, setHoveredChart] = useState(null);
  const [viewMode, setViewMode] = useState("cards"); // cards, comparison, summary
  const [visualizationType, setVisualizationType] = useState("line"); // line, area, bar
  const [timeRange, setTimeRange] = useState("6m"); // 1m, 3m, 6m, 1y
  const [showMetas, setShowMetas] = useState(false);

  // Objetivos/metas para cada grupo muscular
  const metas = {
    Peito: 3500,
    Costas: 3400,
    Braço: 2100,
    Perna: 4500,
    Ombro: 2300,
  };

  const getIcon = (grupo) => {
    switch (grupo.toLowerCase()) {
      case "peito":
        return <img src={peito} alt="Peito" className="w-8 h-8" />;
      case "perna":
        return <img src={perna} alt="Perna" className="w-8 h-8" />;
      case "ombro":
        return <img src={ombro} alt="Ombro" className="w-8 h-8" />;
      case "costas":
        return <img src={costas} alt="Costas" className="w-8 h-8" />;
      case "braço":
        return <img src={braco} alt="Braço" className="w-8 h-8" />;
      default:
        return null;
    }
  };

  // Dados de exemplo para diferentes tipos de treino
  const [trainingData] = useState({
    Peito: [
      { data: "10/01/2025", volume: 2400 },
      { data: "17/01/2025", volume: 2600 },
      { data: "24/01/2025", volume: 2550 },
      { data: "31/01/2025", volume: 2800 },
      { data: "07/02/2025", volume: 3000 },
      { data: "14/02/2025", volume: 3200 },
    ],
    Costas: [
      { data: "11/01/2025", volume: 2200 },
      { data: "18/01/2025", volume: 2500 },
      { data: "25/01/2025", volume: 2700 },
      { data: "01/02/2025", volume: 2650 },
      { data: "08/02/2025", volume: 2900 },
      { data: "15/02/2025", volume: 3100 },
    ],
    Braço: [
      { data: "12/01/2025", volume: 1400 },
      { data: "19/01/2025", volume: 1500 },
      { data: "26/01/2025", volume: 1700 },
      { data: "02/02/2025", volume: 1650 },
      { data: "09/02/2025", volume: 1800 },
      { data: "16/02/2025", volume: 1900 },
    ],
    Perna: [
      { data: "13/01/2025", volume: 3200 },
      { data: "20/01/2025", volume: 3400 },
      { data: "27/01/2025", volume: 3600 },
      { data: "10/02/2025", volume: 3750 },
      { data: "17/02/2025", volume: 4000 },
      { data: "24/02/2025", volume: 3900 },
    ],
    Ombro: [
      { data: "14/01/2025", volume: 1800 },
      { data: "21/01/2025", volume: 1850 },
      { data: "28/01/2025", volume: 1900 },
      { data: "04/02/2025", volume: 2000 },
      { data: "11/02/2025", volume: 1950 },
      { data: "18/02/2025", volume: 2100 },
    ],
  });

  // Dados para gráfico de comparação
  const prepareComparisonData = () => {
    const result = [];
    // Usamos apenas o último registro de cada tipo de treino
    trainingTypes.forEach((type) => {
      const data = trainingData[type];
      if (data.length > 0) {
        const lastEntry = data[data.length - 1];
        result.push({
          nome: type,
          volume: lastEntry.volume,
          meta: metas[type],
        });
      }
    });
    return result;
  };

  // Dados para gráfico de progresso total
  const prepareSummaryData = () => {
    // Criamos um conjunto de todas as datas
    const allDates = new Set();
    Object.values(trainingData).forEach((data) => {
      data.forEach((entry) => allDates.add(entry.data));
    });

    // Ordenamos as datas
    const sortedDates = Array.from(allDates).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split("/").map(Number);
      const [dayB, monthB, yearB] = b.split("/").map(Number);
      return (
        new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
      );
    });

    // Criamos um array de objetos com a data e o volume total de todos os treinos naquela data
    return sortedDates.map((date) => {
      const entry = { data: date };

      trainingTypes.forEach((type) => {
        const matchingEntry = trainingData[type].find((e) => e.data === date);
        if (matchingEntry) {
          entry[type] = matchingEntry.volume;
        } else {
          entry[type] = 0;
        }
      });

      return entry;
    });
  };

  // Função para calcular a tendência (melhora ou piora)
  const calculateTrend = (data) => {
    if (data.length < 2) return { type: "mesmo", diff: 0 };

    const lastVolume = data[data.length - 1].volume;
    const previousVolume = data[data.length - 2].volume;
    const diff = ((lastVolume / previousVolume - 1) * 100).toFixed(1);

    if (diff > 0) return { type: "melhora", diff };
    if (diff < 0) return { type: "piora", diff: Math.abs(diff) };
    return { type: "mesmo", diff: 0 };
  };

  // Calcular o progresso em relação à meta
  const calculateProgress = (data, meta) => {
    if (data.length === 0) return 0;
    const lastVolume = data[data.length - 1].volume;
    return ((lastVolume / meta) * 100).toFixed(1);
  };

  // Componente para exibir a tendência
  const TrendIndicator = ({ trend }) => {
    if (trend.type === "melhora") {
      return (
        <div className="flex items-center text-green-600">
          <ArrowUpCircle className="mr-1" size={16} />
          <span>
            Melhora de {trend.diff}% em relação ao treino anterior, continue
            assim!
          </span>
        </div>
      );
    } else if (trend.type === "piora") {
      return (
        <div className="flex items-center text-red-600">
          <ArrowDownCircle className="mr-1" size={16} />
          <span>
            Queda de {trend.diff}% em relação ao treino anterior, não deixe a
            peteca cair!
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-600">
          <MinusCircle className="mr-1" size={16} />
          <span>Volume mantido</span>
        </div>
      );
    }
  };

  // Componente para exibir o progresso em relação à meta
  const ProgressIndicator = ({ type, data }) => {
    const meta = metas[type];
    const progress = calculateProgress(data, meta);
    const lastVolume = data.length > 0 ? data[data.length - 1].volume : 0;

    return (
      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progresso para meta: {progress}%</span>
          <span>
            {lastVolume} / {meta} kg
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              progress >= 100 ? "bg-green-500" : "bg-blue-600"
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        {progress >= 100 && (
          <div className="flex items-center justify-center mt-1 text-green-600">
            <Award size={14} className="mr-1" />
            <span className="text-xs">Meta alcançada!</span>
          </div>
        )}
      </div>
    );
  };

  // Renderizar o gráfico de acordo com o tipo selecionado
  const renderChart = (type, data, isLastItemOdd = false) => {
    const chartProps = {
      data: data,
      margin: { top: 5, right: 20, left: 20, bottom: 5 },
    };

    // Referência para a meta
    const metaData = showMetas
      ? [
          { data: data[0]?.data, volume: metas[type] },
          { data: data[data.length - 1]?.data, volume: metas[type] },
        ]
      : [];

    return (
      <div className={`h-64 ${isLastItemOdd ? "md:w-1/2 md:mx-auto" : ""}`}>
        <ResponsiveContainer width="100%" height="100%">
          {visualizationType === "line" && (
            <LineChart {...chartProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis
                label={{
                  value: "Volume (kg)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip formatter={(value) => [`${value} kg`, "Volume"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="volume"
                stroke={hoveredChart === type ? "#1E40AF" : "#3B82F6"}
                strokeWidth={hoveredChart === type ? 3 : 2}
                activeDot={{ r: 8 }}
                name={`Volume ${type}`}
              />
              {showMetas && (
                <Line
                  type="monotone"
                  data={metaData}
                  dataKey="volume"
                  stroke="#10B981"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="Meta"
                  dot={false}
                />
              )}
            </LineChart>
          )}

          {visualizationType === "area" && (
            <AreaChart {...chartProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis
                label={{
                  value: "Volume (kg)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip formatter={(value) => [`${value} kg`, "Volume"]} />
              <Legend />
              <Area
                type="monotone"
                dataKey="volume"
                stroke={hoveredChart === type ? "#1E40AF" : "#3B82F6"}
                fill={hoveredChart === type ? "#BFDBFE" : "#93C5FD"}
                name={`Volume ${type}`}
              />
              {showMetas && (
                <Line
                  type="monotone"
                  data={metaData}
                  dataKey="volume"
                  stroke="#10B981"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="Meta"
                  dot={false}
                />
              )}
            </AreaChart>
          )}

          {visualizationType === "bar" && (
            <ComposedChart {...chartProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis
                label={{
                  value: "Volume (kg)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip formatter={(value) => [`${value} kg`, "Volume"]} />
              <Legend />
              <Bar
                dataKey="volume"
                fill={hoveredChart === type ? "#1E40AF" : "#3B82F6"}
                name={`Volume ${type}`}
              />
              {showMetas && (
                <Line
                  type="monotone"
                  data={metaData}
                  dataKey="volume"
                  stroke="#10B981"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="Meta"
                  dot={false}
                />
              )}
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  // Renderizar o gráfico de comparação
  const renderComparisonChart = () => {
    const data = prepareComparisonData();

    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-xl font-semibold mb-4">
          Comparação entre Grupos Musculares
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis
                label={{
                  value: "Volume (kg)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip formatter={(value) => [`${value} kg`, "Volume"]} />
              <Legend />
              <Bar dataKey="volume" fill="#3B82F6" name="Volume Atual" />
              {showMetas && (
                <Line
                  type="monotone"
                  dataKey="meta"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Meta"
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // Renderizar o gráfico de progresso total
  const renderSummaryChart = () => {
    const data = prepareSummaryData();
    const colors = {
      Peito: "#3B82F6",
      Costas: "#10B981",
      Braço: "#F59E0B",
      Perna: "#8B5CF6",
      Ombro: "#EC4899",
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-xl font-semibold mb-4">Evolução Total do Treino</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {visualizationType === "line" || visualizationType === "area" ? (
              <ComposedChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis
                  label={{
                    value: "Volume (kg)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                {trainingTypes.map((type) =>
                  visualizationType === "line" ? (
                    <Line
                      key={type}
                      type="monotone"
                      dataKey={type}
                      stroke={colors[type]}
                      strokeWidth={2}
                      name={type}
                    />
                  ) : (
                    <Area
                      key={type}
                      type="monotone"
                      dataKey={type}
                      stroke={colors[type]}
                      fill={colors[type] + "80"}
                      stackId="1"
                      name={type}
                    />
                  )
                )}
              </ComposedChart>
            ) : (
              <ComposedChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis
                  label={{
                    value: "Volume (kg)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                {trainingTypes.map((type) => (
                  <Bar
                    key={type}
                    dataKey={type}
                    fill={colors[type]}
                    stackId="a"
                    name={type}
                  />
                ))}
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // Array dos tipos de treino para processamento
  const trainingTypes = Object.keys(trainingData);
  const isOdd = trainingTypes.length % 2 !== 0;
  const lastItemIndex = trainingTypes.length - 1;

  return (
    <div className="w-screen h-ful flex justify-center bg-sky-950 p-6">
      <div
        className={`rounded-md mt-10 transition-all duration-300  ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        <div className="text-center bg-neutral-800 p-3 rounded-xl mt-2 w-[60%] mx-auto mb-4">
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-2xl font-bold text-center text-white mb-6 mt-2">
              Evolução de Volume por Tipo de Treino
            </h1>
          </div>
          <p className="text-blue-100">
            Acompanhe seu progresso e alcance seus objetivos!
          </p>
        </div>

        {/* Controles */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 w-[90%] mx-auto">
          {/* Modos de visualização */}
          <div className="bg-white p-2 rounded-lg shadow-md flex space-x-2">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1 rounded-md flex items-center ${
                viewMode === "cards" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              <Filter size={16} className="mr-1" />
              <span>Por Grupo</span>
            </button>
            <button
              onClick={() => setViewMode("comparison")}
              className={`px-3 py-1 rounded-md flex items-center ${
                viewMode === "comparison"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              <BarChart2 size={16} className="mr-1" />
              <span>Comparação</span>
            </button>
            <button
              onClick={() => setViewMode("summary")}
              className={`px-3 py-1 rounded-md flex items-center ${
                viewMode === "summary"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              <Calendar size={16} className="mr-1" />
              <span>Resumo</span>
            </button>
          </div>

          {/* Tipo de gráfico */}
          <div className="bg-white p-2 rounded-lg shadow-md flex space-x-2">
            <button
              onClick={() => setVisualizationType("line")}
              className={`px-3 py-1 rounded-md ${
                visualizationType === "line"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Linha
            </button>
            <button
              onClick={() => setVisualizationType("area")}
              className={`px-3 py-1 rounded-md ${
                visualizationType === "area"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Área
            </button>
            <button
              onClick={() => setVisualizationType("bar")}
              className={`px-3 py-1 rounded-md ${
                visualizationType === "bar"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Barras
            </button>
          </div>

          {/* Exibir metas */}
          <div className="bg-white p-2 rounded-lg shadow-md">
            <button
              onClick={() => setShowMetas(!showMetas)}
              className={`px-3 py-1 rounded-md flex items-center ${
                showMetas ? "bg-green-600 text-white" : "bg-gray-100"
              }`}
            >
              <Target size={16} className="mr-1" />
              <span>{showMetas ? "Ocultar Metas" : "Mostrar Metas"}</span>
            </button>
          </div>
        </div>

        {/* Visualização por cards */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[90%] mx-auto pb-8">
            {trainingTypes.map((type, index) => {
              const isLastItemOdd = isOdd && index === lastItemIndex;
              const isHovered = hoveredChart === type;
              const isOtherHovered =
                hoveredChart !== null && hoveredChart !== type;

              const cardClasses = `
                bg-white p-4 rounded-lg shadow-md 
                transition-all duration-300 ease-in-out
                ${isHovered ? "scale-105 shadow-lg z-10" : ""}
                ${isOtherHovered ? "opacity-50 scale-95" : ""}
                ${isLastItemOdd ? "md:col-span-2" : ""}
              `;

              return (
                <div
                  key={type}
                  className={cardClasses}
                  onMouseEnter={() => setHoveredChart(type)}
                  onMouseLeave={() => setHoveredChart(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="mr-2">{getIcon(type)}</div>
                      <h2 className="text-xl font-semibold">{type}</h2>
                    </div>
                    <div className="text-sm text-gray-500">
                      {trainingData[type].length > 0 &&
                        `Último: ${
                          trainingData[type][trainingData[type].length - 1].data
                        }`}
                    </div>
                  </div>

                  {renderChart(type, trainingData[type], isLastItemOdd)}

                  <div className="mt-3 p-2 bg-gray-50 rounded">
                    <TrendIndicator
                      trend={calculateTrend(trainingData[type])}
                    />
                    {showMetas && (
                      <ProgressIndicator
                        type={type}
                        data={trainingData[type]}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Visualização de comparação */}
        {viewMode === "comparison" && (
          <div className="w-[90%] mx-auto pb-8">{renderComparisonChart()}</div>
        )}

        {/* Visualização de resumo */}
        {viewMode === "summary" && (
          <div className="w-[90%] mx-auto pb-8">{renderSummaryChart()}</div>
        )}
      </div>
    </div>
  );
};

export default GraficoEvolucao;
