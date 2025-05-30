import React from "react";
import { NavLink } from "react-router-dom";

const LoginOptions = ({ rememberMe, setRememberMe }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="remember"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded"
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-blue-200">
          Lembrar-me
        </label>
      </div>
      <div>
        <button className="text-sm text-blue-400 hover:text-blue-200">
          <NavLink to="/ForgotPassword">Esqueci a senha</NavLink>
        </button>
      </div>
    </div>
  );
};

export default LoginOptions;
