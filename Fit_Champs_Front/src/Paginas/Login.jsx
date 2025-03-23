import { useState } from "react";
import { NavLink } from "react-router-dom";
import icone from "../images/icone.png";

export default function Login() {
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-neutral-800 h-screen">
      <div className="text-center mt-8 bg-gradient-to-t from-sky-700 to-sky-950 p-4 rounded-xl">
        <div className="flex justify-center items-center gap-2">
          <h1 className="text-3xl font-bold text-white mb-0">Fit Champs</h1>
          <img src={icone} alt="icone" className="h-8 w-8" />
        </div>
        <p className="text-blue-100 mt-2">Supere seus limites!</p>
      </div>
      <div className="bg-gradient-to-t from-sky-700 to-sky-950 p-8 rounded-2xl shadow-lg items-center w-[450px] h-[400px]  mt-[30px] margin-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Login
        </h2>
        <form className="w-full" method="GET">
          <div className="mb-4">
            <label className="block text-white font-bold">Usuário:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block  text-white font-bold"
            >
              Senha:
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-2  border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-800"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <div className="mt-2 text-center ">
            <NavLink to={"/Home"}>
              <button
                type="submit"
                className="w-5/6 bg-neutral-800 text-white p-2 rounded-lg hover:bg-slate-900 "
              >
                Entrar
              </button>
            </NavLink>
          </div>
        </form>
        <div className="mt-2 text-center ">
          <NavLink to={"/Cadastro"}>
            <button className="w-2/3 bg-neutral-800 text-white p-2 rounded-lg hover:bg-slate-900">
              Cadastrar novo usuário
            </button>
          </NavLink>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className=" text-white hover:underline text-sm">
            Esqueci a senha
          </a>
        </div>
      </div>
    </div>
  );
}
