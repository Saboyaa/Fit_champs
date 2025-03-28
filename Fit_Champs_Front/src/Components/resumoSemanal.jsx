import React, { useMemo, useState } from "react";
import {
  Activity,
  TrendingUp,
  ClipboardList,
  BicepsFlexedIcon,
  Target,
  Trophy,
  Zap,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import exerciciosPorTipo from "../Classes/exercicio";

const TreinoTipoSumario = ({ exerciciosPorTreino, treinos }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [expandedType, setExpandedType] = useState(null);

  // Função para obter todos os subgrupos possíveis para um tipo de treino
  const getTodosSubgruposPorTipo = (tipoTreino) => {
    const exercicios = exerciciosPorTipo[tipoTreino] || [];
    // Criar um Set para evitar duplicatas
    const subgruposSet = new Set();

    exercicios.forEach((ex) => {
      if (ex.subgrupo) {
        subgruposSet.add(ex.subgrupo);
      }
    });

    return Array.from(subgruposSet);
  };

  const treinoTipoSummary = useMemo(() => {
    const summary = {};

    treinos.forEach((treino) => {
      if (treino.descripition === "Day Off") return;

      const exercises = exerciciosPorTreino[treino.id] || [];

      if (!summary[treino.descripition]) {
        summary[treino.descripition] = {
          total: 0,
          exercicios: [],
          volumePorDia: {},
          sessionCount: 0,
          muscleGroups: {}, // Todos os subgrupos possíveis
          selectedMuscleGroups: {}, // Subgrupos que foram selecionados
        };

        // Inicializar todos os subgrupos possíveis para este tipo de treino
        const todosSubgrupos = getTodosSubgruposPorTipo(treino.descripition);
        todosSubgrupos.forEach((subgrupo) => {
          summary[treino.descripition].muscleGroups[subgrupo] = 0;
        });
      }

      summary[treino.descripition].sessionCount += 1;

      const dailyVolume = exercises.reduce(
        (total, ex) => total + (ex.volume || 0),
        0
      );
      summary[treino.descripition].total += dailyVolume;
      summary[treino.descripition].volumePorDia[treino.data] = dailyVolume;
      summary[treino.descripition].exercicios.push(...exercises);

      // Contar exercícios por subgrupo muscular
      exercises.forEach((ex) => {
        if (ex.subgrupo) {
          // Incrementar contagem no subgrupo
          summary[treino.descripition].muscleGroups[ex.subgrupo] =
            (summary[treino.descripition].muscleGroups[ex.subgrupo] || 0) + 1;

          // Se o exercício tem nome (foi selecionado), marcá-lo como selecionado
          if (ex.nome) {
            summary[treino.descripition].selectedMuscleGroups[ex.subgrupo] =
              (summary[treino.descripition].selectedMuscleGroups[ex.subgrupo] ||
                0) + 1;
          }
        }
      });
    });

    return summary;
  }, [exerciciosPorTreino, treinos]);

  const detalhamentoTipos = Object.entries(treinoTipoSummary)
    .map(([tipo, dados]) => ({
      tipo,
      totalVolume: Math.round(dados.total),
      sessionCount: dados.sessionCount,
      exerciseCount: dados.exercicios.length,
      muscleGroups: dados.muscleGroups,
      selectedMuscleGroups: dados.selectedMuscleGroups,
      averageVolume:
        dados.sessionCount > 0
          ? (dados.total / dados.sessionCount).toFixed(2)
          : 0,
      volumePorDia: Object.entries(dados.volumePorDia).map(
        ([data, volume]) => ({
          data,
          volume: Math.round(volume),
        })
      ),
    }))
    .filter((item) => item.sessionCount > 0 && item.exerciseCount > 0);

  const getIntensityLevel = (averageVolume) => {
    if (averageVolume < 3000) return { label: "Leve", color: "text-green-400" };
    if (averageVolume < 5000)
      return { label: "Moderado", color: "text-yellow-400" };
    return { label: "Intenso", color: "text-red-400" };
  };

  return (
    <div
      className={`bg-sky-950/50 rounded-2xl p-6 mt-6 shadow-2xl hover:shadow-3xl transition-all duration-300 ml-6 ${
        showSummary ? "max-w-5xl w-full" : "max-w-xs"
      }`}
    >
      <button
        onClick={() => setShowSummary(!showSummary)}
        className={`w-full bg-gradient-to-r from-sky-700 to-blue-600 hover:from-sky-600 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transform hover:scale-[1.02] transition-transform ${
          !showSummary ? "whitespace-nowrap" : ""
        }`}
      >
        <Activity className="text-blue-200" size={24} />
        <span>
          {showSummary ? "Esconder Resumo" : "Resumo dos Meus Treinos"}
        </span>
      </button>

      {showSummary && Object.keys(treinoTipoSummary).length > 0 && (
        <div className="mt-6 space-y-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {detalhamentoTipos.map((item) => {
              const intensityLevel = getIntensityLevel(item.averageVolume);

              return (
                <div
                  key={item.tipo}
                  className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-blue-200">
                      {item.tipo}
                    </h3>
                    <button
                      onClick={() =>
                        setExpandedType(
                          expandedType === item.tipo ? null : item.tipo
                        )
                      }
                      className="text-blue-300 hover:text-blue-100"
                    >
                      {expandedType === item.tipo ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <ClipboardList
                        className="text-green-400 mr-2"
                        size={20}
                      />
                      <span className="text-white">
                        Sessões: <strong>{item.sessionCount}</strong>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ClipboardList
                        className="text-green-400 mr-2"
                        size={20}
                      />
                      <span className="text-white">
                        Exercícios: <strong>{item.exerciseCount}</strong>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="text-green-400 mr-2" size={20} />
                      <span className="text-white">
                        Volume Total: <strong>{item.totalVolume}</strong>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Zap
                        className={`mr-2 ${intensityLevel.color}`}
                        size={20}
                      />
                      <span className="text-white">
                        Intensidade: <strong>{intensityLevel.label}</strong>
                      </span>
                    </div>

                    {expandedType === item.tipo && (
                      <div className="mt-4">
                        <h4 className="text-blue-200 mb-3 font-semibold">
                          Subgrupos Musculares
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          {Object.entries(item.muscleGroups).map(
                            ([muscle, count]) => {
                              const isSelected =
                                !!item.selectedMuscleGroups[muscle];
                              return (
                                <div
                                  key={muscle}
                                  className={`px-4 py-3 rounded-xl text-sm ${
                                    isSelected
                                      ? "bg-green-600 text-white"
                                      : "bg-blue-900 text-blue-200"
                                  } flex items-center justify-between transition-colors min-w-[180px] w-full`}
                                >
                                  <div className="flex items-center flex-grow mr-3">
                                    <span className="truncate">{muscle}</span>
                                    {isSelected && (
                                      <Check
                                        size={16}
                                        className="ml-2 flex-shrink-0"
                                      />
                                    )}
                                  </div>
                                  <span className="font-medium">
                                    {isSelected
                                      ? `${item.selectedMuscleGroups[muscle]}/${count}`
                                      : "0"}
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Volume Total por Tipo de Treino */}
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <BicepsFlexedIcon className="text-green-400 mr-2" size={24} />
              <p className="text-lg font-semibold text-blue-100">
                Volume Total por Tipo de Treino
              </p>
            </div>
            <div className="space-y-4">
              {Object.entries(treinoTipoSummary)
                .filter(([_, dados]) => dados.total > 0)
                .sort((a, b) => b[1].total - a[1].total)
                .map(([tipo, dados]) => (
                  <div
                    key={tipo}
                    className="flex justify-between items-center text-white bg-neutral-800 p-4 rounded-xl hover:bg-neutral-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <Trophy className="mr-3 text-yellow-400" size={20} />
                      <span>{tipo}</span>
                    </div>
                    <strong>{Math.round(dados.total)}</strong>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreinoTipoSumario;
