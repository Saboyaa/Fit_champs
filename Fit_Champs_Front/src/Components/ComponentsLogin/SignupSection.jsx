import React from "react";
import { NavLink } from "react-router-dom";

const SignupSection = () => {
  return (
    <div className="gap-4 mt-6">
      <div className="text-center p-4 border border-sky-800 rounded-lg bg-sky-900/20">
        <p className="text-blue-200 mb-2">Novo por aqui?</p>
        <NavLink
          to="/Cadastro"
          className="block w-full bg-sky-900 hover:bg-sky-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Criar conta
        </NavLink>
      </div>
    </div>
  );
};

export default SignupSection;
