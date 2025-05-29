import React from "react";
import { Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyState = () => {
  const navigate = useNavigate();

  const voltarParaTreinosSemanais = () => {
    navigate("/TreinosSemanais");
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl text-center shadow-lg border border-slate-700 w-full md:w-[80%] mx-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-indigo-900/50 p-4 rounded-full">
          <Info size={40} className="text-blue-300" />
        </div>
        <p className="text-blue-100 text-lg">
          Nenhum treino foi adicionado ou todos os exercícios foram removidos.
          Por favor, vá para a página "Treinos Semanais" e adicione seus dias de
          treino.
        </p>
        <button
          onClick={voltarParaTreinosSemanais}
          className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 px-6 rounded-xl flex items-center gap-2 transition-colors transform hover:scale-105 shadow-lg"
        >
          <ArrowLeft size={16} />
          Ir para Treinos Semanais
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
