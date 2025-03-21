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
} from "recharts";
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from "lucide-react";
import { useGlobalContext } from "../Context/ContextoGlobal";
import peito from "../images/peito.png";
import perna from "../images/perna.png";
import ombro from "../images/ombro.png";
import costas from "../images/costas.png";
import braco from "../images/musculo.png";

const GraficoEvolucao = () => {
  const { isMenuOpen } = useGlobalContext();

  // Estado para controlar qual gráfico está em foco
  const [hoveredChart, setHoveredChart] = useState(null);

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

  // Função para calcular a tendência (melhora ou piora)
  const calculateTrend = (data) => {
    if (data.length < 2) return { type: "mesmo", diff: 0 };

    const lastVolume = data[data.length - 1].volume;
    const previousVolume = data[data.length - 2].volume;
    const diff = lastVolume - previousVolume;

    if (diff > 0) return { type: "melhora", diff };
    if (diff < 0) return { type: "piora", diff: Math.abs(diff) };
    return { type: "mesmo", diff: 0 };
  };

  // Componente para exibir a tendência
  const TrendIndicator = ({ trend }) => {
    if (trend.type === "melhora") {
      return (
        <div className="flex items-center text-green-600">
          <ArrowUpCircle className="mr-1" size={16} />
          <span>Melhora de {trend.diff}kg no volume, continue assim!</span>
        </div>
      );
    } else if (trend.type === "piora") {
      return (
        <div className="flex items-center text-red-600">
          <ArrowDownCircle className="mr-1" size={16} />
          <span>
            Queda de {trend.diff}kg no volume, não deixe a peteca cair!
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

  // Array dos tipos de treino para processamento
  const trainingTypes = Object.keys(trainingData);
  const isOdd = trainingTypes.length % 2 !== 0;
  const lastItemIndex = trainingTypes.length - 1;

  return (
    <div className="w-screen h-full bg-neutral-800 flex justify-center p-6">
      <div
        className={`rounded-md mt-10 transition-all duration-300 bg-orange-400 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        <div className="text-center bg-neutral-800 p-3 rounded-xl mt-2 w-[60%] mx-auto mb-4">
          <div className="flex justify-center items-center gap-2">
            <h1 className="text-2xl font-bold text-center text-white mb-6 mt-2">
              Evolução de Volume por Tipo de Treino
            </h1>
          </div>
          <p className="text-blue-100">Veja a sua evolução!</p>
        </div>

        {/* Grid com alinhamento condicional */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[90%] mx-auto">
          {trainingTypes.map((type, index) => {
            // Determinar se este é o último item e se o total é ímpar
            const isLastItemOdd = isOdd && index === lastItemIndex;

            // Classes condicionais com base no estado de hover
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
                <div className="flex items-center mb-2">
                  <div className="mr-2">{getIcon(type)}</div>
                  <h2 className="text-xl font-semibold">{type}</h2>
                </div>

                <div
                  className={`h-64 ${
                    isLastItemOdd ? "md:w-1/2 md:mx-auto" : ""
                  }`}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trainingData[type]}
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
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
                      <Tooltip
                        formatter={(value) => [`${value} kg`, "Volume"]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="volume"
                        stroke={isHovered ? "#ff9900" : "#000000"}
                        activeDot={{ r: 8 }}
                        name={`Volume ${type}`}
                        strokeWidth={isHovered ? 3 : 2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-3 p-2 bg-gray-50 rounded">
                  <TrendIndicator trend={calculateTrend(trainingData[type])} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GraficoEvolucao;
