import React from "react";
import { Calendar, PlusCircle } from "lucide-react";
import ExerciseTableHeader from "./ExerciseTableHeader";
import ExerciseRow from "./ExerciseRow";

const WorkoutCard = ({
  treino,
  exerciciosPorTreino,
  expandedTreino,
  toggleExpandTreino,
  calcularTotalPorTreino,
  atualizarExercicio,
  removerExercicio,
  adicionarExercicio,
}) => {
  if (treino.descripition === "Day Off") return null;

  // Only render the training day if it has exercises
  if (
    !exerciciosPorTreino[treino.id] ||
    exerciciosPorTreino[treino.id].length === 0
  ) {
    return null;
  }

  const stats = calcularTotalPorTreino(treino.id);
  const isExpanded = expandedTreino === treino.id;

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-slate-700 transition-all duration-300 hover:shadow-2xl">
      <div
        className="p-5 bg-gradient-to-r from-slate-800 to-indigo-900/70 flex justify-between items-center cursor-pointer hover:from-slate-700 hover:to-indigo-800/70 transition-colors"
        onClick={() => toggleExpandTreino(treino.id)}
      >
        <div>
          <h2 className="text-xl font-bold text-white flex items-center">
            <Calendar className="mr-2 text-blue-300" size={20} />
            {treino.text} ({treino.data}) - {treino.descripition}
          </h2>
          <div className="flex gap-4 mt-2">
            <span className="text-blue-200 bg-slate-700/70 px-3 py-1 rounded-lg text-sm">
              {stats.exercicios}/{stats.exerciciosTotal} exercícios
            </span>
            <span className="text-blue-200 bg-slate-700/70 px-3 py-1 rounded-lg text-sm">
              Volume total: {stats.volume}
            </span>
          </div>
        </div>
        <div className="text-white bg-slate-700/50 p-2 rounded-full">
          {isExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="bg-slate-900/90 p-5">
          <div className="space-y-4">
            <ExerciseTableHeader />

            {exerciciosPorTreino[treino.id].map((exercicio) => (
              <ExerciseRow
                key={exercicio.id}
                treino={treino}
                exercicio={exercicio}
                atualizarExercicio={atualizarExercicio}
                removerExercicio={removerExercicio}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => adicionarExercicio(treino.id)}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-2 px-6 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-indigo-800 shadow-md transform hover:scale-105 transition-transform"
            >
              <PlusCircle size={18} />
              Adicionar Exercício
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard;
