import { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "../Hooks/ContextoGlobal";

import RankingHeader from "../Components/ComponentsRankSemanal/RankingHeader";
import UserProfileSummary from "../Components/ComponentsRankSemanal/UserProfileSummary";
import FilterBar from "../Components/ComponentsRankSemanal/FilterBar";
import CategoryTabs from "../Components/ComponentsRankSemanal/CategoryTabs";
import RankingTable from "../Components/ComponentsRankSemanal/RankingTable";
import RankingCounter from "../Components/ComponentsRankSemanal/RankingCounter";
import { getCategoryIcon } from "../Components/ComponentsRankSemanal/iconsUtils";

import {
  SEXOS,
  FAIXAS_ETARIAS,
  CATEGORY_ICONS,
} from "../Classes/usuarioprorank";

import rankService from "../services/rankService";
import userService from "../services/userService";

const RankingSemanal = () => {
  const { isMenuOpen } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Geral");
  const [userRanking, setUserRanking] = useState(null);
  const [activeSexo, setActiveSexo] = useState("Masculino");
  const [activeFaixaEtaria, setActiveFaixaEtaria] = useState("20-40");
  const [rankingData, setRankingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: "",
    nome: "",
    sexo: "",
    idade: 0,
  });

  const getUser = async () => {
    try {
      const response = await userService.getCurrentUser2();

      setUserData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Função para filtrar os rankings por sexo e faixa etária
  const filtrarRankings = async (sex, ageRange, activeTab) => {
    setIsLoading(true);

    const faixa = FAIXAS_ETARIAS.find((f) => f.id === ageRange);
    if (!faixa) return {};

    const { max } = faixa.range;

    try {
      const tabMap = {
        Geral: "general",
        Braço: "arm",
        Costas: "back",
        Peito: "chest",
        Perna: "leg",
        Ombro: "shoulder",
      };

      const response = await rankService[`${tabMap[activeTab]}Rank`](sex, max);
      response.forEach((user, index) => {
        user.posicaoAtual = index + 1;
      });

      setRankingData(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Atualizar rankings quando o sexo ou faixa etária mudar
  useEffect(() => {
    filtrarRankings(activeSexo, activeFaixaEtaria, activeTab);
  }, [activeSexo, activeFaixaEtaria, activeTab]);

  // Efeito para encontrar os dados do usuário atual em cada ranking
  useEffect(() => {
    if (Object.keys(rankingData).length === 0) return;

    const userRankings = {};

    Object.keys(rankingData).forEach((category) => {
      const ranking = rankingData[category];
      const userIndex = ranking.findIndex((user) => user.id === userData.id);

      if (userIndex !== -1) {
        userRankings[category] = {
          posicao: userIndex + 1,
          pontos: ranking[userIndex].pontos,
          total: ranking.length,
          posicaoAnterior: ranking[userIndex].posicaoAnterior,
        };
      }
    });

    setUserRanking(userRankings);
  }, [userData, rankingData]);

  // Obter sexo e faixa etária do usuário atual
  const userInfo = useMemo(() => {
    // Determinar a faixa etária
    const faixaEtaria =
      FAIXAS_ETARIAS.find(
        (f) => userData.idade >= f.range.min && userData.idade < f.range.max
      )?.id || "Desconhecida";

    return { sexo: userData.sexo, faixaEtaria };
  }, [userData]);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 flex justify-center p-6 overflow-y-auto">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        {/* Cabeçalho */}
        <RankingHeader />

        {/* Resumo do perfil do usuário com suas posições no ranking */}
        {userRanking && (
          <UserProfileSummary
            userRanking={userRanking}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            renderCategoryIcon={(category) =>
              getCategoryIcon(category, CATEGORY_ICONS)
            }
          />
        )}

        {/* Área de filtros */}
        <FilterBar
          sexos={SEXOS}
          faixasEtarias={FAIXAS_ETARIAS}
          activeSexo={activeSexo}
          activeFaixaEtaria={activeFaixaEtaria}
          setActiveSexo={setActiveSexo}
          setActiveFaixaEtaria={setActiveFaixaEtaria}
          userInfo={userInfo}
        />

        {/* Tabs para navegação entre categorias */}
        <CategoryTabs
          categories={Object.keys(CATEGORY_ICONS)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          renderCategoryIcon={(category) =>
            getCategoryIcon(category, CATEGORY_ICONS)
          }
        />

        {/* Tabela de ranking */}
        <RankingTable
          activeTab={activeTab}
          activeSexo={activeSexo}
          activeFaixaEtaria={activeFaixaEtaria}
          rankingData={rankingData}
          isLoading={isLoading}
          userData={userData.id}
        />

        {/* Contador de rankings ativos */}
        {userRanking && Object.keys(userRanking).length > 0 && (
          <RankingCounter count={Object.keys(userRanking).length} />
        )}
      </div>
    </div>
  );
};

export default RankingSemanal;
