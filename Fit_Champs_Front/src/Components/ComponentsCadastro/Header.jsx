import React from "react";
import icone from "../../images/icone.png";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 rounded-2xl shadow-xl p-6 w-full max-w-4xl mx-auto mb-6 border border-indigo-500/30 backdrop-blur-sm">
      <div className="text-center">
        <div className="flex justify-center items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-100 to-blue-400 bg-clip-text text-transparent">
            Fit Champs
          </h1>
          <img src={icone} alt="icone" className="h-10 w-10" />
        </div>
        <span className="text-blue-200 mt-2 block">
          Melhorando sua saúde e qualidade de vida
        </span>
      </div>
    </div>
  );
};

export default Header;
