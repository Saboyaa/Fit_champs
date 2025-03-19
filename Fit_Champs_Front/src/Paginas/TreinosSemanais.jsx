import React from "react";
import { useState, useEffect } from "react";
import Tasks from "../Components/Tasks";
import { useGlobalContext } from "../Context/ContextoGlobal";

function TreinosSemanais() {
  const { isMenuOpen } = useGlobalContext();
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

  return (
    <div className="w-screen h-screen bg-neutral-800 flex justify-center p-6">
      <div
        className={`rounded-md mt-10 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64" : "w-full"
        }`}
      >
        <div className="bg-orange-400 p-8 rounded-md mb-6">
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            <span className="ml-4 text-3xl text-white gap-2">
              Treinos Semanais ({weekRange.start} - {weekRange.end})
            </span>
          </h1>
          <p className="text-blue-100 text-semibold text-center p-1">
            Adicione seus dias de treino dessa semana!
          </p>
        </div>
        <Tasks />
      </div>
    </div>
  );
}
export default TreinosSemanais;
