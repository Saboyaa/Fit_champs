import React from "react";
import { Trophy } from "lucide-react";
import RankingPositionCard from "./RankingPositionCard";

const UserProfileSummary = ({
  userData,
  activeTab,
  setActiveTab,
  renderCategoryIcon,
}) => {
  return (
    <div className="mt-6 bg-sky-800/50 p-4 rounded-lg mx-auto max-w-4xl">
      <h2 className="text-xl font-semibold text-white mb-3 flex items-center justify-center">
        <Trophy className="text-yellow-400 mr-2" size={22} />
        <span>Sua Posição Atual</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.keys(userData).map((category) => (
          <RankingPositionCard
            key={category}
            category={category}
            data={userData[category]}
            isActive={activeTab === category}
            onClick={() => setActiveTab(category)}
            renderCategoryIcon={renderCategoryIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfileSummary;
