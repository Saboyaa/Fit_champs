import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FormButtons = ({ onSubmit, isLoading = false }) => {
  return (
    <div className="flex justify-between items-center mt-8">
      <Link
        to="/"
        className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-3 px-6 rounded-xl flex items-center gap-2 hover:from-slate-600 hover:to-slate-700 transition-colors shadow-md transform hover:scale-105"
      >
        <ArrowLeft size={18} />
        <span>Voltar para Login</span>
      </Link>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-colors shadow-lg transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </div>
  );
};

export default FormButtons;
