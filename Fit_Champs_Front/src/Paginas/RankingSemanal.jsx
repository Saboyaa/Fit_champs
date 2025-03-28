import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "../Context/ContextoGlobal";
import {
  Trophy,
  Medal,
  ArrowUp,
  ArrowDown,
  Minus,
  User,
  Filter,
} from "lucide-react";

// Importação dos dados constantes
import {
  RANKING_DATA,
  SEXOS,
  FAIXAS_ETARIAS,
  CATEGORY_ICONS,
} from "../Classes/usuarioprorank";

// Importação de imagens locais
import peito from "../images/peito.png";
import perna from "../images/perna.png";
import ombro from "../images/ombro.png";
import costas from "../images/costas.png";
import braco from "../images/musculo.png";

// Mapeamento de ícones para importações reais
const ICON_IMPORTS = {
  "peito.png": peito,
  "perna.png": perna,
  "ombro.png": ombro,
  "costas.png": costas,
  "musculo.png": braco,
};

const RankingSemanal = () => {
  const { isMenuOpen } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Geral");
  const [userData, setUserData] = useState(null);
  const [activeSexo, setActiveSexo] = useState("Masculino");
  const [activeFaixaEtaria, setActiveFaixaEtaria] = useState("20-40");
  const [rankingData, setRankingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // ID do usuário atual (seria obtido por autenticação em uma aplicação real)
  const currentUserId = "user123";

  // Função para filtrar os rankings por sexo e faixa etária
  const filtrarRankings = (sexo, faixaEtaria) => {
    setIsLoading(true);

    const faixa = FAIXAS_ETARIAS.find((f) => f.id === faixaEtaria);
    if (!faixa) return {};

    const { min, max } = faixa.range;
    const rankingsFiltrados = {};

    // Simular uma chamada de API real com um pequeno atraso
    setTimeout(() => {
      // Filtrar cada categoria
      Object.keys(RANKING_DATA).forEach((category) => {
        const usuariosFiltrados = RANKING_DATA[category]
          .filter(
            (user) =>
              user.sexo === sexo && user.idade >= min && user.idade < max
          )
          .sort((a, b) => b.pontos - a.pontos)
          .slice(0, 5);

        // Atualizar a posição atual
        usuariosFiltrados.forEach((user, index) => {
          user.posicaoAtual = index + 1;
        });

        rankingsFiltrados[category] = usuariosFiltrados;
      });

      setRankingData(rankingsFiltrados);
      setIsLoading(false);
    }, 300);
  };

  // Atualizar rankings quando o sexo ou faixa etária mudar
  useEffect(() => {
    filtrarRankings(activeSexo, activeFaixaEtaria);
  }, [activeSexo, activeFaixaEtaria]);

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

  // Função para renderizar ícone de categoria
  const renderCategoryIcon = (category) => {
    const iconKey = CATEGORY_ICONS[category];

    if (!iconKey) return null;

    if (iconKey === "trophy") {
      return <Trophy className="w-6 h-6 text-yellow-500" />;
    } else {
      const imageSource = ICON_IMPORTS[iconKey];
      return imageSource ? (
        <img src={imageSource} alt={category} className="w-6 h-6" />
      ) : null;
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
  const userInfo = useMemo(() => {
    // Procurar usuário no ranking geral
    const user = RANKING_DATA.Geral.find((u) => u.id === currentUserId);
    if (!user) return { sexo: "Desconhecido", faixaEtaria: "Desconhecida" };

    // Determinar a faixa etária
    const faixaEtaria =
      FAIXAS_ETARIAS.find(
        (f) => user.idade >= f.range.min && user.idade < f.range.max
      )?.id || "Desconhecida";

    return { sexo: user.sexo, faixaEtaria };
  }, [currentUserId]);

  return (
    <div className="w-screen min-h-screen bg-sky-950 flex justify-center p-6 overflow-y-auto">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        <div className="text-center bg-sky-900 p-6 rounded-xl w-full md:w-[90%] lg:w-[80%] mx-auto mb-6 shadow-lg">
          <div className="flex items-center justify-center mb-3">
            <Trophy className="text-yellow-400 mr-3" size={28} />
            <h1 className="text-3xl font-bold text-white">Ranking Semanal</h1>
          </div>

          <p className="text-blue-200 mb-4">
            Veja como você se compara com outros atletas esta semana!
          </p>

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

          {userData && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-blue-100 mb-3">
                Sua Posição Atual
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.keys(userData).map((category) => (
                  <div
                    key={category}
                    className={`bg-sky-800/60 p-3 rounded-lg shadow-md ${
                      activeTab === category ? "ring-2 ring-blue-400" : ""
                    } hover:bg-sky-700/60 transition-colors cursor-pointer`}
                    onClick={() => setActiveTab(category)}
                  >
                    <div className="flex items-center justify-center mb-2">
                      {renderCategoryIcon(category)}
                      <h3 className="text-lg font-semibold ml-2 text-white">
                        {category}
                      </h3>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {userData[category].posicao}
                      </span>
                      <span className="text-blue-200 text-sm ml-1">
                        /{userData[category].total}
                      </span>
                    </div>
                    <div className="mt-1 flex justify-center">
                      <div className="flex items-center">
                        {getPositionChangeIcon(
                          userData[category].posicao,
                          userData[category].posicaoAnterior
                        )}
                        <span
                          className={`text-xs ml-1 ${
                            userData[category].posicaoAnterior >
                            userData[category].posicao
                              ? "text-green-400"
                              : userData[category].posicaoAnterior <
                                userData[category].posicao
                              ? "text-red-400"
                              : "text-gray-400"
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
                      <span className="text-sm font-medium text-blue-100">
                        {userData[category].pontos} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-center mb-6 gap-4">
          <div className="bg-sky-800 p-3 rounded-lg shadow-md">
            <div className="flex items-center text-white font-medium mb-2">
              <Filter size={16} className="mr-2 text-blue-300" />
              <span>Filtrar por Sexo</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {SEXOS.map((sexo) => (
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
              {FAIXAS_ETARIAS.map((faixa) => (
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

        {/* Navegação entre tabs */}
        <div className="flex flex-wrap justify-center mb-6 gap-2">
          {Object.keys(rankingData).map((category) => (
            <button
              key={category}
              className={`py-2.5 px-4 rounded-lg flex items-center transition-all ${
                activeTab === category
                  ? "bg-sky-700 text-white shadow-md"
                  : "bg-sky-800/50 text-white hover:bg-sky-700/50"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {renderCategoryIcon(category)}
              <span className="ml-2">{category}</span>
            </button>
          ))}
        </div>

        {/* Tabela de ranking */}
        <div className="bg-sky-900/50 rounded-lg shadow-lg overflow-hidden w-full md:w-[90%] lg:w-[80%] mx-auto border border-sky-800">
          <div className="p-4 bg-sky-800 border-b border-sky-700 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center text-white">
              {renderCategoryIcon(activeTab)}
              <span className="ml-2">
                Ranking {activeTab} - {activeSexo} ({activeFaixaEtaria})
              </span>
            </h2>
            <div className="text-sm bg-sky-700 px-3 py-1 rounded-full text-blue-100">
              Top 5 Atletas
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 flex justify-center items-center">
              <div className="w-5 h-5 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-blue-200">Carregando...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sky-800/70">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                      Posição
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                      Atleta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                      Pontos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                      Variação
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-800/30">
                  {rankingData[activeTab] &&
                    rankingData[activeTab].map((user, index) => {
                      const isCurrentUser = user.id === currentUserId;
                      return (
                        <tr
                          key={user.id}
                          className={`transition-colors ${
                            isCurrentUser
                              ? "bg-blue-900/50"
                              : index % 2 === 0
                              ? "bg-sky-900/30"
                              : "bg-sky-900/10"
                          } hover:bg-sky-800/30`}
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
                                    className="h-10 w-10 rounded-full object-cover"
                                    src={user.foto}
                                    alt={user.nome}
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-blue-800/50 flex items-center justify-center">
                                    <User className="h-6 w-6 text-blue-300" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-white flex items-center">
                                  {user.nome}
                                  {isCurrentUser && (
                                    <span className="ml-2 inline-block bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                                      Você
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-blue-300">
                                  {user.idade} anos
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white bg-sky-800/50 rounded-full px-3 py-1 inline-block text-center">
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
                                    ? "text-green-400"
                                    : user.posicaoAnterior < index + 1
                                    ? "text-red-400"
                                    : "text-gray-400"
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
          )}

          <div className="p-4 border-t border-sky-800/50 bg-sky-800/30">
            <p className="text-xs text-blue-200 text-center">
              A pontuação é calculada com base no volume de treino, intensidade
              e frequência semanal.
            </p>
          </div>
        </div>

        {/* Contador de rankings ativos */}
        {userData && Object.keys(userData).length > 0 && (
          <div className="fixed bottom-4 right-4">
            <div className="bg-sky-700 text-white p-2 rounded-full shadow-lg">
              <span className="px-2 font-bold">
                {Object.keys(userData).length}
              </span>
              <span className="text-sm">Rankings</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingSemanal;
