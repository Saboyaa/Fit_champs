import React from "react";
import { Filter, User } from "lucide-react";

const FilterBar = ({
  sexos,
  faixasEtarias,
  activeSexo,
  activeFaixaEtaria,
  setActiveSexo,
  setActiveFaixaEtaria,
  userInfo,
}) => {
  return (
    <>
      <div className="mb-4 bg-sky-800/50 p-4 rounded-lg mx-auto max-w-md border border-sky-700/50">
        <div className="text-white font-semibold mb-3 flex items-center justify-center">
          <User className="mr-2" size={18} />
          <span>Seu Perfil</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <div className="bg-blue-500/30 px-3 py-1 rounded-full text-white">
            <span className="font-medium">{userInfo.sexo}</span>
          </div>
          <div className="bg-green-500/30 px-3 py-1 rounded-full text-white">
            <span className="font-medium">
              Faixa etária: {userInfo.faixaEtaria}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center mb-6 gap-4">
        <div className="bg-sky-800 p-3 rounded-lg shadow-md">
          <div className="flex items-center text-white font-medium mb-2">
            <Filter size={16} className="mr-2 text-blue-300" />
            <span>Filtrar por Sexo</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {sexos.map((sexo) => (
              <button
                key={sexo.id}
                className={`py-2 px-4 rounded-md transition-all ${
                  activeSexo === sexo.id
                    ? sexo.id === "Masculino"
                      ? "bg-blue-600 text-white"
                      : "bg-pink-500 text-white"
                    : "bg-sky-900 text-white hover:bg-sky-700"
                } ${userInfo.sexo === sexo.id ? "ring-2 ring-blue-300" : ""}`}
                onClick={() => setActiveSexo(sexo.id)}
              >
                {sexo.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-sky-800 p-3 rounded-lg shadow-md">
          <div className="flex items-center text-white font-medium mb-2">
            <Filter size={16} className="mr-2 text-blue-300" />
            <span>Filtrar por Idade</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {faixasEtarias.map((faixa) => (
              <button
                key={faixa.id}
                className={`py-2 px-3 rounded-md transition-all ${
                  activeFaixaEtaria === faixa.id
                    ? "bg-green-600 text-white"
                    : "bg-sky-900 text-white hover:bg-sky-700"
                } ${
                  userInfo.faixaEtaria === faixa.id
                    ? "ring-2 ring-green-300"
                    : ""
                }`}
                onClick={() => setActiveFaixaEtaria(faixa.id)}
              >
                {faixa.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;
