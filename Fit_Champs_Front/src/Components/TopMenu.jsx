import React from "react";
import { LucideBell, LucideSettings, LucideLogOut, User } from "lucide-react";
import icone from "../images/icone.png";
import { NavLink } from "react-router-dom";
import { getUserDisplayInfo } from "../Classes/Usuario";

function TopMenu({ onLogout }) {
  // const [userDisplay, setUserDisplay] = useState({
  //   nome: "Carregando...",
  //   foto: null
  // });

  // // Carregar dados do usuário quando o componente montar
  // useEffect(() => {
  //   const loadUserDisplay = async () => {
  //     try {
  //       const displayData = await userService.getUserDisplay();
  //       setUserDisplay(displayData);
  //     } catch (error) {
  //       console.error("Erro ao carregar dados do usuário:", error);
  //       // Manter valores padrão em caso de erro
  //       setUserDisplay({
  //         nome: "Usuário",
  //         foto: null
  //       });
  //     }
  //   };

  //   loadUserDisplay();
  // }, []);

  const { nome, foto } = getUserDisplayInfo();

  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950 to-slate-800 flex justify-between items-center z-40 px-4">
      {/* Espaço para o logo ou título (caso queira adicionar) */}
      <div></div>
      <div className="text-white font-bold ml-12 flex gap-2">
        <p className="mt-2 ml-2 ml-20">FIT CHAMPS</p>{" "}
        <img
          src={icone}
          alt="icone"
          className="h-8 w-8 mb-3 animate-pulse"
        ></img>
      </div>
      {/* Área direita com ícones e usuário */}
      <div className="flex items-center space-x-4">
        {/* Ícone de notificações */}
        <button className="relative text-white hover:bg-slate-600 p-1 rounded-full">
          <LucideBell size={20} />
          <span className="absolute -top-1 -right-1 bg-neutral-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Botão de logout */}
        <button
          onClick={onLogout}
          className="relative text-white hover:bg-slate-600 p-1 rounded-full"
        >
          <NavLink to="/" className="text-white flex gap-2">
            Sair <LucideLogOut size={16} className="mt-1" />
          </NavLink>
        </button>

        {/* Informações do usuário */}
        <div className="flex items-center">
          {/* Foto do usuário - agora usando a foto do getUserDisplayInfo */}
          {foto ? (
            <img
              src={foto}
              alt={nome}
              className="w-8 h-8 rounded-full object-cover border-2 border-black bg-white"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-700 to-blue-600 flex items-center justify-center border-2 border-white">
              <User className="h-4 w-4 text-blue-100" />
            </div>
          )}

          {/* Nome do usuário - agora usando o nome do getUserDisplayInfo */}
          <p className="text-white ml-2 hidden sm:block">{nome}</p>
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
