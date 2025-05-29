import { useState, useEffect } from "react";
import { encontrarExercicio } from "../Classes/exercicio";

export const useExerciseLogic = (treinos) => {
  const [exerciciosPorTreino, setExerciciosPorTreino] = useState({});
  const [expandedTreino, setExpandedTreino] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
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
        subgrupo: "",
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
      subgrupo: "",
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
        const treinoAtual = treinos.find((t) => t.id === treinoId);
        if (treinoAtual) {
          const tipoTreino = treinoAtual.descripition;
          const exercicioSelecionado = encontrarExercicio(tipoTreino, valor);

          if (exercicioSelecionado) {
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

            const volume = series * reps * peso;

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

    setTimeout(() => {
      console.log("Treinos salvos:", {
        treinos,
        exerciciosPorTreino,
      });

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

  return {
    exerciciosPorTreino,
    expandedTreino,
    isSaving,
    saveSuccess,
    trainingDateAndVolume,
    inicializarExercicios,
    adicionarExercicio,
    removerExercicio,
    atualizarExercicio,
    toggleExpandTreino,
    salvarTreino,
    calcularTotalPorTreino,
  };
};
