import React from "react";
import icone from "../../images/icone.png";
const LoginHeader = () => {
  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={icone}
          alt="Fit Champs Logo"
          className="h-12 w-12 animate-pulse"
        />
        <h1 className="text-4xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          Fit Champs
        </h1>
      </div>
      <p className="text-blue-300 text-lg font-medium">Supere seus limites!</p>
    </div>
  );
};
export default LoginHeader;
