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
  const [activeSexo, setActiveSexo] = useState("Masculino");
  const [activeFaixaEtaria, setActiveFaixaEtaria] = useState("20-40");

  // ID do usuário atual (seria obtido através de autenticação em uma aplicação real)
  const currentUserId = "user123";

  // Dados de exemplo para rankings com adição de sexo e idade
  const rankingDataCompleto = {
    Geral: [
      {
        id: "user123",
        nome: "João Santos",
        pontos: 88,
        posicaoAnterior: 1,
        foto: null,
        sexo: "Masculino",
        idade: 28,
      },
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 90,
        posicaoAnterior: 3,
        foto: null,
        sexo: "Masculino",
        idade: 32,
      },
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 92,
        posicaoAnterior: 2,
        foto: null,
        sexo: "Feminino",
        idade: 29,
      },
      {
        id: "user234",
        nome: "Ana Pereira",
        pontos: 85,
        posicaoAnterior: 5,
        foto: null,
        sexo: "Feminino",
        idade: 22,
      },
      {
        id: "user345",
        nome: "Carlos Ferreira",
        pontos: 82,
        posicaoAnterior: 4,
        foto: null,
        sexo: "Masculino",
        idade: 45,
      },
      {
        id: "user567",
        nome: "Mariana Costa",
        pontos: 80,
        posicaoAnterior: 8,
        foto: null,
        sexo: "Feminino",
        idade: 19,
      },
      {
        id: "user678",
        nome: "Rafael Souza",
        pontos: 78,
        posicaoAnterior: 6,
        foto: null,
        sexo: "Masculino",
        idade: 36,
      },
      {
        id: "user890",
        nome: "Juliana Lima",
        pontos: 75,
        posicaoAnterior: 7,
        foto: null,
        sexo: "Feminino",
        idade: 31,
      },
      {
        id: "user901",
        nome: "Fernando Alves",
        pontos: 72,
        posicaoAnterior: 9,
        foto: null,
        sexo: "Masculino",
        idade: 62,
      },
      {
        id: "user012",
        nome: "Aline Martins",
        pontos: 70,
        posicaoAnterior: 10,
        foto: null,
        sexo: "Feminino",
        idade: 42,
      },
      {
        id: "user013",
        nome: "Roberto Lima",
        pontos: 68,
        posicaoAnterior: 11,
        foto: null,
        sexo: "Masculino",
        idade: 55,
      },
      {
        id: "user014",
        nome: "Carla Mendes",
        pontos: 66,
        posicaoAnterior: 12,
        foto: null,
        sexo: "Feminino",
        idade: 47,
      },
      {
        id: "user015",
        nome: "Gabriel Santos",
        pontos: 65,
        posicaoAnterior: 13,
        foto: null,
        sexo: "Masculino",
        idade: 18,
      },
      {
        id: "user016",
        nome: "Larissa Silva",
        pontos: 64,
        posicaoAnterior: 14,
        foto: null,
        sexo: "Feminino",
        idade: 16,
      },
      {
        id: "user017",
        nome: "Antônio Gomes",
        pontos: 62,
        posicaoAnterior: 15,
        foto: null,
        sexo: "Masculino",
        idade: 68,
      },
      {
        id: "user018",
        nome: "Helena Costa",
        pontos: 60,
        posicaoAnterior: 16,
        foto: null,
        sexo: "Feminino",
        idade: 71,
      },
    ],
    Peito: [
      {
        id: "user123",
        nome: "João Santos",
        pontos: 92,
        posicaoAnterior: 3,
        foto: null,
        sexo: "Masculino",
        idade: 28,
      },
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 95,
        posicaoAnterior: 2,
        foto: null,
        sexo: "Masculino",
        idade: 32,
      },
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 88,
        posicaoAnterior: 1,
        foto: null,
        sexo: "Feminino",
        idade: 29,
      },
    ],
    Costas: [
      {
        id: "user123",
        nome: "João Santos",
        pontos: 90,
        posicaoAnterior: 1,
        foto: null,
        sexo: "Masculino",
        idade: 28,
      },
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 92,
        posicaoAnterior: 2,
        foto: null,
        sexo: "Masculino",
        idade: 32,
      },
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 85,
        posicaoAnterior: 3,
        foto: null,
        sexo: "Feminino",
        idade: 29,
      },
      {
        id: "user234",
        nome: "Ana Pereira",
        pontos: 88,
        posicaoAnterior: 4,
        foto: null,
        sexo: "Feminino",
        idade: 22,
      },
      {
        id: "user345",
        nome: "Carlos Ferreira",
        pontos: 80,
        posicaoAnterior: 5,
        foto: null,
        sexo: "Masculino",
        idade: 45,
      },
      {
        id: "user567",
        nome: "Mariana Costa",
        pontos: 78,
        posicaoAnterior: 6,
        foto: null,
        sexo: "Feminino",
        idade: 19,
      },
      {
        id: "user678",
        nome: "Rafael Souza",
        pontos: 76,
        posicaoAnterior: 7,
        foto: null,
        sexo: "Masculino",
        idade: 36,
      },
      {
        id: "user890",
        nome: "Juliana Lima",
        pontos: 74,
        posicaoAnterior: 8,
        foto: null,
        sexo: "Feminino",
        idade: 31,
      },
      {
        id: "user901",
        nome: "Fernando Alves",
        pontos: 72,
        posicaoAnterior: 9,
        foto: null,
        sexo: "Masculino",
        idade: 62,
      },
    ],
    Braço: [
      {
        id: "user123",
        nome: "João Santos",
        pontos: 90,
        posicaoAnterior: 1,
        foto: null,
        sexo: "Masculino",
        idade: 28,
      },
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 92,
        posicaoAnterior: 2,
        foto: null,
        sexo: "Masculino",
        idade: 32,
      },
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 85,
        posicaoAnterior: 3,
        foto: null,
        sexo: "Feminino",
        idade: 29,
      },
      {
        id: "user234",
        nome: "Ana Pereira",
        pontos: 88,
        posicaoAnterior: 4,
        foto: null,
        sexo: "Feminino",
        idade: 22,
      },
      {
        id: "user345",
        nome: "Carlos Ferreira",
        pontos: 80,
        posicaoAnterior: 5,
        foto: null,
        sexo: "Masculino",
        idade: 45,
      },
      {
        id: "user567",
        nome: "Mariana Costa",
        pontos: 78,
        posicaoAnterior: 6,
        foto: null,
        sexo: "Feminino",
        idade: 19,
      },
      {
        id: "user678",
        nome: "Rafael Souza",
        pontos: 76,
        posicaoAnterior: 7,
        foto: null,
        sexo: "Masculino",
        idade: 36,
      },
      {
        id: "user890",
        nome: "Juliana Lima",
        pontos: 74,
        posicaoAnterior: 8,
        foto: null,
        sexo: "Feminino",
        idade: 31,
      },
      {
        id: "user901",
        nome: "Fernando Alves",
        pontos: 72,
        posicaoAnterior: 9,
        foto: null,
        sexo: "Masculino",
        idade: 62,
      },
      {
        id: "user012",
        nome: "Aline Martins",
        pontos: 70,
        posicaoAnterior: 10,
        foto: null,
        sexo: "Feminino",
        idade: 42,
      },
    ],
    Perna: [
      {
        id: "user123",
        nome: "João Santos",
        pontos: 90,
        posicaoAnterior: 1,
        foto: null,
        sexo: "Masculino",
        idade: 28,
      },
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 92,
        posicaoAnterior: 2,
        foto: null,
        sexo: "Masculino",
        idade: 32,
      },
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 85,
        posicaoAnterior: 3,
        foto: null,
        sexo: "Feminino",
        idade: 29,
      },
    ],
    Ombro: [
      {
        id: "user123",
        nome: "João Santos",
        pontos: 90,
        posicaoAnterior: 1,
        foto: null,
        sexo: "Masculino",
        idade: 28,
      },
      {
        id: "user456",
        nome: "Pedro Oliveira",
        pontos: 92,
        posicaoAnterior: 2,
        foto: null,
        sexo: "Masculino",
        idade: 32,
      },
      {
        id: "user789",
        nome: "Maria Silva",
        pontos: 85,
        posicaoAnterior: 3,
        foto: null,
        sexo: "Feminino",
        idade: 29,
      },
      {
        id: "user234",
        nome: "Ana Pereira",
        pontos: 88,
        posicaoAnterior: 4,
        foto: null,
        sexo: "Feminino",
        idade: 22,
      },
      {
        id: "user345",
        nome: "Carlos Ferreira",
        pontos: 80,
        posicaoAnterior: 5,
        foto: null,
        sexo: "Masculino",
        idade: 45,
      },
      {
        id: "user567",
        nome: "Mariana Costa",
        pontos: 78,
        posicaoAnterior: 6,
        foto: null,
        sexo: "Feminino",
        idade: 19,
      },
      {
        id: "user678",
        nome: "Rafael Souza",
        pontos: 76,
        posicaoAnterior: 7,
        foto: null,
        sexo: "Masculino",
        idade: 36,
      },
      {
        id: "user890",
        nome: "Juliana Lima",
        pontos: 74,
        posicaoAnterior: 8,
        foto: null,
        sexo: "Feminino",
        idade: 31,
      },
      {
        id: "user901",
        nome: "Fernando Alves",
        pontos: 72,
        posicaoAnterior: 9,
        foto: null,
        sexo: "Masculino",
        idade: 62,
      },
    ],
  };

  Object.keys(rankingDataCompleto).forEach((category) => {
    if (
      category !== "Geral" &&
      (!rankingDataCompleto[category] ||
        rankingDataCompleto[category].length === 0)
    ) {
      rankingDataCompleto[category] = rankingDataCompleto["Geral"].map(
        (user) => ({
          ...user,
          pontos: Math.floor(Math.random() * 30) + 70, // Pontos aleatórios entre 70 e 99
          posicaoAnterior: Math.floor(Math.random() * 15) + 1, // Posição anterior aleatória entre 1 e 15
        })
      );
    }
  });

  // Estado para armazenar os rankings filtrados
  const [rankingData, setRankingData] = useState({});

  // Faixas etárias disponíveis
  const faixasEtarias = ["10-20", "20-40", "40-60", "60+"];

  // Função para filtrar os rankings por sexo e faixa etária
  const filtrarRankings = (sexo, faixaEtaria) => {
    const idadeLimites = {
      "10-20": { min: 10, max: 20 },
      "20-40": { min: 20, max: 40 },
      "40-60": { min: 40, max: 60 },
      "60+": { min: 60, max: 999 },
    };

    const { min, max } = idadeLimites[faixaEtaria];

    const rankingsFiltrados = {};

    // Filtrar cada categoria
    Object.keys(rankingDataCompleto).forEach((category) => {
      const usuariosFiltrados = rankingDataCompleto[category]
        .filter(
          (user) =>
            user.sexo === sexo &&
            user.idade >= min &&
            user.idade < (faixaEtaria === "60+" ? 999 : max)
        )
        .sort((a, b) => b.pontos - a.pontos) // Ordenar por pontos (maior primeiro)
        .slice(0, 5); // Pegar apenas os 5 primeiros

      // Atualizar a posição atual
      usuariosFiltrados.forEach((user, index) => {
        user.posicaoAtual = index + 1;
      });

      rankingsFiltrados[category] = usuariosFiltrados;
    });

    return rankingsFiltrados;
  };

  // Atualizar rankings quando o sexo ou faixa etária mudar
  useEffect(() => {
    const novoRanking = filtrarRankings(activeSexo, activeFaixaEtaria);
    setRankingData(novoRanking);
  }, [activeSexo, activeFaixaEtaria]);

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
    if (Object.keys(rankingData).length === 0) return;

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
  }, [currentUserId, rankingData]);

  // Função para identificar em qual faixa etária o usuário se encaixa
  const getUserFaixaEtaria = () => {
    // Procurar o usuário atual em qualquer categoria para obter sua idade
    for (const category of Object.keys(rankingDataCompleto)) {
      const user = rankingDataCompleto[category].find(
        (u) => u.id === currentUserId
      );
      if (user) {
        if (user.idade >= 10 && user.idade < 20) return "10-20";
        if (user.idade >= 20 && user.idade < 40) return "20-40";
        if (user.idade >= 40 && user.idade < 60) return "40-60";
        if (user.idade >= 60) return "60+";
        break;
      }
    }
    return "Desconhecida";
  };

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

  // Obter sexo e faixa etária do usuário atual
  const userSexo =
    rankingDataCompleto.Geral.find((u) => u.id === currentUserId)?.sexo ||
    "Desconhecido";
  const userFaixaEtaria = getUserFaixaEtaria();

  return (
    <div className="w-screen min-h-screen bg-neutral-800 flex justify-center p-6">
      <div
        className={`rounded-md mt-10 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        <div className="text-center bg-sky-950 p-4 rounded-xl w-full md:w-[80%] mx-auto mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Ranking Semanal
          </h1>
          <p className="text-blue-200 mb-4">
            Veja como você se compara com outros atletas esta semana!
          </p>

          <div className="mb-4 bg-white p-3 rounded-lg">
            <div className="text-gray-800 font-semibold mb-2">Seu perfil:</div>
            <div className="flex flex-wrap justify-center gap-2">
              <div className="bg-blue-100 px-3 py-1 rounded-full">
                <span className="font-medium">{userSexo}</span>
              </div>
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="font-medium">
                  Faixa etária: {userFaixaEtaria}
                </span>
              </div>
            </div>
          </div>

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
        <div className="flex flex-col sm:flex-row justify-center mb-4 gap-4">
          <div className="bg-white p-2 rounded-lg shadow flex flex-wrap justify-center gap-2">
            <button
              className={`py-1 px-3 rounded-md ${
                activeSexo === "Masculino"
                  ? "bg-sky-700 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              } ${userSexo === "Masculino" ? "ring-2 ring-sky-700" : ""}`}
              onClick={() => setActiveSexo("Masculino")}
            >
              Masculino
            </button>
            <button
              className={`py-1 px-3 rounded-md ${
                activeSexo === "Feminino"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 hover:bg-pink-100"
              } ${userSexo === "Feminino" ? "ring-2 ring-pink-500" : ""}`}
              onClick={() => setActiveSexo("Feminino")}
            >
              Feminino
            </button>
          </div>

          <div className="bg-white p-2 rounded-lg shadow flex flex-wrap justify-center gap-2">
            {faixasEtarias.map((faixa) => (
              <button
                key={faixa}
                className={`py-1 px-3 rounded-md ${
                  activeFaixaEtaria === faixa
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-green-100"
                } ${userFaixaEtaria === faixa ? "ring-2 ring-green-300" : ""}`}
                onClick={() => setActiveFaixaEtaria(faixa)}
              >
                {faixa} anos
              </button>
            ))}
          </div>
        </div>
        {/* Navegação entre tabs */}
        <div className="flex flex-wrap justify-center mb-4 gap-2">
          {Object.keys(rankingData).map((category) => (
            <button
              key={category}
              className={`py-2 px-4 rounded-md flex items-center ${
                activeTab === category
                  ? "bg-sky-700 text-white"
                  : "bg-white text-gray-700 hover:bg-slate-300"
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
          <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              {getCategoryIcon(activeTab)}
              <span className="ml-2">
                Ranking {activeTab} - {activeSexo} ({activeFaixaEtaria} anos)
              </span>
            </h2>
            <div className="text-sm text-gray-500">Top 5 Atletas</div>
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
                {rankingData[activeTab] &&
                  rankingData[activeTab].map((user, index) => {
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
                              <div className="text-xs text-gray-500">
                                {user.idade} anos
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
