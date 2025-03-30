import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="p-8 flex justify-center items-center">
      <div className="w-5 h-5 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3 text-blue-200">Carregando...</span>
    </div>
  );
};

export default LoadingIndicator;
