import React from "react";
import { Trophy } from "lucide-react";

const RankingHeader = () => {
  return (
    <div className="text-center bg-sky-900 p-6 rounded-xl w-full md:w-[90%] lg:w-[80%] mx-auto mb-6 shadow-lg">
      <div className="flex items-center justify-center mb-3">
        <Trophy className="text-yellow-400 mr-3" size={28} />
        <h1 className="text-3xl font-bold text-white">Ranking Semanal</h1>
      </div>

      <p className="text-blue-200 mb-4">
        Veja como você se compara com outros atletas esta semana!
      </p>
    </div>
  );
};

export default RankingHeader;
