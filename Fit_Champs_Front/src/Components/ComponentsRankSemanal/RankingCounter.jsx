import React from "react";

const RankingCounter = ({ count }) => {
  return (
    <div className="fixed bottom-4 right-4">
      <div className="bg-sky-700 text-white p-2 rounded-full shadow-lg">
        <span className="px-2 font-bold">{count}</span>
        <span className="text-sm">Rankings</span>
      </div>
    </div>
  );
};

export default RankingCounter;
