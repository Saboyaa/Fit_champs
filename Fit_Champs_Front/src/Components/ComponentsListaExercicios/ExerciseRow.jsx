import React from "react";
import { Trash } from "lucide-react";
import CustomDropdown from "./selectmo";
import exerciciosPorTipo from "../../Classes/exercicio";

const ExerciseRow = ({
  treino,
  exercicio,
  atualizarExercicio,
  removerExercicio,
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center bg-slate-800/50 p-3 rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-700/50">
      <div className="col-span-3">
        <CustomDropdown
          options={
            exerciciosPorTipo[treino.descripition]?.map((exercicioOpt) => ({
              value: exercicioOpt.nome,
              label: exercicioOpt.nome,
            })) || []
          }
          value={exercicio.nome}
          onChange={(e) =>
            atualizarExercicio(treino.id, exercicio.id, "nome", e.target.value)
          }
          placeholder="Selecione um exercício"
        />
      </div>

      <div className="col-span-2 text-white p-2 bg-indigo-900/50 rounded-md flex items-center justify-center font-medium border border-indigo-800/30">
        {exercicio.subgrupo}
      </div>

      <div className="col-span-2">
        <CustomDropdown
          options={[
            { value: "3 x 12", label: "3 x 12" },
            { value: "4 x 10", label: "4 x 10" },
            { value: "3 x 15", label: "3 x 15" },
            { value: "5 x 5", label: "5 x 5" },
            { value: "3 x 8", label: "3 x 8" },
            { value: "4 x 8", label: "4 x 8" },
            { value: "3 x 10", label: "3 x 10" },
          ]}
          value={exercicio.repeticoes}
          onChange={(e) =>
            atualizarExercicio(
              treino.id,
              exercicio.id,
              "repeticoes",
              e.target.value
            )
          }
          placeholder="Selecione repetições"
        />
      </div>

      <div className="col-span-2">
        <input
          type="number"
          className="w-full p-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          value={exercicio.peso}
          onChange={(e) =>
            atualizarExercicio(treino.id, exercicio.id, "peso", e.target.value)
          }
          min="0"
          step="0.5"
        />
      </div>

      <div className="col-span-2 text-white p-2 bg-blue-900/50 rounded-md flex items-center justify-center font-medium border border-blue-800/30">
        {exercicio.volume}
      </div>

      <div className="col-span-1 flex justify-center">
        <button
          onClick={() => removerExercicio(treino.id, exercicio.id)}
          className="p-2 rounded-full bg-gradient-to-r from-red-500/70 to-red-700/70 text-white hover:from-red-600 hover:to-red-800 transition-colors"
          title="Remover exercício"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default ExerciseRow;
