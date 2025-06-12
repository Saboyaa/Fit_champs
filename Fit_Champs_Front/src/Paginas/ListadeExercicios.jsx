// src/Paginas/ListadeExercicios.jsx
import { useState, useEffect } from "react";
import { useExercicios } from "../Hooks/ExerciciosContext";
import { useGlobalContext } from "../Hooks/ContextoGlobal";
import { useExerciseLogic } from "../Hooks/useExerciseLogic";

import Header from "../Components/ComponentsListaExercicios/Header";
import ViewControls from "../Components/ComponentsListaExercicios/ViewControls";
import EmptyState from "../Components/ComponentsListaExercicios/EmptyState";
import WorkoutCard from "../Components/ComponentsListaExercicios/WorkoutCard";
import SaveButton from "../Components/ComponentsListaExercicios/SaveButton";
import TreinoTipoSumario from "../Components/ComponentsListaExercicios/resumoSemanal";
import exerciseService from "../services/exerciseService";

function ListadeExercicios() {
  const { isMenuOpen } = useGlobalContext();
  const { treinos, adicionarTreinos } = useExercicios();
  const [activeView, setActiveView] = useState("list");
  const [exercisesList, setExercisesList] = useState();
  const [forceShowSummary, setForceShowSummary] = useState(false);

  const loadExercisesList = async () => {
    try {
      const response = await exerciseService.getExercisesList();
      setExercisesList(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    loadExercisesList();
  }, []);

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
  } = useExerciseLogic(treinos, adicionarTreinos, exercisesList);

  const hasExercicios = treinos.some(
    (treino) =>
      treino.descripition !== "Day Off" &&
      exerciciosPorTreino[treino.id] &&
      exerciciosPorTreino[treino.id].length > 0
  );

  const handleViewSummaryFromEmpty = () => {
    setForceShowSummary(true);
    setActiveView("summary");
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    if (view === "list") {
      setForceShowSummary(false);
    }
  };

  // Determinar se deve mostrar o resumo semanal
  const shouldShowSummary =
    activeView === "summary" && (hasExercicios || forceShowSummary);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 flex justify-center p-6 overflow-y-auto">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        <Header />

        {/* Mostrar ViewControls se há exercícios OU se está forçando a exibição do resumo */}
        {(hasExercicios || forceShowSummary) && (
          <ViewControls
            activeView={activeView}
            setActiveView={handleViewChange}
            hasExercicios={hasExercicios}
          />
        )}

        {/* Conteúdo principal */}
        <div className="space-y-6 w-full md:w-[90%] mx-auto p-4">
          {activeView === "list" && hasExercicios && (
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
                  exerciciosPorTipo={exercisesList}
                />
              ))}

              <SaveButton
                salvarTreino={salvarTreino}
                isSaving={isSaving}
                saveSuccess={saveSuccess}
              />
            </>
          )}

          {shouldShowSummary && (
            <div className="w-full">
              <TreinoTipoSumario
                treinos={treinos}
                exerciciosPorTreino={exerciciosPorTreino}
                exerciciosPorTipo={exercisesList}
              />
            </div>
          )}

          {activeView === "list" && !hasExercicios && (
            <EmptyState onViewSummary={handleViewSummaryFromEmpty} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ListadeExercicios;
