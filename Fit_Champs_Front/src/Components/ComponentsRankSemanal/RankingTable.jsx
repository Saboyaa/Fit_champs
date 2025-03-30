import React from "react";
import RankingTableHeader from "./RankingTableHeader";
import RankingTableRow from "./RankingTableRow";
import LoadingIndicator from "./LoadingIndicator";

const RankingTable = ({
  activeTab,
  activeSexo,
  activeFaixaEtaria,
  rankingData,
  isLoading,
  currentUserId,
}) => {
  return (
    <div className="bg-sky-900/50 rounded-lg shadow-lg overflow-hidden w-full md:w-[90%] lg:w-[80%] mx-auto border border-sky-800">
      <RankingTableHeader
        activeTab={activeTab}
        activeSexo={activeSexo}
        activeFaixaEtaria={activeFaixaEtaria}
      />

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sky-800/70">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Posição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Atleta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Pontos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                  Variação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-800/30">
              {rankingData[activeTab] &&
                rankingData[activeTab].map((user, index) => (
                  <RankingTableRow
                    key={user.id}
                    user={user}
                    index={index}
                    isCurrentUser={user.id === currentUserId}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="p-4 border-t border-sky-800/50 bg-sky-800/30">
        <p className="text-xs text-blue-200 text-center">
          A pontuação é calculada com base no volume de treino, intensidade e
          frequência semanal.
        </p>
      </div>
    </div>
  );
};

export default RankingTable;
