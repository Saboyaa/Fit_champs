import {
  LucideArrowBigLeftDash,
  LucideBicepsFlexed,
  LucideCalendarDays,
  LucideChartLine,
  LucideHome,
  Menu,
  TrophyIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../Context/ContextoGlobal"; // Importa o contexto global

function BarraMenu() {
  const { isMenuOpen, setIsMenuOpen } = useGlobalContext(); // Usa o contexto

  return (
    <div className="relative h-screen">
      {/* Botão só aparece quando o menu está fechado */}
      {!isMenuOpen && (
        <button
          className="fixed top-1 left-4 p-2 bg-neutral-800 text-white rounded-lg z-50"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-orange-400 text-white font-bold p-5 transform ${
          isMenuOpen ? "translate-x-0 " : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <nav className="mt-4">
          <ul className="space-y-3 mt-12">
            <li className="hover:opacity-80 hover:bg-neutral-800 p-2 rounded-lg cursor-pointer">
              <NavLink to="/Home" className="text-white flex gap-2">
                Home <LucideHome size={16} className="mt-1" />
              </NavLink>
            </li>
            <li className="hover:opacity-80 hover:bg-neutral-800 p-2 rounded-lg cursor-pointer">
              <NavLink to="/TreinosSemanais" className="text-white flex gap-2">
                Treinos da Semana{" "}
                <LucideCalendarDays size={16} className="mt-1" />
              </NavLink>
            </li>
            <li className="hover:opacity-80 hover:bg-neutral-800 p-2 rounded-lg cursor-pointer">
              <NavLink
                to="/ListadeExercicios"
                className="text-white flex gap-2"
              >
                Lista de Exercícios{" "}
                <LucideBicepsFlexed size={16} className="mt-1" />
              </NavLink>
            </li>
            <li className="hover:opacity-80 hover:bg-neutral-800 p-2 rounded-lg cursor-pointer">
              <NavLink
                to="/GraficodeEvolucao"
                className="text-white flex gap-2"
              >
                Gráficos de evolução{" "}
                <LucideChartLine size={16} className="mt-1" />
              </NavLink>
            </li>
            <li className="hover:opacity-80 hover:bg-neutral-800 p-2 rounded-lg cursor-pointer">
              <NavLink to="/Rank" className="text-white flex gap-2">
                Rank Semanal <TrophyIcon size={16} className="mt-1" />
              </NavLink>
            </li>

            <div className="mt-10">
              <button
                className="absolute text-white mt-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <LucideArrowBigLeftDash size={20} />
              </button>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default BarraMenu;
