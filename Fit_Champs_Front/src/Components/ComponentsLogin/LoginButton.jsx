import React from "react";
import { NavLink } from "react-router-dom";

const LoginButton = ({ loading = false, disabled = false }) => {
  return (
    <div className="pt-2">
      <NavLink to="/Home" className="block w-full">
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
      </NavLink>
    </div>
  );
};

export default LoginButton;
