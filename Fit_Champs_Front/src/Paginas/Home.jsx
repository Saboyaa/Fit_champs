import React from "react";
import { useState } from "react";
import peito from "../images/peito.png";
import perna from "../images/perna.png";
import ombro from "../images/ombro.png";
import costas from "../images/costas.png";
import braco from "../images/musculo.png";
import { LucideMedal } from "lucide-react";
import { useGlobalContext } from "../Context/ContextoGlobal";

const Home = () => {
  const { isMenuOpen } = useGlobalContext();
  // Dados de exemplo do usuário
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
  });

  // Estado para controlar a visibilidade do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para salvar os dados do usuário
  const handleSaveUserData = (updatedData) => {
    setUserData(updatedData);

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
  const [recordesMusculares] = useState([
    { grupo: "Peito", peso: 100, series: 4, rep: 10, exercicio: "Supino Reto" },
    {
      grupo: "Costas",
      peso: 120,
      series: 4,
      rep: 10,
      exercicio: "Remada Curvada",
    },
    {
      grupo: "Perna",
      peso: 180,
      series: 4,
      rep: 10,
      exercicio: "Agachamento Livre",
    },
    {
      grupo: "Ombro",
      peso: 70,
      series: 4,
      rep: 10,
      exercicio: "Desenvolvimento Militar",
    },
    { grupo: "Braço", peso: 45, series: 4, rep: 10, exercicio: "Rosca Direta" },
  ]);

  return (
    <div className="w-screen h-full bg-neutral-800 flex justify-center p-6">
      <div
        className={`rounded-md mt-10 transition-all duration-300 bg-sky-950 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-80" : "w-full"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-center mb-8 text-white bg-neutral-800 rounded-md p-3 mt-2">
            Bem vindo a sua academia virtual!
          </h1>

          {/* Cartão de perfil do usuário */}
          <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
            <div className="bg-neutral-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Olá, {userData.nome}!
                  </h2>
                  <p className="text-blue-100">{userData.email}</p>
                </div>
                <div className="bg-sky-950 p-3 rounded-full">
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
              <h3 className="text-lg font-semibold mb-4 text-neutral-800">
                Informações Pessoais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
            </div>
            <div className="flex justify-center mb-2 ">
              <button
                className="bg-neutral-800 text-white font-semibold py-2 px-4 rounded-md hover:opacity-80"
                onClick={() => setIsModalOpen(true)}
              >
                Editar Perfil
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-6 mb-6">
            <div className="bg-neutral-800 p-4">
              <h2 className="text-2xl font-bold text-white flex gap-1">
                Posições no Rank! <LucideMedal size={24} className="mt-1" />
              </h2>
            </div>
            <div className="p-6 ">
              {recordesMusculares.map((recorde) => (
                <div key={recorde.grupo} className="relative ">
                  <div className="flex   mb-2">
                    <p className="text-neutral-800 flex gap-1 ">
                      <p className=" text-sky-700 font-semibold">
                        {userData.posicaoRank}º
                      </p>{" "}
                      posição do ranking de{" "}
                      <p className="font-bold">{recorde.grupo}</p>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cartão de recordes musculares */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-2">
            <div className="bg-neutral-800 p-4">
              <h2 className="text-2xl font-bold text-white">
                Recordes Musculares
              </h2>
              <p className="text-blue-100">
                Maiores volumes de treino por grupo muscular
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-6 ">
                {recordesMusculares.map((recorde) => (
                  <div key={recorde.grupo} className="relative">
                    <div className="flex  items-center mb-2">
                      {getIcon(recorde.grupo)}
                      <h3 className="text-lg font-semibold ml-4 ">
                        {recorde.grupo}
                      </h3>
                      <div className="flex items-center space-x-2 ml-auto">
                        <span className="font-bold text-2xl text-sky-700  mr-2">
                          {recorde.peso * recorde.series * recorde.rep}
                        </span>
                        <span className="text-sm text-gray-500"> Volume </span>
                      </div>
                    </div>

                    {/* Barra de progresso */}
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            ((recorde.peso * recorde.rep * recorde.series) /
                              10000) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>

                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Exercício: </span>
                      {recorde.exercicio}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
    //nao coloquei pra alterar foto
    foto: userData.foto,
    posicaoRank: userData.posicaoRank,
    sexo: userData.sexo,
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
          className="bg-neutral-800 text-white font-semibold py-2 px-4 rounded-md hover:opacity-80"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default Home;
