import React, { useState } from "react";
import { useExercicios } from "../Context/ExerciciosContext";
import { useGlobalContext } from "../Context/ContextoGlobal";
import { SaveIcon, PlusCircleIcon, TrashIcon } from "lucide-react";

// Banco de dados simulado de exercícios por tipo de treino
const exerciciosPorTipo = {
  "Treino de Peito": [
    "Supino Reto",
    "Supino Inclinado",
    "Crucifixo",
    "Crossover",
    "Flexão",
    "Peck Deck",
    "Pullover",
  ],
  "Treino de Costas": [
    "Puxada Frente",
    "Remada Baixa",
    "Remada Curvada",
    "Pulldown",
    "Barra Fixa",
    "Remada Unilateral",
  ],
  "Treino de Braço": [
    "Rosca Direta",
    "Rosca Alternada",
    "Rosca Martelo",
    "Tríceps Corda",
    "Tríceps Francês",
    "Tríceps Testa",
  ],
  "Treino de Perna": [
    "Agachamento",
    "Leg Press",
    "Cadeira Extensora",
    "Cadeira Flexora",
    "Panturrilha",
    "Stiff",
    "Avanço",
  ],
  "Treino de Ombro": [
    "Desenvolvimento",
    "Elevação Lateral",
    "Elevação Frontal",
    "Face Pull",
    "Encolhimento",
    "Arnold Press",
  ],
  "Day Off": [],
};

function ListadeExercicios() {
  const { isMenuOpen } = useGlobalContext();
  const { treinos } = useExercicios();
  const [exerciciosPorTreino, setExerciciosPorTreino] = useState({});

  // Inicialize exercícios para cada dia/tipo de treino
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
      });
    }

    setExerciciosPorTreino((prev) => ({
      ...prev,
      [treinoId]: novoExercicios,
    }));
  };

  // Adicionar um exercício a um treino específico
  const adicionarExercicio = (treinoId) => {
    const novoExercicio = {
      id: Math.random().toString(36).substr(2, 9),
      nome: "",
      repeticoes: "3 x 12",
      peso: 0,
      volume: 0,
    };

    setExerciciosPorTreino((prev) => ({
      ...prev,
      [treinoId]: [...(prev[treinoId] || []), novoExercicio],
    }));
  };

  // Remover um exercício de um treino específico
  const removerExercicio = (treinoId, exercicioId) => {
    setExerciciosPorTreino((prev) => ({
      ...prev,
      [treinoId]: prev[treinoId].filter((ex) => ex.id !== exercicioId),
    }));
  };

  // Atualizar dados de um exercício
  const atualizarExercicio = (treinoId, exercicioId, campo, valor) => {
    setExerciciosPorTreino((prev) => ({
      ...prev,
      [treinoId]: prev[treinoId].map((ex) =>
        ex.id === exercicioId ? { ...ex, [campo]: valor } : ex
      ),
    }));

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

  // Salvar treino completo
  const salvarTreino = () => {
    // Deixo para o Back trabalhar
    console.log("Treinos salvos:", {
      treinos,
      exerciciosPorTreino,
    });

    alert("Treino salvo com sucesso!");
  };

  return (
    <div className="w-screen min-h-screen bg-neutral-800 flex justify-center p-6">
      <div
        className={`rounded-md mt-20 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        <div className="bg-sky-950 p-8 rounded-md mb-6">
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            <span className="ml-4 text-3xl text-white gap-2">
              Lista de Exercícios
            </span>
          </h1>
          <p className="text-blue-100 text-semibold text-center p-1">
            Selecione os exercícios para cada dia de treino
          </p>
        </div>

        {treinos.length > 0 ? (
          <div className="space-y-6">
            {treinos.map((treino) => {
              if (treino.descripition === "Day Off") return null;

              // Inicializar exercícios para este treino se necessário
              if (!exerciciosPorTreino[treino.id]) {
                inicializarExercicios(treino.id);
              }

              return (
                <div
                  key={treino.id}
                  className="bg-sky-950 p-5 rounded-md shadow"
                >
                  <h2 className="text-xl font-bold text-white mb-4">
                    {treino.text} - {treino.descripition}
                  </h2>

                  {exerciciosPorTreino[treino.id] &&
                  exerciciosPorTreino[treino.id].length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-12 gap-2 text-white font-bold bg-neutral-700 p-2 rounded">
                        <div className="col-span-4">Nome do Exercício</div>
                        <div className="col-span-3">Repetições</div>
                        <div className="col-span-2">Peso (kg)</div>
                        <div className="col-span-2">Volume</div>
                        <div className="col-span-1">Ações</div>
                      </div>

                      {exerciciosPorTreino[treino.id].map(
                        (exercicio, index) => (
                          <div
                            key={exercicio.id}
                            className="grid grid-cols-12 gap-2 items-center bg-neutral-800 p-3 rounded"
                          >
                            <div className="col-span-4">
                              <select
                                className="w-full p-2 bg-neutral-700 text-white rounded"
                                value={exercicio.nome}
                                onChange={(e) =>
                                  atualizarExercicio(
                                    treino.id,
                                    exercicio.id,
                                    "nome",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Selecione um exercício</option>
                                {exerciciosPorTipo[treino.descripition].map(
                                  (nome) => (
                                    <option key={nome} value={nome}>
                                      {nome}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>

                            <div className="col-span-3">
                              <select
                                className="w-full p-2 bg-neutral-700 text-white rounded"
                                value={exercicio.repeticoes}
                                onChange={(e) =>
                                  atualizarExercicio(
                                    treino.id,
                                    exercicio.id,
                                    "repeticoes",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="3 x 12">3 x 12</option>
                                <option value="4 x 10">4 x 10</option>
                                <option value="3 x 15">3 x 15</option>
                                <option value="5 x 5">5 x 5</option>
                                <option value="3 x 8">3 x 8</option>
                                <option value="4 x 8">4 x 8</option>
                                <option value="3 x 10">3 x 10</option>
                              </select>
                            </div>

                            <div className="col-span-2">
                              <input
                                type="number"
                                className="w-full p-2 bg-neutral-700 text-white rounded"
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

                            <div className="col-span-2 text-white p-2">
                              {exercicio.volume}
                            </div>

                            <div className="col-span-1">
                              <button
                                onClick={() =>
                                  removerExercicio(treino.id, exercicio.id)
                                }
                                className="p-2 rounded bg-red-600 text-white hover:bg-red-700"
                              >
                                <TrashIcon size={18} />
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-white text-center">
                      Carregando exercícios...
                    </p>
                  )}

                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => adicionarExercicio(treino.id)}
                      className="bg-neutral-800 text-white p-2 rounded flex items-center gap-2 hover:opacity-80"
                    >
                      <PlusCircleIcon size={18} />
                      Adicionar Exercício
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="mt-6 flex justify-center">
              <button
                onClick={salvarTreino}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded shadow-lg flex items-center gap-2"
              >
                <SaveIcon size={20} />
                Salvar Treino Completo
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-neutral-700 p-8 rounded-md text-center">
            <p className="text-white text-lg">
              Nenhum treino selecionado. Por favor, vá para a página "Treinos
              Semanais" e adicione seus dias de treino.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListadeExercicios;
