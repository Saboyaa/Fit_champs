// src/Paginas/ListadeExercicios.jsx - Versão Refatorada
import React, { useState } from "react";
import { useExercicios } from "../Hooks/ExerciciosContext";
import { useGlobalContext } from "../Hooks/ContextoGlobal";
import { useExerciseLogic } from "../Hooks/useExerciseLogic";

// Componentes importados
import Header from "../Components/ComponentsListaExercicios/Header";
import ViewControls from "../Components/ComponentsListaExercicios/ViewControls";
import EmptyState from "../Components/ComponentsListaExercicios/EmptyState";
import WorkoutCard from "../Components/ComponentsListaExercicios/WorkoutCard";
import SaveButton from "../Components/ComponentsListaExercicios/SaveButton";
import TreinoTipoSumario from "../Components/ComponentsListaExercicios/resumoSemanal";

function ListadeExercicios() {
  const { isMenuOpen } = useGlobalContext();
  const { treinos } = useExercicios();
  const [activeView, setActiveView] = useState("list");

  const {
    exerciciosPorTreino,
    expandedTreino,
    isSaving,
    saveSuccess,
    adicionarExercicio,
    removerExercicio,
    atualizarExercicio,
    toggleExpandTreino,
    salvarTreino,
    calcularTotalPorTreino,
  } = useExerciseLogic(treinos);

  const hasExercicios = treinos.some(
    (treino) =>
      treino.descripition !== "Day Off" &&
      exerciciosPorTreino[treino.id] &&
      exerciciosPorTreino[treino.id].length > 0
  );

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 flex justify-center p-6 overflow-y-auto">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        <Header />

        <ViewControls
          activeView={activeView}
          setActiveView={setActiveView}
          hasExercicios={hasExercicios}
        />

        {hasExercicios ? (
          <div className="space-y-6 w-full md:w-[90%] mx-auto p-4">
            {activeView === "list" && (
              <>
                {treinos.map((treino) => (
                  <WorkoutCard
                    key={treino.id}
                    treino={treino}
                    exerciciosPorTreino={exerciciosPorTreino}
                    expandedTreino={expandedTreino}
                    toggleExpandTreino={toggleExpandTreino}
                    calcularTotalPorTreino={calcularTotalPorTreino}
                    atualizarExercicio={atualizarExercicio}
                    removerExercicio={removerExercicio}
                    adicionarExercicio={adicionarExercicio}
                  />
                ))}

                <SaveButton
                  salvarTreino={salvarTreino}
                  isSaving={isSaving}
                  saveSuccess={saveSuccess}
                />
              </>
            )}

            {activeView === "summary" && hasExercicios && (
              <div className="w-full">
                <TreinoTipoSumario
                  treinos={treinos}
                  exerciciosPorTreino={exerciciosPorTreino}
                />
              </div>
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

export default ListadeExercicios;
