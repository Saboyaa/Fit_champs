import React from "react";
import PropTypes from "prop-types";

const LoginButton = ({ loading = false, disabled = false }) => {
  return (
    <div className="pt-2">
      <button
        type="submit"
        disabled={loading || disabled}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>ENTRANDO...</span>
          </div>
        ) : (
          "ENTRAR"
        )}
      </button>
    </div>
  );
};

LoginButton.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default LoginButton;
