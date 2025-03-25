import React from "react";
import { useState, useEffect } from "react";
import peito from "../images/peito.png";
import perna from "../images/perna.png";
import ombro from "../images/ombro.png";
import costas from "../images/costas.png";
import braco from "../images/musculo.png";
import { LucideMedal, ActivitySquare, Edit2 } from "lucide-react";
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

    // Back é com vcs
    // Exemplo:
    /*
    fetch('/api/usuarios/atualizar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Falha na resposta da rede');
      }
      return response.json();
    })
    .then(data => {
      console.log('Perfil atualizado com sucesso', data);
    })
    .catch(error => {
      console.error('Erro ao atualizar perfil:', error);
    });
    */
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
      recordeVolume: 4800,
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

  return (
    <div className="w-screen h-full bg-sky-950 flex justify-center p-6">
      <div
        className={`rounded-md mt-10 transition-all duration-300  ${
          isMenuOpen ? "w-[90%] ml-64 opacity-80" : "w-full"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-center mb-8 text-white bg-neutral-800 rounded-md p-3 mt-2 shadow-lg">
            Bem vindo a sua academia virtual!
          </h1>

          {/* Cartão de perfil do usuário */}
          <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Olá, {userData.nome}!
                  </h2>
                  <p className="text-blue-100">{userData.email}</p>
                </div>
                <div className="bg-sky-950 p-3 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                  <svg
                    className="h-12 w-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-neutral-800 border-b border-gray-200 pb-2">
                Informações Pessoais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <span className="font-medium text-gray-500 w-24">
                    Telefone:
                  </span>
                  <span>{userData.telefone}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-500 w-24">Idade:</span>
                  <span>{userData.idade} anos</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-500 w-24">
                    Altura:
                  </span>
                  <span>{userData.altura} cm</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-500 w-24">Peso:</span>
                  <span>{userData.peso} kg</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-500 w-24">
                    Cidade:
                  </span>
                  <span>{userData.cidade}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-500 w-24">Sexo:</span>
                  <span>{userData.sexo}</span>
                </div>
              </div>

              {/* IMC Card */}
              <div className="mt-6 bg-neutral-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <ActivitySquare className="text-sky-700" size={20} />
                  <h4 className="font-semibold text-neutral-800">IMC</h4>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sky-700">
                      {userData.imc.value || "---"}
                    </div>
                    <div className="text-xs text-gray-500">Valor</div>
                  </div>
                  <div className="h-10 border-l border-gray-300"></div>
                  <div>
                    <div
                      className={`font-semibold ${getIMCColor(
                        userData.imc.classification
                      )}`}
                    >
                      {userData.imc.classification || "---"}
                    </div>
                    <div className="text-xs text-gray-500">Classificação</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <button
                className="bg-gradient-to-r from-neutral-800 to-neutral-700 text-white font-semibold py-2 px-6 rounded-md hover:opacity-90 transition-opacity shadow-md flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Editar Perfil
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-6 mb-6">
            <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 p-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                Posições no Rank!{" "}
                <LucideMedal size={24} className="text-yellow-400" />
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recordesMusculares.map((recorde) => (
                  <div
                    key={recorde.grupo}
                    className="relative p-3 bg-neutral-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div>{getIcon(recorde.grupo)}</div>
                      <div>
                        <p className="text-neutral-800">
                          <span className="text-sky-700 font-semibold">
                            {userData.posicaoRank}º
                          </span>{" "}
                          <span className="text-gray-500">em</span>{" "}
                          <span className="font-bold">{recorde.grupo}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cartão de recordes musculares */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 p-4">
              <h2 className="text-2xl font-bold text-white">
                Recordes Musculares
              </h2>
              <p className="text-blue-100">
                Maiores volumes de treino por grupo muscular
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-8">
                {recordesMusculares.map((recorde) => (
                  <div
                    key={recorde.grupo}
                    className="relative bg-neutral-50 p-4 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      <div className="bg-sky-600 p-2 rounded-md">
                        {getIcon(recorde.grupo)}
                      </div>
                      <h3 className="text-lg font-semibold ml-4">
                        {recorde.grupo}
                      </h3>
                      <div className="flex items-center space-x-2 ml-auto">
                        <span className="font-bold text-2xl text-sky-700 mr-2">
                          {recorde.recordeVolume} "/" {recorde.metaVolume}
                        </span>
                        <span className="text-sm text-gray-500"> Volume </span>
                        <button
                          onClick={() => openGoalModal(recorde.grupo)}
                          className="ml-2 text-gray-500 hover:text-sky-700"
                        >
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Barra de progresso */}
                    <div className="h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-700 to-sky-400 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (recorde.recordeVolume / recorde.metaVolume) * 100
                          )}%`,
                        }}
                      ></div>
                    </div>

                    <div className="mt-3 text-sm text-gray-600 flex items-center">
                      <span className="font-medium mr-1">Data do treino:</span>
                      <span className="bg-neutral-100 py-1 px-3 rounded-full">
                        {recorde.data}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isGoalModalOpen && (
        <VolumeGoalModal
          grupo={currentEditGroup}
          currentGoal={
            recordesMusculares.find((r) => r.grupo === currentEditGroup)
              ?.metaVolume
          }
          onSave={updateVolumeGoal}
          onCancel={() => setIsGoalModalOpen(false)}
        />
      )}

      {/* Modal de Edição de Perfil */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-neutral-800">
                Editar Perfil
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
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

// Volume Goal Edit Modal Component
const VolumeGoalModal = ({ grupo, currentGoal, onSave, onCancel }) => {
  const [newGoal, setNewGoal] = useState(currentGoal);

  const handleSave = () => {
    onSave(grupo, newGoal);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">
          Editar Meta de Volume - {grupo}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="volumeGoal"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Meta de Volume
          </label>
          <input
            type="number"
            id="volumeGoal"
            value={newGoal}
            onChange={(e) => setNewGoal(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-neutral-800 to-neutral-700 text-white font-semibold py-2 px-4 rounded-md hover:opacity-90"
          >
            Salvar
          </button>
        </div>
      </div>
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="nome"
        >
          Nome
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="nome"
          name="nome"
          type="text"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="telefone"
        >
          Telefone
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="telefone"
          name="telefone"
          type="tel"
          value={formData.telefone}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="nome"
        >
          Cidade
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="cidade"
          name="cidade"
          type="text"
          value={formData.cidade}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="idade"
          >
            Idade
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="idade"
            name="idade"
            type="number"
            value={formData.idade}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="altura"
          >
            Altura (cm)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="altura"
            name="altura"
            type="number"
            value={formData.altura}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="peso"
          >
            Peso (kg)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="peso"
            name="peso"
            type="number"
            value={formData.peso}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 mr-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-neutral-800 to-neutral-700 text-white font-semibold py-2 px-4 rounded-md hover:opacity-90"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default Home;
