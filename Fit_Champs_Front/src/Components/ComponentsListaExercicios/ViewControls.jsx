import React from "react";
import { Filter, BarChart2 } from "lucide-react";

const ViewControls = ({ activeView, setActiveView, hasExercicios }) => {
  if (!hasExercicios) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6 w-full md:w-[90%] mx-auto">
      <div className="bg-slate-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg flex space-x-2 border border-slate-700">
        <button
          onClick={() => setActiveView("list")}
          className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
            activeView === "list"
              ? "bg-gradient-to-r from-indigo-700 to-blue-800 text-white shadow-md"
              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
          }`}
        >
          <Filter size={16} className="mr-2" />
          <span>Lista de Exercícios</span>
        </button>
        <button
          onClick={() => setActiveView("summary")}
          className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
            activeView === "summary"
              ? "bg-gradient-to-r from-indigo-700 to-blue-800 text-white shadow-md"
              : "bg-slate-700 hover:bg-slate-600 text-slate-200"
          }`}
        >
          <BarChart2 size={16} className="mr-2" />
          <span>Resumo Semanal</span>
        </button>
      </div>
    </div>
  );
};

export default ViewControls;
