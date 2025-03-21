import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context/ContextoGlobal";
import { Trophy, Medal, ArrowUp, ArrowDown, Minus, User } from "lucide-react";
import peito from "../images/peito.png";
import perna from "../images/perna.png";
import ombro from "../images/ombro.png";
import costas from "../images/costas.png";
import braco from "../images/musculo.png";

const RankingSemanal = () => {
  const { isMenuOpen } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Geral");
  const [userData, setUserData] = useState(null);

  // ID do usuário atual (seria obtido através de autenticação em uma aplicação real)
  const currentUserId = "user123";

  // Dados de exemplo para rankings
  const rankingData = {
    Geral: [
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 92,
        posicaoAnterior: 2,
        foto: null,
      },
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 90,
        posicaoAnterior: 3,
        foto: null,
      },
      {
        id: "user123",
        nome: "João Santos",
        pontos: 88,
        posicaoAnterior: 1,
        foto: null,
      },
      {
        id: "user234",
        nome: "Ana Pereira",
        pontos: 85,
        posicaoAnterior: 5,
        foto: null,
      },
      {
        id: "user345",
        nome: "Carlos Ferreira",
        pontos: 82,
        posicaoAnterior: 4,
        foto: null,
      },
      {
        id: "user567",
        nome: "Mariana Costa",
        pontos: 80,
        posicaoAnterior: 8,
        foto: null,
      },
      {
        id: "user678",
        nome: "Rafael Souza",
        pontos: 78,
        posicaoAnterior: 6,
        foto: null,
      },
      {
        id: "user890",
        nome: "Juliana Lima",
        pontos: 75,
        posicaoAnterior: 7,
        foto: null,
      },
      {
        id: "user901",
        nome: "Fernando Alves",
        pontos: 72,
        posicaoAnterior: 9,
        foto: null,
      },
      {
        id: "user012",
        nome: "Aline Martins",
        pontos: 70,
        posicaoAnterior: 10,
        foto: null,
      },
    ],
    Peito: [
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 95,
        posicaoAnterior: 2,
        foto: null,
      },
      {
        id: "user123",
        nome: "João Santos",
        pontos: 92,
        posicaoAnterior: 3,
        foto: null,
      },
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 88,
        posicaoAnterior: 1,
        foto: null,
      },
      {
        id: "user234",
        nome: "Ana Pereira",
        pontos: 85,
        posicaoAnterior: 4,
        foto: null,
      },
      {
        id: "user345",
        nome: "Carlos Ferreira",
        pontos: 82,
        posicaoAnterior: 6,
        foto: null,
      },
      {
        id: "user567",
        nome: "Mariana Costa",
        pontos: 80,
        posicaoAnterior: 5,
        foto: null,
      },
      {
        id: "user678",
        nome: "Rafael Souza",
        pontos: 78,
        posicaoAnterior: 7,
        foto: null,
      },
      {
        id: "user890",
        nome: "Juliana Lima",
        pontos: 76,
        posicaoAnterior: 8,
        foto: null,
      },
      {
        id: "user901",
        nome: "Fernando Alves",
        pontos: 74,
        posicaoAnterior: 9,
        foto: null,
      },
      {
        id: "user012",
        nome: "Aline Martins",
        pontos: 70,
        posicaoAnterior: 10,
        foto: null,
      },
    ],
    Costas: [
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 96,
        posicaoAnterior: 1,
        foto: null,
      },
      {
        id: "user123",
        nome: "João Santos",
        pontos: 90,
        posicaoAnterior: 4,
        foto: null,
      },
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 88,
        posicaoAnterior: 2,
        foto: null,
      },
      {
        id: "user234",
        nome: "Ana Pereira",
        pontos: 85,
        posicaoAnterior: 3,
        foto: null,
      },
      {
        id: "user345",
        nome: "Carlos Ferreira",
        pontos: 80,
        posicaoAnterior: 5,
        foto: null,
      },
      {
        id: "user678",
        nome: "Rafael Souza",
        pontos: 78,
        posicaoAnterior: 7,
        foto: null,
      },
      {
        id: "user567",
        nome: "Mariana Costa",
        pontos: 76,
        posicaoAnterior: 6,
        foto: null,
      },
      {
        id: "user890",
        nome: "Juliana Lima",
        pontos: 74,
        posicaoAnterior: 8,
        foto: null,
      },
      {
        id: "user901",
        nome: "Fernando Alves",
        pontos: 70,
        posicaoAnterior: 9,
        foto: null,
      },
      {
        id: "user012",
        nome: "Aline Martins",
        pontos: 68,
        posicaoAnterior: 10,
        foto: null,
      },
    ],
    Braço: [
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 94,
        posicaoAnterior: 2,
        foto: null,
      },
      {
        id: "user234",
        nome: "Ana Pereira",
        pontos: 90,
        posicaoAnterior: 3,
        foto: null,
      },
      {
        id: "user123",
        nome: "João Santos",
        pontos: 86,
        posicaoAnterior: 1,
        foto: null,
      },
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 84,
        posicaoAnterior: 5,
        foto: null,
      },
      {
        id: "user345",
        nome: "Carlos Ferreira",
        pontos: 82,
        posicaoAnterior: 4,
        foto: null,
      },
      {
        id: "user567",
        nome: "Mariana Costa",
        pontos: 80,
        posicaoAnterior: 6,
        foto: null,
      },
      {
        id: "user678",
        nome: "Rafael Souza",
        pontos: 78,
        posicaoAnterior: 8,
        foto: null,
      },
      {
        id: "user890",
        nome: "Juliana Lima",
        pontos: 76,
        posicaoAnterior: 7,
        foto: null,
      },
      {
        id: "user901",
        nome: "Fernando Alves",
        pontos: 74,
        posicaoAnterior: 9,
        foto: null,
      },
      {
        id: "user012",
        nome: "Aline Martins",
        pontos: 70,
        posicaoAnterior: 10,
        foto: null,
      },
    ],
    Perna: [
      {
        id: "user234",
        nome: "Ana Pereira",
        pontos: 95,
        posicaoAnterior: 2,
        foto: null,
      },
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 92,
        posicaoAnterior: 1,
        foto: null,
      },
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 90,
        posicaoAnterior: 3,
        foto: null,
      },
      {
        id: "user123",
        nome: "João Santos",
        pontos: 85,
        posicaoAnterior: 5,
        foto: null,
      },
      {
        id: "user345",
        nome: "Carlos Ferreira",
        pontos: 82,
        posicaoAnterior: 4,
        foto: null,
      },
      {
        id: "user567",
        nome: "Mariana Costa",
        pontos: 80,
        posicaoAnterior: 6,
        foto: null,
      },
      {
        id: "user890",
        nome: "Juliana Lima",
        pontos: 78,
        posicaoAnterior: 8,
        foto: null,
      },
      {
        id: "user678",
        nome: "Rafael Souza",
        pontos: 75,
        posicaoAnterior: 7,
        foto: null,
      },
      {
        id: "user901",
        nome: "Fernando Alves",
        pontos: 72,
        posicaoAnterior: 9,
        foto: null,
      },
      {
        id: "user012",
        nome: "Aline Martins",
        pontos: 68,
        posicaoAnterior: 10,
        foto: null,
      },
    ],
    Ombro: [
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 94,
        posicaoAnterior: 3,
        foto: null,
      },
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 92,
        posicaoAnterior: 1,
        foto: null,
      },
      {
        id: "user123",
        nome: "João Santos",
        pontos: 88,
        posicaoAnterior: 2,
        foto: null,
      },
      {
        id: "user345",
        nome: "Carlos Ferreira",
        pontos: 85,
        posicaoAnterior: 5,
        foto: null,
      },
      {
        id: "user234",
        nome: "Ana Pereira",
        pontos: 82,
        posicaoAnterior: 4,
        foto: null,
      },
      {
        id: "user567",
        nome: "Mariana Costa",
        pontos: 80,
        posicaoAnterior: 6,
        foto: null,
      },
      {
        id: "user678",
        nome: "Rafael Souza",
        pontos: 76,
        posicaoAnterior: 7,
        foto: null,
      },
      {
        id: "user890",
        nome: "Juliana Lima",
        pontos: 74,
        posicaoAnterior: 8,
        foto: null,
      },
      {
        id: "user901",
        nome: "Fernando Alves",
        pontos: 70,
        posicaoAnterior: 9,
        foto: null,
      },
      {
        id: "user012",
        nome: "Aline Martins",
        pontos: 68,
        posicaoAnterior: 10,
        foto: null,
      },
    ],
  };

  // Função para obter ícone de categoria
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Peito":
        return <img src={peito} alt="Peito" className="w-6 h-6" />;
      case "Perna":
        return <img src={perna} alt="Perna" className="w-6 h-6" />;
      case "Ombro":
        return <img src={ombro} alt="Ombro" className="w-6 h-6" />;
      case "Costas":
        return <img src={costas} alt="Costas" className="w-6 h-6" />;
      case "Braço":
        return <img src={braco} alt="Braço" className="w-6 h-6" />;
      case "Geral":
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  // Função para obter ícone de mudança de posição
  const getPositionChangeIcon = (current, previous) => {
    const diff = previous - current;
    if (diff > 0) {
      return <ArrowUp className="text-green-500" size={16} />;
    } else if (diff < 0) {
      return <ArrowDown className="text-red-500" size={16} />;
    } else {
      return <Minus className="text-gray-500" size={16} />;
    }
  };

  // Função para formatar a mudança de posição
  const formatPositionChange = (current, previous) => {
    const diff = previous - current;
    if (diff > 0) {
      return `+${diff}`;
    } else if (diff < 0) {
      return `${diff}`;
    } else {
      return "=";
    }
  };

  // Efeito para encontrar os dados do usuário atual em cada ranking
  useEffect(() => {
    const userRankings = {};

    Object.keys(rankingData).forEach((category) => {
      const ranking = rankingData[category];
      const userIndex = ranking.findIndex((user) => user.id === currentUserId);

      if (userIndex !== -1) {
        userRankings[category] = {
          posicao: userIndex + 1,
          pontos: ranking[userIndex].pontos,
          total: ranking.length,
          posicaoAnterior: ranking[userIndex].posicaoAnterior,
        };
      }
    });

    setUserData(userRankings);
  }, [currentUserId]);

  // Função para renderizar medalha baseada na posição
  const renderMedal = (position) => {
    if (position === 1) {
      return <Medal size={24} className="text-yellow-500" />;
    } else if (position === 2) {
      return <Medal size={24} className="text-gray-400" />;
    } else if (position === 3) {
      return <Medal size={24} className="text-amber-700" />;
    }
    return (
      <span className="text-lg font-bold ml-2 w-6 text-center">{position}</span>
    );
  };

  return (
    <div className="w-screen min-h-screen bg-neutral-800 flex justify-center p-6">
      <div
        className={`rounded-md mt-10 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        <div className="text-center bg-orange-400 p-4 rounded-xl w-full md:w-[80%] mx-auto mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Ranking Semanal
          </h1>
          <p className="text-white">
            Veja como você se compara com outros atletas esta semana!
          </p>

          {userData && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.keys(userData).map((category) => (
                <div
                  key={category}
                  className={`bg-white p-3 rounded-lg shadow-md ${
                    activeTab === category ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setActiveTab(category)}
                >
                  <div className="flex items-center justify-center mb-1">
                    {getCategoryIcon(category)}
                    <h3 className="text-lg font-semibold ml-2">{category}</h3>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {userData[category].posicao}
                    </span>
                    <span className="text-gray-600 text-sm">
                      /{userData[category].total}
                    </span>
                    <div className="ml-2 flex items-center">
                      {getPositionChangeIcon(
                        userData[category].posicao,
                        userData[category].posicaoAnterior
                      )}
                      <span
                        className={`text-xs ml-1 ${
                          userData[category].posicaoAnterior >
                          userData[category].posicao
                            ? "text-green-500"
                            : userData[category].posicaoAnterior <
                              userData[category].posicao
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {formatPositionChange(
                          userData[category].posicao,
                          userData[category].posicaoAnterior
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 text-center">
                    <span className="text-sm font-medium">
                      {userData[category].pontos} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navegação entre tabs */}
        <div className="flex flex-wrap justify-center mb-4 gap-2">
          {Object.keys(rankingData).map((category) => (
            <button
              key={category}
              className={`py-2 px-4 rounded-md flex items-center ${
                activeTab === category
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {getCategoryIcon(category)}
              <span className="ml-2">{category}</span>
            </button>
          ))}
        </div>

        {/* Tabela de ranking */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-[90%] lg:w-[80%] mx-auto">
          <div className="p-4 bg-gray-50 border-b flex items-center">
            <h2 className="text-xl font-bold flex items-center">
              {getCategoryIcon(activeTab)}
              <span className="ml-2">Ranking {activeTab}</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Atleta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pontos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variação
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rankingData[activeTab].map((user, index) => {
                  const isCurrentUser = user.id === currentUserId;
                  return (
                    <tr
                      key={user.id}
                      className={`${
                        isCurrentUser
                          ? "bg-blue-50"
                          : index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {renderMedal(index + 1)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {user.foto ? (
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.foto}
                                alt={user.nome}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <User className="h-6 w-6 text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.nome}
                              {isCurrentUser && (
                                <span className="ml-2 inline-block bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                  Você
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.pontos} pts
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getPositionChangeIcon(
                            index + 1,
                            user.posicaoAnterior
                          )}
                          <span
                            className={`ml-1 ${
                              user.posicaoAnterior > index + 1
                                ? "text-green-500"
                                : user.posicaoAnterior < index + 1
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          >
                            {formatPositionChange(
                              index + 1,
                              user.posicaoAnterior
                            )}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingSemanal;
