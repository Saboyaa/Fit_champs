import React from "react";
import { Save, Check } from "lucide-react";

const SaveButton = ({ salvarTreino, isSaving, saveSuccess }) => {
  return (
    <div className="sticky bottom-6 flex justify-center">
      <button
        onClick={salvarTreino}
        disabled={isSaving}
        className={`py-3 px-8 rounded-xl shadow-xl flex items-center gap-2 font-bold text-white transition-all duration-300 transform hover:scale-105 ${
          saveSuccess
            ? "bg-gradient-to-r from-green-600 to-emerald-700"
            : "bg-gradient-to-r from-blue-600 to-indigo-800 hover:from-blue-700 hover:to-indigo-900"
        }`}
      >
        {isSaving ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Salvando...</span>
          </>
        ) : saveSuccess ? (
          <>
            <Check size={20} />
            <span>Treino Salvo!</span>
          </>
        ) : (
          <>
            <Save size={20} />
            <span>Salvar Treino Completo</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SaveButton;
