import React from "react";
import { Info, ArrowLeft, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyState = ({ onViewSummary }) => {
  const navigate = useNavigate();

  const voltarParaTreinosSemanais = () => {
    navigate("/TreinosSemanais");
  };

  const verResumoSemanal = () => {
    if (onViewSummary) {
      onViewSummary();
    }
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl text-center shadow-lg border border-slate-700 w-full md:w-[80%] mx-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-indigo-900/50 p-4 rounded-full">
          <Info size={40} className="text-blue-300" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          Nenhum Exercício Encontrado
        </h2>

        <p className="text-blue-100 text-lg max-w-md">
          Nenhum treino foi adicionado ou todos os exercícios foram removidos.
          Você pode adicionar novos treinos ou visualizar o resumo dos treinos
          anteriores.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md">
          <button
            onClick={voltarParaTreinosSemanais}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors transform hover:scale-105 shadow-lg"
          >
            <ArrowLeft size={16} />
            <span className="font-medium">Adicionar Treinos</span>
          </button>

          <button
            onClick={verResumoSemanal}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors transform hover:scale-105 shadow-lg"
          >
            <BarChart2 size={16} />
            <span className="font-medium">Ver Resumo</span>
          </button>
        </div>

        <p className="text-blue-300 text-sm mt-4 max-w-sm">
          O resumo semanal mostra seus treinos passados mesmo quando não há
          exercícios ativos no momento.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
