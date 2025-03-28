import React, { useState, useEffect } from "react";
import { useExercicios } from "../Context/ExerciciosContext";
import { useGlobalContext } from "../Context/ContextoGlobal";
import {
  Save,
  PlusCircle,
  Trash,
  Activity,
  Check,
  Info,
  ArrowLeft,
  BarChart2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import TreinoTipoSumario from "../Components/ComponentsListaExercicios/resumoSemanal";
// Importando o banco de dados de exercícios do arquivo separado
import exerciciosPorTipo, { encontrarExercicio } from "../Classes/exercicio";
import CustomDropdown from "../Components/selectmo";

function ListadeExercicios() {
  const { isMenuOpen } = useGlobalContext();
  const { treinos } = useExercicios();
  const [exerciciosPorTreino, setExerciciosPorTreino] = useState({});
  const [expandedTreino, setExpandedTreino] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();
  const [trainingDateAndVolume, setTrainingDateAndVolume] = useState({});

  // Inicializar exercícios para todos os treinos ao carregar
  useEffect(() => {
    treinos.forEach((treino) => {
      if (
        treino.descripition !== "Day Off" &&
        !exerciciosPorTreino[treino.id]
      ) {
        inicializarExercicios(treino.id);
      }
    });
  }, [treinos]);

  const inicializarExercicios = (treinoId) => {
    const treino = treinos.find((t) => t.id === treinoId);
    if (!treino || exerciciosPorTreino[treinoId]) return;

    const novoExercicios = [];
    for (let i = 0; i < treino.Nexercicio; i++) {
      novoExercicios.push({
        id: Math.random().toString(36).substr(2, 9),
        nome: "",
        repeticoes: "3 x 12",
        peso: 0,
        volume: 0,
        subgrupo: "", // Adicionando propriedade subgrupo para cada exercício
      });
    }

    setExerciciosPorTreino((prev) => ({
      ...prev,
      [treinoId]: novoExercicios,
    }));
  };

  const adicionarExercicio = (treinoId) => {
    const novoExercicio = {
      id: Math.random().toString(36).substr(2, 9),
      nome: "",
      repeticoes: "3 x 12",
      peso: 0,
      volume: 0,
      subgrupo: "", // Adicionando propriedade subgrupo ao novo exercício
    };

    setExerciciosPorTreino((prev) => ({
      ...prev,
      [treinoId]: [...(prev[treinoId] || []), novoExercicio],
    }));
  };

  const removerExercicio = (treinoId, exercicioId) => {
    setExerciciosPorTreino((prev) => ({
      ...prev,
      [treinoId]: prev[treinoId].filter((ex) => ex.id !== exercicioId),
    }));
  };

  const atualizarExercicio = (treinoId, exercicioId, campo, valor) => {
    setExerciciosPorTreino((prev) => {
      const novoExerciciosPorTreino = { ...prev };

      // Se estamos atualizando o nome do exercício, também precisamos atualizar o subgrupo
      if (campo === "nome" && valor) {
        // Encontrar o exercício selecionado na lista de exercícios por tipo
        const treinoAtual = treinos.find((t) => t.id === treinoId);
        if (treinoAtual) {
          const tipoTreino = treinoAtual.descripition;
          const exercicioSelecionado = encontrarExercicio(tipoTreino, valor);

          if (exercicioSelecionado) {
            // Atualize tanto o nome quanto o subgrupo
            novoExerciciosPorTreino[treinoId] = novoExerciciosPorTreino[
              treinoId
            ].map((ex) =>
              ex.id === exercicioId
                ? {
                    ...ex,
                    [campo]: valor,
                    subgrupo: exercicioSelecionado.subgrupo,
                  }
                : ex
            );
            return novoExerciciosPorTreino;
          }
        }
      }

      // Caso contrário, apenas atualize o campo solicitado
      novoExerciciosPorTreino[treinoId] = novoExerciciosPorTreino[treinoId].map(
        (ex) => (ex.id === exercicioId ? { ...ex, [campo]: valor } : ex)
      );

      return novoExerciciosPorTreino;
    });

    // Se atualizarmos peso ou repetições, calcular volume
    if (campo === "peso" || campo === "repeticoes") {
      setTimeout(() => {
        // Buscar o exercício atualizado
        const exercicio = exerciciosPorTreino[treinoId]?.find(
          (ex) => ex.id === exercicioId
        );

        if (exercicio) {
          const repeticoesMatch =
            exercicio.repeticoes.match(/(\d+)\s*x\s*(\d+)/);

          if (repeticoesMatch) {
            const series = parseInt(repeticoesMatch[1]);
            const reps = parseInt(repeticoesMatch[2]);
            const peso =
              campo === "peso" ? parseFloat(valor) : parseFloat(exercicio.peso);

            // Calcular volume (séries x repetições x peso)
            const volume = series * reps * peso;

            // Atualizar volume
            setExerciciosPorTreino((prev) => ({
              ...prev,
              [treinoId]: prev[treinoId].map((ex) =>
                ex.id === exercicioId ? { ...ex, volume } : ex
              ),
            }));
          }
        }
      }, 0);
    }
  };

  const toggleExpandTreino = (treinoId) => {
    setExpandedTreino(expandedTreino === treinoId ? null : treinoId);
  };

  const salvarTreino = () => {
    setIsSaving(true);

    // Simular tempo de salvamento
    setTimeout(() => {
      console.log("Treinos salvos:", {
        treinos,
        exerciciosPorTreino,
      });

      // Capture the current date and volumes when saving
      const currentDate = new Date();
      const volumeSummary = {};

      treinos.forEach((treino) => {
        if (treino.descripition !== "Day Off") {
          const stats = calcularTotalPorTreino(treino.id);
          volumeSummary[treino.id] = {
            text: treino.text,
            descripition: treino.descripition,
            volume: stats.volume,
            data: treino.data,
            date: currentDate.toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            }),
          };
        }
      });

      setTrainingDateAndVolume(volumeSummary);

      setIsSaving(false);
      setSaveSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    }, 1000);
  };

  const calcularTotalPorTreino = (treinoId) => {
    if (!exerciciosPorTreino[treinoId]) return { exercicios: 0, volume: 0 };

    const treino = exerciciosPorTreino[treinoId];
    const exerciciosCompletos = treino.filter((ex) => ex.nome !== "").length;
    const volumeTotal = treino.reduce(
      (total, ex) => total + (ex.volume || 0),
      0
    );

    return {
      exercicios: exerciciosCompletos,
      exerciciosTotal: treino.length,
      volume: volumeTotal,
    };
  };

  const voltarParaTreinosSemanais = () => {
    navigate("/TreinosSemanais");
  };

  return (
    <div className="w-screen min-h-screen bg-sky-950 flex justify-center p-6 overflow-y-auto">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        <div className="bg-sky-950 p-6 rounded-lg mb-6 shadow-lg">
          <div className="flex items-center justify-center mb-3">
            <Activity className="text-blue-300 mr-2" size={24} />
            <h1 className="text-2xl text-slate-100 font-bold">
              Lista de Exercícios
            </h1>
          </div>

          <div className="bg-sky-900/50 p-3 rounded-lg">
            <p className="text-blue-100 text-center font-medium">
              Selecione os exercícios para cada dia de treino
            </p>
          </div>

          <button
            onClick={voltarParaTreinosSemanais}
            className="mt-4 flex items-center gap-2 text-blue-300 hover:text-blue-100 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Voltar para Treinos Semanais</span>
          </button>
        </div>

        {treinos.length > 0 &&
        treinos.some(
          (treino) =>
            treino.descripition !== "Day Off" &&
            exerciciosPorTreino[treino.id] &&
            exerciciosPorTreino[treino.id].length > 0
        ) ? (
          <div className="space-y-4">
            {treinos.map((treino) => {
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
                <div
                  key={treino.id}
                  className="bg-sky-950 rounded-lg shadow-lg overflow-hidden"
                >
                  <div
                    className="p-4 bg-sky-900/50 flex justify-between items-center cursor-pointer hover:bg-sky-900 transition-colors"
                    onClick={() => toggleExpandTreino(treino.id)}
                  >
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center">
                        {treino.text} ({treino.data}) - {treino.descripition}
                      </h2>
                      <div className="flex gap-4 mt-1 text-blue-200 ">
                        <span className="text-sky-400">
                          {stats.exercicios}/{stats.exerciciosTotal} exercícios
                        </span>
                        <span className="text-sky-400">
                          Volume total: {stats.volume}
                        </span>
                      </div>
                    </div>
                    <div className="text-white">
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
                    <div className="bg-neutral-800 p-4">
                      <div className="space-y-3">
                        <div className="grid grid-cols-12 gap-3 text-blue-200 font-medium bg-sky-950 p-3 rounded-lg text-sm">
                          <div className="col-span-3">Nome do Exercício</div>
                          <div className="col-span-2">Subgrupo Muscular</div>
                          <div className="col-span-2">Repetições</div>
                          <div className="col-span-2">Peso (kg)</div>
                          <div className="col-span-2">Volume</div>
                          <div className="col-span-1">Deletar Exercicio</div>
                        </div>

                        {exerciciosPorTreino[treino.id].map(
                          (exercicio, index) => (
                            <div
                              key={exercicio.id}
                              className="grid grid-cols-12 gap-2 items-center bg-neutral-800 p-3 rounded-lg hover:bg-neutral-700 transition-colors"
                            >
                              <div className="col-span-3">
                                <CustomDropdown
                                  options={
                                    exerciciosPorTipo[treino.descripition]?.map(
                                      (exercicioOpt) => ({
                                        value: exercicioOpt.nome,
                                        label: exercicioOpt.nome,
                                      })
                                    ) || []
                                  }
                                  value={exercicio.nome}
                                  onChange={(e) =>
                                    atualizarExercicio(
                                      treino.id,
                                      exercicio.id,
                                      "nome",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Selecione um exercício"
                                />
                              </div>

                              <div className="col-span-2 text-white p-2 bg-neutral-700 rounded-md flex items-center justify-center font-medium">
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
                                  className="w-full p-2 bg-neutral-700 text-white rounded-md border border-neutral-600 focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                                  value={exercicio.peso}
                                  onChange={(e) =>
                                    atualizarExercicio(
                                      treino.id,
                                      exercicio.id,
                                      "peso",
                                      e.target.value
                                    )
                                  }
                                  min="0"
                                  step="0.5"
                                />
                              </div>

                              <div className="col-span-2 text-white p-2 bg-neutral-700 rounded-md flex items-center justify-center font-medium">
                                {exercicio.volume}
                              </div>

                              <div className="col-span-1 flex justify-center">
                                <button
                                  onClick={() =>
                                    removerExercicio(treino.id, exercicio.id)
                                  }
                                  className="p-2 rounded-full bg-sky-700 text-white hover:bg-red-400 transition-colors"
                                  title="Remover exercício"
                                >
                                  <Trash size={16} />
                                </button>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={() => adicionarExercicio(treino.id)}
                          className="bg-sky-800 text-white p-2 px-4 rounded-md flex items-center gap-2 hover:bg-sky-700 transition-colors shadow-md"
                        >
                          <PlusCircle size={18} />
                          Adicionar Exercício
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="sticky bottom-6 mt-6 flex justify-center">
              <button
                onClick={salvarTreino}
                disabled={isSaving}
                className={`py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 font-bold text-white transition-all duration-300 ${
                  saveSuccess ? "bg-green-600" : "bg-sky-800 hover:bg-sky-700"
                }`}
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Salvando...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check size={20} />
                    <span>Treino Salvo!</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Salvar Treino Completo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-neutral-800 p-8 rounded-lg text-center shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <Info size={40} className="text-blue-300" />
              <p className="text-blue-100 text-lg">
                Nenhum treino foi adicionado ou todos os exercícios foram
                removidos. Por favor, vá para a página "Treinos Semanais" e
                adicione seus dias de treino.
              </p>
              <button
                onClick={voltarParaTreinosSemanais}
                className="mt-4 bg-sky-800 hover:bg-sky-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
              >
                <ArrowLeft size={16} />
                Ir para Treinos Semanais
              </button>
            </div>
          </div>
        )}
      </div>
      {treinos.length > 0 &&
        treinos.some(
          (treino) =>
            treino.descripition !== "Day Off" &&
            exerciciosPorTreino[treino.id] &&
            exerciciosPorTreino[treino.id].length > 0
        ) && (
          <TreinoTipoSumario
            treinos={treinos}
            exerciciosPorTreino={exerciciosPorTreino}
          />
        )}
    </div>
  );
}

export default ListadeExercicios;
