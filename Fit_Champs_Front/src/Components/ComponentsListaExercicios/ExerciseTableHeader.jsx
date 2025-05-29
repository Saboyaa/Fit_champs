import React from "react";

const ExerciseTableHeader = () => {
  return (
    <div className="grid grid-cols-12 gap-3 text-blue-200 font-medium bg-indigo-900/50 p-3 rounded-lg text-sm border border-indigo-800/50">
      <div className="col-span-3">Nome do Exercício</div>
      <div className="col-span-2">Subgrupo Muscular</div>
      <div className="col-span-2">Repetições</div>
      <div className="col-span-2">Peso (kg)</div>
      <div className="col-span-2">Volume</div>
      <div className="col-span-1">Ações</div>
    </div>
  );
};

export default ExerciseTableHeader;
