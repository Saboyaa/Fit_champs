import React from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

const RankingPositionCard = ({
  category,
  data,
  isActive,
  onClick,
  renderCategoryIcon,
}) => {
  // Função para obter ícone de mudança de posição
  const getPositionChangeIcon = (current, previous) => {
    const diff = previous - current;
    if (diff > 0) {
      return <ArrowUp className="text-green-500" size={16} />;
    } else if (diff < 0) {
      return <ArrowDown className="text-red-500" size={16} />;
    } else {
      return <Minus className="text-gray-500" size={16} />;
    }
  };

  // Função para formatar a mudança de posição
  const formatPositionChange = (current, previous) => {
    const diff = previous - current;
    if (diff > 0) {
      return `+${diff}`;
    } else if (diff < 0) {
      return `${diff}`;
    } else {
      return "=";
    }
  };

  return (
    <div
      className={`bg-sky-800/60 p-3 rounded-lg shadow-md ${
        isActive ? "ring-2 ring-blue-400" : ""
      } hover:bg-sky-700/60 transition-colors cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center mb-2">
        {renderCategoryIcon(category)}
        <h3 className="text-lg font-semibold ml-2 text-white">{category}</h3>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{data.posicao}</span>
        <span className="text-blue-200 text-sm ml-1">/{data.total}</span>
      </div>
      <div className="mt-1 flex justify-center">
        <div className="flex items-center">
          {getPositionChangeIcon(data.posicao, data.posicaoAnterior)}
          <span
            className={`text-xs ml-1 ${
              data.posicaoAnterior > data.posicao
                ? "text-green-400"
                : data.posicaoAnterior < data.posicao
                ? "text-red-400"
                : "text-gray-400"
            }`}
          >
            {formatPositionChange(data.posicao, data.posicaoAnterior)}
          </span>
        </div>
      </div>
      <div className="mt-1 text-center">
        <span className="text-sm font-medium text-blue-100">
          {data.pontos} pts
        </span>
      </div>
    </div>
  );
};

export default RankingPositionCard;
