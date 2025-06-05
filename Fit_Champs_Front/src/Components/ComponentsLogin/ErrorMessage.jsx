import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
      <p className="text-red-200 text-sm text-center">{error}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

export default ErrorMessage;
