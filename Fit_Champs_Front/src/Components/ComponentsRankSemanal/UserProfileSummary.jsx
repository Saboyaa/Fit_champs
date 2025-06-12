import RankingPositionCard from "./RankingPositionCard";

const UserProfileSummary = ({
  userRanking,
  activeTab,
  setActiveTab,
  renderCategoryIcon,
}) => {
  return (
    <div className="mt-6  p-4 rounded-lg mx-auto max-w-4xl mb-7">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.keys(userRanking).map((category) => (
          <RankingPositionCard
            key={category}
            category={category}
            data={userRanking[category]}
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
