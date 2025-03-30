import React from "react";

const CategoryTabs = ({
  categories,
  activeTab,
  setActiveTab,
  renderCategoryIcon,
}) => {
  return (
    <div className="flex flex-wrap justify-center mb-6 gap-2">
      {categories.map((category) => (
        <button
          key={category}
          className={`py-2.5 px-4 rounded-lg flex items-center transition-all ${
            activeTab === category
              ? "bg-sky-700 text-white shadow-md"
              : "bg-sky-800/50 text-white hover:bg-sky-700/50"
          }`}
          onClick={() => setActiveTab(category)}
        >
          {renderCategoryIcon(category)}
          <span className="ml-2">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
