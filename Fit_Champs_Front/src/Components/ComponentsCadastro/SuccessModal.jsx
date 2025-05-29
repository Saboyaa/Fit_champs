import React from "react";
import { CheckCircle, RefreshCw } from "lucide-react";

const SuccessModal = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-gradient-to-br from-slate-800/90 to-indigo-900/20 backdrop-blur-sm rounded-xl shadow-xl p-8 w-full max-w-md text-center border border-indigo-500/20">
        <div className="bg-green-900/30 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-green-500/30">
          <CheckCircle className="text-green-400" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          Cadastro Realizado!
        </h2>
        <p className="text-slate-300 mb-6">
          Sua conta foi criada com sucesso. Você será redirecionado para a
          página inicial.
        </p>
        <div className="flex items-center justify-center gap-2 text-blue-300">
          <RefreshCw className="animate-spin" size={16} />
          <span>Redirecionando...</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
