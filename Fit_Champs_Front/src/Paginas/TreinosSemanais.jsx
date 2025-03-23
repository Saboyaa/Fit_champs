import React from "react";
import { useState, useEffect } from "react";
import Tasks from "../Components/Tasks";
import { useGlobalContext } from "../Context/ContextoGlobal";
import { useExercicios } from "../Context/ExerciciosContext";
import { useNavigate } from "react-router-dom";

function TreinosSemanais() {
  const { isMenuOpen } = useGlobalContext();
  const { adicionarTreinos } = useExercicios();
  const navigate = useNavigate();
  const [tasksList, setTasksList] = useState([]);

  const getWeekRange = () => {
    const currentDate = new Date();
    const startOfWeek = currentDate.getDate() - currentDate.getDay(); // Domingo
    const endOfWeek = startOfWeek + 6; // Sábado

    const start = new Date(currentDate.setDate(startOfWeek));
    const end = new Date(currentDate.setDate(endOfWeek));

    return {
      start: start.toLocaleDateString(),
      end: end.toLocaleDateString(),
    };
  };

  const [weekRange, setWeekRange] = useState(getWeekRange()); // Estado para armazenar o intervalo da semana

  useEffect(() => {
    // Atualiza o intervalo da semana sempre que o componente for renderizado
    setWeekRange(getWeekRange());
  }, []);

  // Função para enviar os treinos para a Lista de Exercícios
  const enviarParaListaExercicios = () => {
    if (tasksList.length === 0) {
      alert("Adicione pelo menos um treino antes de continuar");
      return;
    }

    // Salvar os treinos no contexto
    adicionarTreinos(tasksList);

    // Navegar para a página de lista de exercícios
    navigate("/ListadeExercicios");
  };

  // Recebe as tasks atualizadas do componente Tasks
  const atualizarTasks = (tasks) => {
    setTasksList(tasks);
  };

  return (
    <div className="w-screen h-screen bg-neutral-800 flex justify-center p-6">
      <div
        className={`rounded-md mt-10 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        <div className="bg-sky-950 p-8 rounded-md mb-6">
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            <span className="ml-4 text-3xl text-white gap-2">
              Treinos Semanais ({weekRange.start} - {weekRange.end})
            </span>
          </h1>
          <p className="text-blue-100 text-semibold text-center p-1">
            Adicione seus dias de treino dessa semana!
          </p>
        </div>
        <Tasks initialTasks={[]} onTasksUpdate={atualizarTasks} />

        <div className="mt-6 flex justify-center">
          <button
            onClick={enviarParaListaExercicios}
            className="bg-sky-950 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-md shadow-lg transition-all duration-300"
          >
            Continuar para Seleção de Exercícios
          </button>
        </div>
      </div>
    </div>
  );
}
export default TreinosSemanais;
