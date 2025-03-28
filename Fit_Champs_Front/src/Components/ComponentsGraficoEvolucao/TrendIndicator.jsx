// src/components/GraficosEvolucao/TrendIndicator.jsx
import React from "react";
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from "lucide-react";

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

export default TrendIndicator;
