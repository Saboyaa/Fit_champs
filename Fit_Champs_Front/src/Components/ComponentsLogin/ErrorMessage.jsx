import React from "react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
      <p className="text-red-200 text-sm text-center">{error}</p>
    </div>
  );
};

export default ErrorMessage;
