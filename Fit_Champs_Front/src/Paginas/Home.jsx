import React from "react";
import { useState, useEffect } from "react";
import peito from "../images/peito.png";
import perna from "../images/perna.png";
import ombro from "../images/ombro.png";
import costas from "../images/costas.png";
import braco from "../images/musculo.png";
import {
  LucideMedal,
  ActivitySquare,
  Edit,
  PartyPopper,
  User,
  Target,
  Info,
  Award,
  BarChart2,
} from "lucide-react";
import { useGlobalContext } from "../Context/ContextoGlobal";

const Home = () => {
  const { isMenuOpen } = useGlobalContext();

  // Dados de exemplo do usuário com IMC adicionado
  const [userData, setUserData] = useState({
    nome: "João Silva",
    foto: "imagem",
    telefone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    idade: 28,
    altura: 178,
    peso: 75,
    posicaoRank: 1,
    sexo: "Masculino",
    cidade: "São Paulo",
    imc: { value: null, classification: "" },
  });

  // State to manage volume goal edit modal
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [currentEditGroup, setCurrentEditGroup] = useState(null);
  const [hoveredRecord, setHoveredRecord] = useState(null);

  // Function to open goal edit modal
  const openGoalModal = (grupo) => {
    setCurrentEditGroup(grupo);
    setIsGoalModalOpen(true);
  };

  // Function to update volume goal
  const updateVolumeGoal = (grupo, newGoal) => {
    setRecordesMusculares((prev) =>
      prev.map((recorde) =>
        recorde.grupo === grupo
          ? { ...recorde, metaVolume: Number(newGoal) }
          : recorde
      )
    );
    setIsGoalModalOpen(false);
  };

  // Calcular IMC quando o componente montar ou quando altura/peso mudar
  useEffect(() => {
    calculateIMC(userData.altura, userData.peso);
  }, [userData.altura, userData.peso]);

  // Função para calcular o IMC e sua classificação
  const calculateIMC = (altura, peso) => {
    if (altura && peso) {
      const heightInMeters = altura / 100;
      const imcValue = (peso / (heightInMeters * heightInMeters)).toFixed(2);
      let classification = "";

      if (imcValue < 18.5) {
        classification = "Abaixo do peso";
      } else if (imcValue >= 18.5 && imcValue < 25) {
        classification = "Peso normal";
      } else if (imcValue >= 25 && imcValue < 30) {
        classification = "Sobrepeso";
      } else if (imcValue >= 30 && imcValue < 35) {
        classification = "Obesidade grau I";
      } else if (imcValue >= 35 && imcValue < 40) {
        classification = "Obesidade grau II";
      } else {
        classification = "Obesidade grau III";
      }

      setUserData((prev) => ({
        ...prev,
        imc: { value: imcValue, classification },
      }));
    }
  };

  // Estado para controlar a visibilidade do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para salvar os dados do usuário
  const handleSaveUserData = (updatedData) => {
    setUserData(updatedData);
    calculateIMC(updatedData.altura, updatedData.peso);
    setIsModalOpen(false);
  };

  const getIcon = (grupo) => {
    switch (grupo.toLowerCase()) {
      case "peito":
        return <img src={peito} alt="Peito" className="w-8 h-8" />;
      case "perna":
        return <img src={perna} alt="Perna" className="w-8 h-8" />;
      case "ombro":
        return <img src={ombro} alt="Ombro" className="w-8 h-8" />;
      case "costas":
        return <img src={costas} alt="Costas" className="w-8 h-8" />;
      case "braço":
        return <img src={braco} alt="Braço" className="w-8 h-8" />;
      default:
        return null;
    }
  };

  // Dados de exemplo dos recordes de peso
  const [recordesMusculares, setRecordesMusculares] = useState([
    {
      grupo: "Peito",
      recordeVolume: 4000,
      metaVolume: 5000,
      data: "2022-10-10",
    },
    {
      grupo: "Costas",
      recordeVolume: 6100,
      metaVolume: 6000,
      data: "2022-10-11",
    },
    {
      grupo: "Perna",
      recordeVolume: 7200,
      metaVolume: 8000,
      data: "2022-10-12",
    },
    {
      grupo: "Ombro",
      recordeVolume: 2800,
      metaVolume: 4000,
      data: "2022-10-14",
    },
    {
      grupo: "Braço",
      recordeVolume: 1800,
      metaVolume: 3000,
      data: "2022-10-15",
    },
  ]);

  // Função para determinar a cor do indicador de IMC
  const getIMCColor = (classification) => {
    switch (classification) {
      case "Abaixo do peso":
        return "text-yellow-500";
      case "Peso normal":
        return "text-green-500";
      case "Sobrepeso":
        return "text-orange-400";
      case "Obesidade grau I":
      case "Obesidade grau II":
      case "Obesidade grau III":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const meta = ({ recordeVolume, metaVolume }) => {
    return recordeVolume >= metaVolume;
  };

  const Alcancoumeta = ({ recordeVolume, metaVolume }) => {
    if (meta({ recordeVolume, metaVolume })) {
      return (
        <div className="flex items-center text-green-400 justify-center p-2 bg-green-900/30 rounded-lg mt-3 border border-green-700/50">
          <PartyPopper className="mr-2" size={18} />
          <span className="font-medium">
            Objetivo Alcançado! Altere sua meta para continuar progredindo.
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-screen h-full flex justify-center bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 p-6">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        {/* Cabeçalho moderno */}
        <div className="text-center bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-6 rounded-2xl w-full md:w-[80%] mx-auto mb-6 shadow-xl border border-indigo-500/30 backdrop-blur-sm">
          <div className="flex justify-center items-center gap-3 mb-2">
            <User className="text-blue-400" size={32} />
            <h1 className="text-3xl font-bold text-white">Dashboard Pessoal</h1>
          </div>
          <p className="text-blue-200 mt-2 text-lg">
            Bem-vindo à sua academia virtual personalizada!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Cartão de perfil do usuário */}
          <div className="bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 border border-slate-700 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-xl">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-6 rounded-lg mb-6 border border-indigo-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Olá, {userData.nome}!
                  </h2>
                  <p className="text-blue-300">{userData.email}</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-full shadow-lg transform hover:scale-105 transition-transform border border-indigo-500/50">
                  <User className="h-12 w-12 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold mb-4 text-white border-b border-slate-700 pb-2 flex items-center">
                  <Info className="mr-2 text-blue-400" size={20} />
                  Informações Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className="font-medium text-slate-400 w-24">
                      Telefone:
                    </span>
                    <span className="text-blue-100">{userData.telefone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-400 w-24">
                      Idade:
                    </span>
                    <span className="text-blue-100">{userData.idade} anos</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-400 w-24">
                      Altura:
                    </span>
                    <span className="text-blue-100">{userData.altura} cm</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-400 w-24">
                      Peso:
                    </span>
                    <span className="text-blue-100">{userData.peso} kg</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-400 w-24">
                      Cidade:
                    </span>
                    <span className="text-blue-100">{userData.cidade}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-400 w-24">
                      Sexo:
                    </span>
                    <span className="text-blue-100">{userData.sexo}</span>
                  </div>
                </div>

                <div className="mt-6 bg-slate-800 p-5 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <ActivitySquare className="text-blue-400" size={20} />
                    <h4 className="font-semibold text-white">
                      Índice de Massa Corporal (IMC)
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-6 items-center mt-3">
                    <div className="text-center bg-slate-900/80 py-3 px-5 rounded-lg border border-slate-700">
                      <div className="text-3xl font-bold text-blue-400">
                        {userData.imc.value || "---"}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Valor</div>
                    </div>
                    <div className="bg-slate-900/80 py-3 px-5 rounded-lg border border-slate-700">
                      <div
                        className={`font-semibold text-xl ${getIMCColor(
                          userData.imc.classification
                        )}`}
                      >
                        {userData.imc.classification || "---"}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Classificação
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-blue-900/50 hover:scale-105 flex items-center gap-2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Edit size={16} />
                    Atualizar Perfil
                  </button>
                </div>
              </div>

              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold mb-4 text-white border-b border-slate-700 pb-2 flex items-center">
                  <LucideMedal className="mr-2 text-yellow-400" size={20} />
                  Posições no Ranking
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recordesMusculares.map((recorde) => (
                    <div
                      key={recorde.grupo}
                      className="relative p-4 bg-slate-800 rounded-lg border border-slate-700 hover:shadow-md transition-shadow hover:border-blue-600/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-700 p-2 rounded-lg">
                          {getIcon(recorde.grupo)}
                        </div>
                        <div>
                          <p className="text-white">
                            <span className="text-yellow-400 font-bold text-xl mr-1">
                              {userData.posicaoRank}º
                            </span>
                            <span className="font-medium text-white">
                              {recorde.grupo}
                            </span>
                          </p>
                          <span className="text-xs text-blue-300">
                            Categoria: {recorde.grupo}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cartão de recordes musculares */}
          <div className="bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 border border-slate-700 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-xl">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-4 rounded-lg mb-6 border border-indigo-500/30">
              <div className="flex items-center gap-2">
                <BarChart2 className="text-blue-400" size={24} />
                <h2 className="text-2xl font-bold text-white">
                  Recordes Musculares
                </h2>
              </div>
              <p className="text-blue-300 mt-1 ml-8">
                Maiores volumes de treino por grupo muscular
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordesMusculares.map((recorde) => {
                const isHovered = hoveredRecord === recorde.grupo;
                const isOtherHovered =
                  hoveredRecord !== null && hoveredRecord !== recorde.grupo;
                const metaAlcancada = meta({
                  recordeVolume: recorde.recordeVolume,
                  metaVolume: recorde.metaVolume,
                });

                const cardClasses = `
                  bg-slate-900/70 p-5 rounded-xl border border-slate-700
                  transition-all duration-300 ease-in-out
                  ${isHovered ? "scale-102 shadow-xl z-10 border-blue-500" : ""}
                  ${isOtherHovered ? "opacity-70 scale-98" : ""}
                  ${metaAlcancada ? "border-green-500/50" : ""}
                `;

                return (
                  <div
                    key={recorde.grupo}
                    className={cardClasses}
                    onMouseEnter={() => setHoveredRecord(recorde.grupo)}
                    onMouseLeave={() => setHoveredRecord(null)}
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-2 rounded-lg ${
                          metaAlcancada ? "bg-green-900/50" : "bg-slate-800"
                        }`}
                      >
                        {getIcon(recorde.grupo)}
                      </div>
                      <h3 className="text-lg font-semibold ml-3 text-white">
                        {recorde.grupo}
                      </h3>
                      {metaAlcancada && (
                        <Award size={18} className="ml-auto text-green-400" />
                      )}
                    </div>

                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-slate-400">
                        Volume Atual / Meta:
                      </span>
                      <span
                        className={`text-2xl font-bold ${
                          metaAlcancada ? "text-green-400" : "text-blue-400"
                        }`}
                      >
                        {recorde.recordeVolume}/{recorde.metaVolume}
                      </span>
                    </div>

                    {/* Barra de progresso */}
                    <div className="h-6 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className={`h-full rounded-full ${
                          metaAlcancada
                            ? "bg-gradient-to-r from-green-700 to-green-500"
                            : "bg-gradient-to-r from-blue-700 to-blue-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            100,
                            (recorde.recordeVolume / recorde.metaVolume) * 100
                          )}%`,
                        }}
                      >
                        <div className="h-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {Math.min(
                              100,
                              Math.round(
                                (recorde.recordeVolume / recorde.metaVolume) *
                                  100
                              )
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    <Alcancoumeta
                      recordeVolume={recorde.recordeVolume}
                      metaVolume={recorde.metaVolume}
                    />

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-blue-300">
                        Data: {recorde.data}
                      </span>
                      <button
                        onClick={() => openGoalModal(recorde.grupo)}
                        className="text-slate-300 hover:text-blue-400 flex items-center gap-1 bg-slate-800 py-1 px-3 rounded-lg transition-colors hover:bg-slate-700"
                      >
                        <Target size={14} />
                        <span>Alterar Meta</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Volume Goal Edit Modal */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 border border-slate-600">
            <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
              <Target className="mr-2 text-blue-400" size={20} />
              Editar Meta - {currentEditGroup}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="volumeGoal"
                className="block text-slate-300 text-sm font-medium mb-2"
              >
                Meta de Volume
              </label>
              <input
                step={100}
                type="number"
                id="volumeGoal"
                defaultValue={
                  recordesMusculares.find((r) => r.grupo === currentEditGroup)
                    ?.metaVolume
                }
                onChange={(e) => e.target.value}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsGoalModalOpen(false)}
                className="bg-slate-700 text-white font-medium py-2 px-5 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById("volumeGoal");
                  updateVolumeGoal(currentEditGroup, input.value);
                }}
                className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white font-medium py-2 px-5 rounded-lg hover:opacity-90 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição de Perfil */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg p-6 border border-slate-600">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Edit className="mr-2 text-blue-400" size={20} />
                Atualizar Perfil
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white bg-slate-700 rounded-full p-1"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <ProfileEditForm
              userData={userData}
              onSave={handleSaveUserData}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Componente do formulário de edição de perfil
const ProfileEditForm = ({ userData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: userData.nome || "",
    email: userData.email || "",
    telefone: userData.telefone || "",
    idade: userData.idade || "",
    altura: userData.altura || "",
    peso: userData.peso || "",
    cidade: userData.cidade || "",
    foto: userData.foto,
    posicaoRank: userData.posicaoRank,
    sexo: userData.sexo,
    imc: userData.imc,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClasses =
    "w-full bg-slate-700 border border-slate-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              className="block text-slate-300 text-sm font-medium mb-1"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              className={inputClasses}
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              className="block text-slate-300 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={inputClasses}
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              className="block text-slate-300 text-sm font-medium mb-1"
              htmlFor="telefone"
            >
              Telefone
            </label>
            <input
              className={inputClasses}
              id="telefone"
              name="telefone"
              type="tel"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block text-slate-300 text-sm font-medium mb-1"
              htmlFor="cidade"
            >
              Cidade
            </label>
            <input
              className={inputClasses}
              id="cidade"
              name="cidade"
              type="text"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              className="block text-slate-300 text-sm font-medium mb-1"
              htmlFor="idade"
            >
              Idade
            </label>
            <input
              className={inputClasses}
              id="idade"
              name="idade"
              type="number"
              value={formData.idade}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className="block text-slate-300 text-sm font-medium mb-1"
              htmlFor="altura"
            >
              Altura (cm)
            </label>
            <input
              className={inputClasses}
              id="altura"
              name="altura"
              type="number"
              value={formData.altura}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className="block text-slate-300 text-sm font-medium mb-1"
              htmlFor="peso"
            >
              Peso (kg)
            </label>
            <input
              className={inputClasses}
              id="peso"
              name="peso"
              type="number"
              value={formData.peso}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-slate-700 text-white font-medium py-2 px-5 rounded-lg hover:bg-slate-600 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white font-medium py-2 px-5 rounded-lg hover:opacity-90 transition-colors"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default Home;
