import React, { useState, useEffect } from "react";
import Tasks from "../Components/Tasks";
import { useGlobalContext } from "../Context/ContextoGlobal";
import { useExercicios } from "../Context/ExerciciosContext";
import { useNavigate } from "react-router-dom";
import { Calendar, Dumbbell, ChevronRight } from "lucide-react";

function TreinosSemanais() {
  const { isMenuOpen } = useGlobalContext();
  const { adicionarTreinos } = useExercicios();
  const navigate = useNavigate();
  const [tasksList, setTasksList] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const [weekRange, setWeekRange] = useState(getWeekRange());
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  useEffect(() => {
    setWeekRange(getWeekRange());
  }, []);

  const enviarParaListaExercicios = () => {
    if (tasksList.length === 0) {
      alert("Adicione pelo menos um treino antes de continuar");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      adicionarTreinos(tasksList);
      navigate("/ListadeExercicios");
    }, 500);
  };

  const atualizarTasks = (tasks) => {
    setTasksList(tasks);
  };

  const changeWeek = (offset) => {
    const newOffset = currentWeekOffset + offset;
    setCurrentWeekOffset(newOffset);

    const currentDate = new Date();
    const startOfCurrentWeek = currentDate.getDate() - currentDate.getDay();
    const newStartDate = new Date(
      currentDate.setDate(startOfCurrentWeek + 7 * newOffset)
    );
    const newEndDate = new Date(
      new Date(newStartDate).setDate(newStartDate.getDate() + 6)
    );

    setWeekRange({
      start: newStartDate.toLocaleDateString(),
      end: newEndDate.toLocaleDateString(),
    });
  };

  return (
    <div className="w-screen h-screen bg-sky-950 flex justify-center p-6 overflow-y-auto">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        <div className="bg-sky-950 p-6 rounded-lg mb-6 shadow-lg">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="text-blue-300 mr-2" size={24} />
            <h1 className="text-3xl text-slate-100 font-bold">
              Treinos Semanais
            </h1>
          </div>

          <div className="flex items-center justify-center gap-4 my-3">
            <button
              onClick={() => changeWeek(-1)}
              className="bg-sky-900 hover:bg-sky-800 p-2 rounded-full text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="bg-sky-900 px-4 py-2 rounded-lg">
              <p className="text-blue-100 text-center">
                {weekRange.start} - {weekRange.end}
              </p>
            </div>

            <button
              onClick={() => changeWeek(1)}
              className="bg-sky-900 hover:bg-sky-800 p-2 rounded-full text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="bg-sky-900/50 p-3 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <Dumbbell className="text-blue-300" size={20} />
              <p className="text-blue-100 font-medium">
                Adicione seus dias de treino dessa semana!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-lg p-6 shadow-lg mb-6">
          <Tasks initialTasks={[]} onTasksUpdate={atualizarTasks} />
        </div>

        <div className="sticky bottom-6 mt-4 flex justify-center">
          <button
            onClick={enviarParaListaExercicios}
            disabled={loading}
            className="bg-sky-700 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
                <span>Processando...</span>
              </>
            ) : (
              <>
                <span>Continuar para Seleção de Exercícios</span>
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </div>

        {tasksList.length > 0 && (
          <div className="fixed bottom-4 right-4">
            <div className="bg-sky-800 text-white p-2 rounded-full shadow-lg">
              <span className="px-2 font-bold">{tasksList.length}</span>
              <span className="text-sm">treinos</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TreinosSemanais;
