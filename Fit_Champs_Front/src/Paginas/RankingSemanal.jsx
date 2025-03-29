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
  Crown,
  BarChart2,
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
      return (
        <div className="bg-yellow-400/20 p-2 rounded-full">
          <Medal size={24} className="text-yellow-500" />
        </div>
      );
    } else if (position === 2) {
      return (
        <div className="bg-gray-400/20 p-2 rounded-full">
          <Medal size={24} className="text-gray-400" />
        </div>
      );
    } else if (position === 3) {
      return (
        <div className="bg-amber-700/20 p-2 rounded-full">
          <Medal size={24} className="text-amber-700" />
        </div>
      );
    }
    return (
      <div className="bg-slate-700/30 p-2 rounded-full flex items-center justify-center w-10 h-10">
        <span className="text-lg font-bold text-slate-300">{position}</span>
      </div>
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
    <div className="w-screen min-h-screen bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 flex justify-center p-6 overflow-y-auto">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        {/* Header moderno */}
        <div className="text-center bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 p-6 rounded-2xl w-full md:w-[90%] lg:w-[80%] mx-auto mb-6 shadow-xl border border-indigo-500/30 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-3">
            <Crown className="text-yellow-400 mr-3" size={32} />
            <h1 className="text-3xl font-bold bg-clip-text text-white">
              Ranking Semanal
            </h1>
          </div>

          <p className="text-blue-200 mb-4">
            Veja como você se compara com outros atletas esta semana!
          </p>

          <div className="mb-4 bg-gradient-to-r from-slate-800 to-indigo-900/50 p-5 rounded-xl mx-auto max-w-md border border-indigo-700/30 shadow-lg">
            <div className="text-white font-semibold mb-3 flex items-center justify-center">
              <User
                className="mr-2 bg-blue-500/20 p-1 rounded-full"
                size={20}
              />
              <span>Seu Perfil</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-gradient-to-r from-blue-600/40 to-blue-500/30 px-4 py-2 rounded-full text-white shadow-sm">
                <span className="font-medium">{userInfo.sexo}</span>
              </div>
              <div className="bg-gradient-to-r from-green-600/40 to-green-500/30 px-4 py-2 rounded-full text-white shadow-sm">
                <span className="font-medium">
                  Faixa etária: {userInfo.faixaEtaria}
                </span>
              </div>
            </div>
          </div>

          {userData && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-blue-100 mb-4 flex items-center justify-center">
                <Trophy className="text-yellow-400 mr-2" size={22} />
                Sua Posição Atual
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.keys(userData).map((category) => (
                  <div
                    key={category}
                    className={`bg-gradient-to-br from-slate-800/80 to-indigo-900/30 p-4 rounded-xl shadow-md border ${
                      activeTab === category
                        ? "border-blue-500/50 shadow-blue-500/20"
                        : "border-slate-700/30"
                    } hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 hover:border-blue-400/50`}
                    onClick={() => setActiveTab(category)}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="bg-indigo-900/50 p-2 rounded-lg mr-2">
                        {renderCategoryIcon(category)}
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {category}
                      </h3>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {userData[category].posicao}
                      </span>
                      <span className="text-blue-200 text-sm ml-1">
                        /{userData[category].total}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-center">
                      <div className="flex items-center bg-slate-800/50 px-3 py-1 rounded-full">
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
                    <div className="mt-2 text-center">
                      <span className="text-sm font-medium bg-indigo-900/50 px-3 py-1 rounded-full text-blue-100 inline-block">
                        {userData[category].pontos} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filtros com design aprimorado */}
        <div className="flex flex-col md:flex-row justify-center mb-6 gap-4">
          <div className="bg-gradient-to-br from-slate-800 to-indigo-900/30 p-4 rounded-xl shadow-lg border border-indigo-500/20">
            <div className="flex items-center text-white font-medium mb-3">
              <Filter
                size={18}
                className="mr-2 text-blue-300 bg-blue-500/20 p-1 rounded-full"
              />
              <span>Filtrar por Sexo</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {SEXOS.map((sexo) => (
                <button
                  key={sexo.id}
                  className={`py-2 px-4 rounded-lg transition-all duration-300 shadow-md ${
                    activeSexo === sexo.id
                      ? sexo.id === "Masculino"
                        ? "bg-gradient-to-r from-blue-700 to-blue-600 text-white"
                        : "bg-gradient-to-r from-pink-600 to-pink-500 text-white"
                      : "bg-slate-700 text-white hover:bg-slate-600"
                  } ${
                    userInfo.sexo === sexo.id ? "ring-2 ring-blue-300" : ""
                  } transform hover:scale-105`}
                  onClick={() => setActiveSexo(sexo.id)}
                >
                  {sexo.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-indigo-900/30 p-4 rounded-xl shadow-lg border border-indigo-500/20">
            <div className="flex items-center text-white font-medium mb-3">
              <Filter
                size={18}
                className="mr-2 text-blue-300 bg-green-500/20 p-1 rounded-full"
              />
              <span>Filtrar por Idade</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {FAIXAS_ETARIAS.map((faixa) => (
                <button
                  key={faixa.id}
                  className={`py-2 px-3 rounded-lg transition-all duration-300 shadow-md ${
                    activeFaixaEtaria === faixa.id
                      ? "bg-gradient-to-r from-green-700 to-green-600 text-white"
                      : "bg-slate-700 text-white hover:bg-slate-600"
                  } ${
                    userInfo.faixaEtaria === faixa.id
                      ? "ring-2 ring-green-300"
                      : ""
                  } transform hover:scale-105`}
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
              className={`py-2.5 px-5 rounded-xl flex items-center transition-all duration-300 ${
                activeTab === category
                  ? "bg-gradient-to-r from-indigo-700 to-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-slate-800/50 text-white hover:bg-slate-700/50 hover:scale-105"
              } border ${
                activeTab === category
                  ? "border-blue-500/50"
                  : "border-slate-700/30"
              }`}
              onClick={() => setActiveTab(category)}
            >
              <div className="bg-indigo-900/50 p-1 rounded-lg mr-2">
                {renderCategoryIcon(category)}
              </div>
              <span className="font-medium">{category}</span>
            </button>
          ))}
        </div>

        {/* Tabela de ranking */}
        <div className="bg-gradient-to-br from-slate-800/90 to-indigo-900/20 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden w-full md:w-[90%] lg:w-[80%] mx-auto border border-indigo-500/20">
          <div className="p-5 bg-gradient-to-r from-slate-800 to-indigo-900/70 border-b border-indigo-500/30 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center text-white">
              <div className="bg-indigo-900/50 p-2 rounded-lg mr-3">
                {renderCategoryIcon(activeTab)}
              </div>
              <span className="bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent">
                Ranking {activeTab} - {activeSexo} ({activeFaixaEtaria})
              </span>
            </h2>
            <div className="text-sm bg-indigo-800/50 px-4 py-2 rounded-full text-blue-100 border border-indigo-700/30">
              Top 5 Atletas
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 flex justify-center items-center">
              <div className="w-8 h-8 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-4 text-blue-200 text-lg">
                Carregando ranking...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider border-b border-slate-700/30">
                      Posição
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider border-b border-slate-700/30">
                      Atleta
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider border-b border-slate-700/30">
                      Pontos
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-blue-200 uppercase tracking-wider border-b border-slate-700/30">
                      Variação
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {rankingData[activeTab] &&
                    rankingData[activeTab].map((user, index) => {
                      const isCurrentUser = user.id === currentUserId;
                      return (
                        <tr
                          key={user.id}
                          className={`transition-colors ${
                            isCurrentUser
                              ? "bg-blue-900/20 hover:bg-blue-900/30"
                              : index % 2 === 0
                              ? "bg-slate-800/20 hover:bg-slate-800/40"
                              : "bg-slate-900/20 hover:bg-slate-800/40"
                          }`}
                        >
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="flex items-center">
                              {renderMedal(index + 1)}
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12">
                                {user.foto ? (
                                  <img
                                    className="h-12 w-12 rounded-full object-cover border-2 border-slate-700/50"
                                    src={user.foto}
                                    alt={user.nome}
                                  />
                                ) : (
                                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-700 to-blue-600 flex items-center justify-center">
                                    <User className="h-6 w-6 text-blue-100" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-base font-medium text-white flex items-center">
                                  {user.nome}
                                  {isCurrentUser && (
                                    <span className="ml-2 inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs px-3 py-1 rounded-full">
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
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="text-sm text-white bg-gradient-to-r from-indigo-900/70 to-slate-800/70 rounded-full px-4 py-2 inline-block text-center font-medium border border-indigo-700/30">
                              {user.pontos} pts
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="flex items-center bg-slate-800/50 px-3 py-1 rounded-lg inline-flex">
                              {getPositionChangeIcon(
                                index + 1,
                                user.posicaoAnterior
                              )}
                              <span
                                className={`ml-1 font-medium ${
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

          <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
            <p className="text-sm text-blue-200 text-center">
              A pontuação é calculada com base no volume de treino, intensidade
              e frequência semanal.
            </p>
          </div>
        </div>

        {/* Contador flutuante */}
        {userData && Object.keys(userData).length > 0 && (
          <div className="fixed bottom-4 right-4">
            <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white p-3 rounded-full shadow-xl border border-blue-400/30">
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
