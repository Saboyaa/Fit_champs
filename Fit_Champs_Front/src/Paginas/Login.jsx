import { useState } from "react";
import { NavLink } from "react-router-dom";
import BarraMenu from "../Components/BarraMenu";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-orange-400 p-8 rounded-2xl shadow-lg items-center w-[450px] h-[450px]  mt-[90px]">
      <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800">
        Login
      </h2>
      <form className="w-full" method="GET">
        <div className="mb-4">
          <label className="block text-neutral-800 font-bold">Usuário</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-800 font-bold">Senha</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
          />

          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="showPassword"
              name="togglePassword"
              className="w-3 h-3 text-neutral-800 cursor-pointer  "
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label
              htmlFor="showPassword"
              className="text-neutral-800 font-semibold"
            >
              Mostrar senha
            </label>
          </div>
        </div>
        <NavLink to={"/Home"}>
          <button
            type="submit"
            className="w-full bg-neutral-800 text-white p-2 rounded-lg hover:opacity-80 "
          >
            Entrar
          </button>
        </NavLink>
      </form>
      <div className="mt-2 text-center ">
        <NavLink to={"/Cadastro"}>
          <button className="w-3/4 bg-neutral-800 text-white p-2 rounded-lg hover:opacity-80">
            Cadastrar novo usuário
          </button>
        </NavLink>
      </div>
      <div className="mt-4 text-center">
        <a href="#" className=" text-neutral-800 hover:underline text-sm">
          Esqueci a senha
        </a>
      </div>
    </div>
  );
}
