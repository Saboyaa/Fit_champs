import React from "react";
import { Trophy } from "lucide-react";

const RankingTableHeader = ({ activeTab, activeSexo, activeFaixaEtaria }) => {
  return (
    <div className="p-4 bg-sky-800 border-b border-sky-700 flex items-center justify-between">
      <h2 className="text-xl font-bold flex items-center text-white">
        <Trophy className="mr-2 text-yellow-500" size={20} />
        <span className="ml-2">
          Ranking {activeTab} - {activeSexo} ({activeFaixaEtaria})
        </span>
      </h2>
      <div className="text-sm bg-sky-700 px-3 py-1 rounded-full text-blue-100">
        Top 5 Atletas
      </div>
    </div>
  );
};

export default RankingTableHeader;
