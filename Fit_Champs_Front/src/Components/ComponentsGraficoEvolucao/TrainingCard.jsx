// src/components/GraficosEvolucao/TrainingCard.jsx
import React from "react";
import TrainingChart from "./TrainingChart";
import TrendIndicator from "./TrendIndicator";
import ProgressIndicator from "./ProgressIndicator";
import { calculateTrend, getIconComponent } from "./Utils";

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

  const cardClasses = `
    bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700
    transition-all duration-500 ease-in-out
    ${
      isHovered
        ? "scale-105 shadow-2xl z-30 border-2 border-blue-500 bg-gradient-to-br from-slate-800  to-slate-800 transform translate-y-[-10px]"
        : ""
    }
    ${isOtherHovered ? "opacity-50 scale-95 blur-[1px]" : ""}
    ${isLastItemOdd ? "md:col-span-2" : ""}
    hover:bg-gradient-to-br hover:from-slate-800 hover:via-indigo-900/80 hover:to-slate-800 hover:border-blue-400
  `;

  return (
    <div
      className={cardClasses}
      onMouseEnter={() => setHoveredChart(type)}
      onMouseLeave={() => setHoveredChart(null)}
      style={{
        transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`flex items-center transition-all duration-300 ${
            isHovered ? "scale-110" : ""
          }`}
        >
          <div
            className={`mr-3 ${
              isHovered
                ? "bg-gradient-to-br from-blue-700 to-indigo-800"
                : "bg-slate-700"
            } p-2 rounded-lg transition-colors duration-300`}
          >
            {getIconComponent(type, icons)}
          </div>
          <h2
            className={`text-2xl font-bold ${
              isHovered ? "text-blue-300" : "text-slate-100"
            } transition-colors duration-300`}
          >
            {type}
          </h2>
        </div>
        <div
          className={`text-sm ${
            isHovered
              ? "bg-gradient-to-r from-blue-700 to-indigo-800"
              : "bg-slate-700"
          } px-3 py-1 rounded-full ${
            isHovered ? "text-white" : "text-blue-300"
          } transition-all duration-300`}
        >
          {data.length > 0 && `Último: ${data[data.length - 1].data}`}
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          isHovered ? "scale-105 transform translate-y-[-5px]" : ""
        }`}
      >
        <TrainingChart
          type={type}
          data={data}
          showMetas={showMetas}
          metas={metas}
          visualizationType={visualizationType}
          hoveredChart={hoveredChart}
          isLastItemOdd={isLastItemOdd}
        />
      </div>

      <div
        className={`mt-4 p-4 transition-all duration-300 ${
          isHovered
            ? "bg-slate-800 rounded-lg border border-blue-500/50 shadow-xl"
            : "bg-slate-800 rounded-lg border border-slate-700 shadow-lg"
        }`}
      >
        <TrendIndicator trend={calculateTrend(data)} />
        {showMetas && (
          <ProgressIndicator type={type} data={data} meta={metas[type]} />
        )}
      </div>
    </div>
  );
};

export default TrainingCard;
