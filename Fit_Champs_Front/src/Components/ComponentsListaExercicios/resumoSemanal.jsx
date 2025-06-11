import { useMemo, useState, useEffect } from "react";
import {
  TrendingUp,
  ClipboardList,
  BicepsFlexedIcon,
  Target,
  Trophy,
  Zap,
  ChevronDown,
  ChevronUp,
  BarChart2,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getWeekRange,
  changeWeek,
  isDateInWeekRange,
} from "../../Hooks/getWeek";
import trainingService from "../../services/trainingService";

const TreinoTipoSumario = ({
  exerciciosPorTreino,
  treinos,
  exerciciosPorTipo,
}) => {
  const [expandedType, setExpandedType] = useState(null);
  const [weekRange, setWeekRange] = useState(getWeekRange());
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [historicoTreinos, setHistoricoTreinos] = useState([]);

  useEffect(() => {
    setWeekRange(getWeekRange());
  }, []);

  useEffect(() => {
    const fetchHistoricoTreinos = async () => {
      try {
        setLoading(true);
        const data = await trainingService.getUserTrainings();
        setHistoricoTreinos(data || []);
      } catch (error) {
        console.error("Erro ao buscar histórico de treinos:", error);
        setHistoricoTreinos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricoTreinos();
  }, []);

  const handleChangeWeek = (offset) => {
    changeWeek(currentWeekOffset, offset, setCurrentWeekOffset, setWeekRange);
  };

  // Função para padronizar TODAS as datas para formato DD/MM/YYYY
  const padronizarData = (data) => {
    if (!data) return null;

    try {
      // Formato YYYY-MM-DD (do histórico)
      if (
        data.includes("-") &&
        data.length === 10 &&
        data.split("-")[0].length === 4
      ) {
        const [year, month, day] = data.split("-");
        return `${day}/${month}/${year}`;
      }

      // Formato DD-MM-YY (dos treinos planejados)
      if (
        data.includes("-") &&
        data.length === 8 &&
        data.split("-")[2].length === 2
      ) {
        const [day, month, year] = data.split("-");
        const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
        return `${day}/${month}/${fullYear}`;
      }

      // Formato DD/MM/YYYY (já padronizado)
      if (data.includes("/") && data.split("/").length === 3) {
        const parts = data.split("/");
        if (parts[2].length === 4) {
          return data;
        }
        // DD/MM/YY
        if (parts[2].length === 2) {
          const [day, month, year] = parts;
          const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
          return `${day}/${month}/${fullYear}`;
        }
      }

      return null;
    } catch (error) {
      console.error(`Erro ao padronizar data "${data}":`, error);
      return null;
    }
  };

  // Função para obter todos os subgrupos possíveis para um tipo de treino
  const getTodosSubgruposPorTipo = (tipoTreino) => {
    const exercicios = exerciciosPorTipo[tipoTreino] || [];
    const subgruposSet = new Set();

    exercicios.forEach((ex) => {
      if (ex.subgrupo) {
        subgruposSet.add(ex.subgrupo);
      }
    });

    return Array.from(subgruposSet);
  };

  // Função para encontrar exercício por ID - COM CONVERSÃO DE TIPOS
  const encontrarExercicioPorId = (exerciseId) => {
    console.log(
      "🔍 Buscando exercício com ID:",
      exerciseId,
      "tipo:",
      typeof exerciseId
    );

    if (!exerciseId || !exerciciosPorTipo) {
      console.log("❌ ID inválido ou exerciciosPorTipo não disponível");
      return {
        nome: "Exercício Desconhecido",
        subgrupo: "Geral",
      };
    }

    // Converter para number para garantir comparação correta
    const exerciseIdNumber = parseInt(exerciseId);
    console.log("🔄 ID convertido para number:", exerciseIdNumber);

    // Debug: mostrar estrutura do exerciciosPorTipo
    console.log(
      "📊 Estrutura exerciciosPorTipo:",
      Object.keys(exerciciosPorTipo)
    );

    for (const [tipoTreino, exercicios] of Object.entries(exerciciosPorTipo)) {
      console.log(
        `🔍 Verificando ${tipoTreino} com ${exercicios.length} exercícios`
      );

      // Debug: mostrar alguns IDs para comparação
      if (exercicios.length > 0) {
        console.log(
          `   Primeiros IDs em ${tipoTreino}:`,
          exercicios.slice(0, 3).map((ex) => `${ex.id} (${typeof ex.id})`)
        );
      }

      const exercicioEncontrado = exercicios.find((ex) => {
        // Tentar múltiplas comparações
        const match1 = ex.id === exerciseIdNumber;
        const match2 = ex.id === exerciseId;
        const match3 = parseInt(ex.id) === exerciseIdNumber;

        if (match1 || match2 || match3) {
          console.log(`✅ MATCH encontrado!`);
          console.log(`   ex.id: ${ex.id} (${typeof ex.id})`);
          console.log(`   exerciseId: ${exerciseId} (${typeof exerciseId})`);
          console.log(
            `   exerciseIdNumber: ${exerciseIdNumber} (${typeof exerciseIdNumber})`
          );
          console.log(`   match1 (ex.id === exerciseIdNumber): ${match1}`);
          console.log(`   match2 (ex.id === exerciseId): ${match2}`);
          console.log(
            `   match3 (parseInt(ex.id) === exerciseIdNumber): ${match3}`
          );
        }

        return match1 || match2 || match3;
      });

      if (exercicioEncontrado) {
        console.log("✅ Exercício encontrado:", exercicioEncontrado);
        return {
          nome: exercicioEncontrado.nome,
          subgrupo: exercicioEncontrado.subgrupo,
        };
      }
    }

    console.log("❌ Exercício não encontrado para ID:", exerciseId);
    console.log("❌ Todos os IDs disponíveis:");
    for (const [tipoTreino, exercicios] of Object.entries(exerciciosPorTipo)) {
      console.log(
        `   ${tipoTreino}:`,
        exercicios.map((ex) => `${ex.id}(${typeof ex.id})`)
      );
    }

    return {
      nome: "Exercício Desconhecido",
      subgrupo: "Geral",
    };
  };

  // Função para verificar se um treino está na semana selecionada
  const isTreinoInSelectedWeek = (treinoData) => {
    if (!treinoData) return false;

    // Padronizar a data do treino
    const dataPadronizada = padronizarData(treinoData);
    if (!dataPadronizada) {
      return false;
    }

    try {
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day).getTime();
      };

      const dataTimestamp = parseDate(dataPadronizada);
      const inicioTimestamp = parseDate(weekRange.start);
      const fimTimestamp = parseDate(weekRange.end);

      return dataTimestamp >= inicioTimestamp && dataTimestamp <= fimTimestamp;
    } catch (error) {
      console.error("Erro ao verificar data do treino:", error);
      return false;
    }
  };

  const treinoTipoSummary = useMemo(() => {
    const summary = {};

    // Função para inicializar um tipo de treino no summary
    const initializeTreinoType = (tipoTreino) => {
      if (!summary[tipoTreino]) {
        summary[tipoTreino] = {
          total: 0,
          exercicios: [],
          volumePorDia: {},
          sessionCount: 0,
          muscleGroups: {},
          selectedMuscleGroups: {},
        };

        const todosSubgrupos = getTodosSubgruposPorTipo(tipoTreino);
        todosSubgrupos.forEach((subgrupo) => {
          summary[tipoTreino].muscleGroups[subgrupo] = 0;
        });
      }
    };

    // ✅ PROCESSAR TREINOS ATUAIS (em planejamento)
    const treinosDaSemana = treinos.filter((treino) =>
      isTreinoInSelectedWeek(treino.data)
    );

    treinosDaSemana.forEach((treino) => {
      if (treino.descripition === "Day Off") return;

      const tipoTreino = treino.descripition;
      initializeTreinoType(tipoTreino);

      const exercises = exerciciosPorTreino[treino.id] || [];

      if (exercises.length > 0) {
        summary[tipoTreino].sessionCount += 1;

        const dailyVolume = exercises.reduce(
          (total, ex) => total + (ex.volume || 0),
          0
        );
        summary[tipoTreino].total += dailyVolume;
        summary[tipoTreino].volumePorDia[treino.data] = dailyVolume;
        summary[tipoTreino].exercicios.push(...exercises);

        exercises.forEach((ex) => {
          if (ex.subgrupo) {
            summary[tipoTreino].muscleGroups[ex.subgrupo] =
              (summary[tipoTreino].muscleGroups[ex.subgrupo] || 0) + 1;

            if (ex.nome) {
              summary[tipoTreino].selectedMuscleGroups[ex.subgrupo] =
                (summary[tipoTreino].selectedMuscleGroups[ex.subgrupo] || 0) +
                1;
            }
          }
        });
      }
    });

    // ✅ PROCESSAR TREINOS DO HISTÓRICO
    if (!loading && historicoTreinos.length > 0) {
      const histTreinosDaSemana = historicoTreinos.filter((treino) =>
        isTreinoInSelectedWeek(treino.data)
      );

      histTreinosDaSemana.forEach((treino) => {
        const tipoTreino = `Treino de ${treino.nome}`;
        initializeTreinoType(tipoTreino);

        summary[tipoTreino].sessionCount += 1;

        const dailyVolume = trainingService.calculateTotalVolume(
          treino.exercicios
        );
        summary[tipoTreino].total += dailyVolume;

        // Usar data formatada para consistência
        const dataFormatada = trainingService.formatDateForChart(treino.data);
        summary[tipoTreino].volumePorDia[dataFormatada] =
          (summary[tipoTreino].volumePorDia[dataFormatada] || 0) + dailyVolume;

        // Processar exercícios do histórico
        treino.exercicios.forEach((ex, index) => {
          console.log(
            `🏋️ Processando exercício ${index + 1} do histórico:`,
            ex
          );

          let exercicioInfo = { nome: "Exercício", subgrupo: "Geral" };

          // Tentar encontrar informações do exercício
          if (ex.exerciseId) {
            console.log(`🔍 Buscando info para exerciseId: ${ex.exerciseId}`);
            exercicioInfo = encontrarExercicioPorId(ex.exerciseId);
            console.log(`📊 Info encontrada:`, exercicioInfo);
          } else {
            console.log("❌ exerciseId não encontrado no exercício:", ex);
          }

          const exercicioHistorico = {
            id: `hist-${treino.id}-${index}`,
            nome: exercicioInfo.nome,
            subgrupo: exercicioInfo.subgrupo,
            repeticoes: ex.series || "N/A",
            peso: ex.peso || 0,
            volume: trainingService.calculateTotalVolume([ex]),
          };

          summary[tipoTreino].exercicios.push(exercicioHistorico);

          // Atualizar contadores de subgrupos
          if (exercicioInfo.subgrupo) {
            summary[tipoTreino].muscleGroups[exercicioInfo.subgrupo] =
              (summary[tipoTreino].muscleGroups[exercicioInfo.subgrupo] || 0) +
              1;
            summary[tipoTreino].selectedMuscleGroups[exercicioInfo.subgrupo] =
              (summary[tipoTreino].selectedMuscleGroups[
                exercicioInfo.subgrupo
              ] || 0) + 1;
          }
        });
      });
    }

    return summary;
  }, [
    exerciciosPorTreino,
    treinos,
    historicoTreinos,
    weekRange,
    exerciciosPorTipo,
    loading,
  ]);

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
    .filter((item) => item.sessionCount > 0 && item.totalVolume > 0);

  const getIntensityLevel = (averageVolume) => {
    if (averageVolume < 3000) return { label: "Leve", color: "text-green-400" };
    if (averageVolume < 5000)
      return { label: "Moderado", color: "text-yellow-400" };
    return { label: "Intenso", color: "text-red-400" };
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-2xl p-8 mt-6 shadow-2xl hover:shadow-3xl transition-all duration-300 w-full border border-indigo-500/30 backdrop-blur-sm">
      <div className="flex items-center justify-center mb-6">
        <BarChart2 className="text-blue-400 mr-3" size={32} />
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-100 to-blue-400 bg-clip-text text-transparent">
          Resumo dos Meus Treinos
        </h1>
      </div>

      {/* Seletor de Semana */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={() => handleChangeWeek(-1)}
          className="bg-sky-800 hover:bg-sky-700 p-3 rounded-full text-white shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Semana anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="bg-gradient-to-r from-sky-800 to-indigo-800 px-6 py-3 rounded-lg shadow-lg border border-sky-700/50 flex items-center gap-2">
          <Calendar className="text-blue-200" size={20} />
          <p className="text-blue-100 text-center font-medium">
            {weekRange.start} - {weekRange.end}
          </p>
        </div>

        <button
          onClick={() => handleChangeWeek(1)}
          className={`bg-sky-800 hover:bg-sky-700 p-3 rounded-full text-white shadow-lg transition-all duration-300 transform hover:scale-110 ${
            currentWeekOffset === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentWeekOffset === 0}
          aria-label="Próxima semana"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {Object.keys(treinoTipoSummary).length > 0 ? (
        <div className="mt-6 space-y-8 max-w-1xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {detalhamentoTipos.map((item) => {
              const intensityLevel = getIntensityLevel(item.averageVolume);

              return (
                <div
                  key={item.tipo}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 group border border-indigo-500/20 hover:border-indigo-500/40"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300">
                      {item.tipo}
                    </h3>
                    <button
                      onClick={() =>
                        setExpandedType(
                          expandedType === item.tipo ? null : item.tipo
                        )
                      }
                      className="text-blue-300 hover:text-blue-100 bg-slate-700/50 p-2 rounded-full transition-colors"
                    >
                      {expandedType === item.tipo ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                      <ClipboardList
                        className="text-green-400 mr-3"
                        size={20}
                      />
                      <span className="text-white">
                        Sessões: <strong>{item.sessionCount}</strong>
                      </span>
                    </div>
                    <div className="flex items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                      <ClipboardList
                        className="text-green-400 mr-3"
                        size={20}
                      />
                      <span className="text-white">
                        Exercícios: <strong>{item.exerciseCount}</strong>
                      </span>
                    </div>
                    <div className="flex items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                      <TrendingUp className="text-green-400 mr-3" size={20} />
                      <span className="text-white">
                        Volume Total: <strong>{item.totalVolume}</strong>
                      </span>
                    </div>
                    <div className="flex items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                      <Zap
                        className={`mr-3 ${intensityLevel.color}`}
                        size={20}
                      />
                      <span className="text-white">
                        Intensidade: <strong>{intensityLevel.label}</strong>
                      </span>
                    </div>

                    {expandedType === item.tipo && (
                      <div className="mt-4 bg-indigo-900/20 p-4 rounded-xl border border-indigo-800/30">
                        <h4 className="text-blue-200 mb-4 font-semibold flex items-center">
                          <Target className="mr-2 text-blue-300" size={18} />
                          Subgrupos Musculares Trabalhados:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          {Object.entries(item.muscleGroups).map(
                            ([muscle, count]) => {
                              const isSelected =
                                !!item.selectedMuscleGroups[muscle];
                              return (
                                <div
                                  key={muscle}
                                  className={`px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                                    isSelected
                                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                                      : "bg-gradient-to-r from-slate-700 to-indigo-900/50 text-blue-200"
                                  } flex items-center justify-between min-w-[180px] w-full`}
                                >
                                  <div className="flex items-center flex-grow mr-3">
                                    <span className="truncate">{muscle}</span>
                                  </div>
                                  <span className="font-medium bg-slate-800/50 px-2 py-1 rounded-lg">
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
          <div className="bg-gradient-to-br from-slate-800 to-indigo-900/30 rounded-xl p-6 shadow-lg border border-indigo-500/20">
            <div className="flex items-center mb-5">
              <BicepsFlexedIcon className="text-blue-400 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-white">
                Volume Total por Tipo de Treino
              </h2>
            </div>
            <div className="space-y-4">
              {Object.entries(treinoTipoSummary)
                .filter(([_, dados]) => dados.total > 0)
                .sort((a, b) => b[1].total - a[1].total)
                .map(([tipo, dados], index) => (
                  <div
                    key={tipo}
                    className="flex justify-between items-center text-white bg-slate-800/70 p-4 rounded-xl hover:bg-slate-700/70 border border-slate-700/30 transform hover:scale-[1.01] transition-transform"
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          index === 0
                            ? "bg-yellow-500/20"
                            : index === 1
                            ? "bg-slate-400/20"
                            : index === 2
                            ? "bg-amber-700/20"
                            : "bg-slate-600/20"
                        } mr-3`}
                      >
                        {index < 3 ? (
                          <Trophy
                            className={`${
                              index === 0
                                ? "text-yellow-400"
                                : index === 1
                                ? "text-slate-300"
                                : "text-amber-600"
                            }`}
                            size={20}
                          />
                        ) : (
                          <span className="text-sm font-bold text-slate-400">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <span className="font-medium">{tipo}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-indigo-800/50 px-4 py-2 rounded-lg font-bold">
                        {Math.round(dados.total)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800/80 p-8 rounded-xl border border-slate-700/50 text-center">
          <div className="flex flex-col items-center gap-4">
            <Calendar className="text-blue-300" size={48} />
            <p className="text-blue-200 text-lg">
              Nenhum treino encontrado para a semana selecionada.
            </p>
            <p className="text-blue-300 text-sm">
              Selecione uma semana diferente ou adicione treinos para visualizar
              o resumo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreinoTipoSumario;
