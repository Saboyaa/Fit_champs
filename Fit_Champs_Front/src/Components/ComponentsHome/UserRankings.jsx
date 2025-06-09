import { LucideMedal, TrendingUp } from "lucide-react";
import { getGroupIcon } from "./IconUtils";
import { useNavigate } from "react-router-dom";

const UserRankings = ({ userData }) => {
  const navigate = useNavigate();

  // Navegar para a página de ranking
  const goToRankings = () => {
    navigate("/Rank");
  };

  return (
    <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 text-white border-b border-slate-700 pb-2 flex items-center justify-between">
        <div className="flex items-center">
          <LucideMedal className="mr-2 text-yellow-400" size={20} />
          Posições no Ranking
        </div>
        <button
          onClick={goToRankings}
          className="text-blue-300 hover:text-blue-100 text-sm flex items-center gap-1 transition-colors bg-slate-800 px-3 py-1 rounded-lg hover:bg-slate-700"
        >
          <TrendingUp size={14} />
          <span>Ver todos</span>
        </button>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(userData.recordes).map(([key, value]) => (
          <div
            key={key}
            className="relative p-4 bg-slate-800 rounded-lg border border-slate-700 hover:shadow-md transition-shadow hover:border-blue-600/50"
          >
            <div className="flex items-center gap-3">
              <div className="bg-slate-700 p-2 rounded-lg">
                {getGroupIcon(key)}
              </div>
              <div>
                <p className="text-white">
                  <span className="text-yellow-400 font-bold text-xl mr-1">
                    {value}°
                  </span>
                  <span className="font-medium text-white">{key}</span>
                </p>
                <span className="text-xs text-blue-300">Categoria: {key}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRankings;
