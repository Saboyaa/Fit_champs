import React from "react";
import RankingPositionCard from "./RankingPositionCard";

const UserProfileSummary = ({
  userData,
  activeTab,
  setActiveTab,
  renderCategoryIcon,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-blue-100 mb-3">
        Sua Posição Atual
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
