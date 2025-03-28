// src/components/GraficosEvolucao/TrainingCard.jsx
import React from "react";
import TrainingChart from "./TrainingChart";
import TrendIndicator from "./TrendIndicator";
import ProgressIndicator from "./ProgressIndicator";
import { calculateTrend } from "./utils";

const TrainingCard = ({
  type,
  data,
  icons,
  isLastItemOdd,
  hoveredChart,
  setHoveredChart,
  visualizationType,
  showMetas,
  metas,
}) => {
  const isHovered = hoveredChart === type;
  const isOtherHovered = hoveredChart !== null && hoveredChart !== type;

  // Obter ícone do grupo muscular
  const getIcon = (grupo) => {
    const { peito, perna, ombro, costas, braco } = icons;

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

  const cardClasses = `
    bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700
    transition-all duration-300 ease-in-out
    ${isHovered ? "scale-102 shadow-xl z-10 border border-blue-500" : ""}
    ${isOtherHovered ? "opacity-70 scale-98" : ""}
    ${isLastItemOdd ? "md:col-span-2" : ""}
  `;

  return (
    <div
      className={cardClasses}
      onMouseEnter={() => setHoveredChart(type)}
      onMouseLeave={() => setHoveredChart(null)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="mr-3 bg-slate-700 p-2 rounded-lg">
            {getIcon(type)}
          </div>
          <h2 className="text-2xl font-bold text-slate-100">{type}</h2>
        </div>
        <div className="text-sm bg-slate-700 px-3 py-1 rounded-full text-blue-300">
          {data.length > 0 && `Último: ${data[data.length - 1].data}`}
        </div>
      </div>

      <TrainingChart
        type={type}
        data={data}
        showMetas={showMetas}
        metas={metas}
        visualizationType={visualizationType}
        hoveredChart={hoveredChart}
        isLastItemOdd={isLastItemOdd}
      />

      <div className="mt-4 p-4 bg-gradient-to-r from-slate-700 to-slate-900 rounded-lg border border-slate-600 shadow-lg">
        <TrendIndicator trend={calculateTrend(data)} />
        {showMetas && (
          <ProgressIndicator type={type} data={data} meta={metas[type]} />
        )}
      </div>
    </div>
  );
};

export default TrainingCard;
