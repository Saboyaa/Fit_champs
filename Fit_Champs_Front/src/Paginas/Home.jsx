import { useState, useEffect } from "react";

import { useNotificationState } from "../Hooks/notification";
import { useGlobalContext } from "../Hooks/ContextoGlobal";

import Header from "../Components/ComponentsHome/Header";
import UserProfileCard from "../Components/ComponentsHome/UserProfileCard";
import MuscleRecordsCard from "../Components/ComponentsHome/MuscleRecordCard";
import EditProfileModal from "../Components/ComponentsHome/EditProfileModal";
import EditGoalModal from "../Components/ComponentsHome/EditGoalModal";
import peito from "../images/peito.png";

import userService from "../services/userService";
import trainingService from "../services/trainingService";

const Home = () => {
  const { isMenuOpen } = useGlobalContext();

  // Dados de exemplo do usuário com IMC adicionado
  const [userData, setUserData] = useState({
    nome: "",
    foto: peito,
    telefone: "",
    email: "",
    idade: 0,
    altura: 0,
    peso: 0,
    recordes: {
      peito: 0,
      costas: 0,
      braço: 0,
      perna: 0,
      ombro: 0,
    },
    metas: {
      peito: 3500,
      costas: 3400,
      braço: 2100,
      perna: 4500,
      ombro: 2300,
    },
    sexo: "Masculino",
    cidade: "",
    imc: { value: null, classification: "" },
  });

  // State para gerenciar os modais
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentEditGroup, setCurrentEditGroup] = useState(null);

  const [loading, setLoading] = useState(false); // isso habilitara todos os loading
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  // Dados de exemplo dos recordes de peso
  const [recordesMusculares, setRecordesMusculares] = useState([
    {
      grupo: "Peito",
      recordeVolume: 0,
      metaVolume: 3500,
      data: "",
    },
    {
      grupo: "Costas",
      recordeVolume: 0,
      metaVolume: 3400,
      data: "",
    },
    {
      grupo: "Perna",
      recordeVolume: 0,
      metaVolume: 4500,
      data: "",
    },
    {
      grupo: "Ombro",
      recordeVolume: 0,
      metaVolume: 2300,
      data: "",
    },
    {
      grupo: "Braço",
      recordeVolume: 0,
      metaVolume: 2100,
      data: "",
    },
  ]);

  useEffect(() => {
    loadUserData(); // Esta função já chama loadTrainingData internamente
  }, []);

  const { notification, showNotification } = useNotificationState();

  // Função para carregar dados do usuário do servidor
  const loadUserData = async () => {
    try {
      setLoading(true);
      setError("");

      // Buscar dados do perfil do usuário (inclui metas)
      const response = await userService.getCurrentUser();
      const user = response.user || response;

      // Calcular IMC e atualizar estado
      const userWithIMC = {
        ...user,
        imc: userService.calculateIMC(user.altura, user.peso),
      };

      setUserData(userWithIMC);

      // Buscar histórico de treinos e calcular recordes
      await loadTrainingData(user.metas);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar histórico de treinos e calcular recordes
  const loadTrainingData = async (metas) => {
    try {
      const treinos = await trainingService.getFormattedTrainingData();
      // Calcular recordes dinamicamente a partir do histórico
      const recordesCalculados = userService.calculateRecordsFromHistory(
        treinos,
        metas
      );
      setRecordesMusculares(recordesCalculados);
    } catch (error) {
      console.error("Erro ao carregar dados de treino:", error);
    }
  };

  const openGoalModal = (grupo) => {
    setCurrentEditGroup(grupo);
    setIsGoalModalOpen(true);
  };

  const updateVolumeGoal = async (grupo, newGoal) => {
    try {
      setUpdating(true);

      // Atualizar no servidor usando o userService
      await userService.updateVolumeGoal(grupo, newGoal);

      // Atualizar estado local apenas se a requisição foi bem-sucedida
      setRecordesMusculares((prev) =>
        prev.map((recorde) =>
          recorde.grupo === grupo
            ? { ...recorde, metaVolume: Number(newGoal) }
            : recorde
        )
      );

      showNotification("Meta atualizada com sucesso!", "success");
      setIsGoalModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar meta:", error);
      showNotification(error.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveUserData = async (updatedData) => {
    try {
      setUpdating(true);
      setError("");

      // Atualizar no servidor usando o userService
      await userService.updateProfile(updatedData);

      // Recarrega os dados do usuário atualizados do servidor
      await loadUserData();

      showNotification("Perfil atualizado com sucesso!", "success");
      setIsProfileModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      showNotification(error.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="w-screen h-full flex justify-center bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 p-6">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        {notification.visible && (
          <div
            className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-lg transform transition-all duration-300 ${
              notification.type === "error"
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
                : "bg-gradient-to-r from-green-600 to-green-700 text-white"
            }`}
          >
            {notification.message}
          </div>
        )}
        {/* Cabeçalho moderno */}
        <Header />

        <div className="max-w-6xl mx-auto">
          {/* Cartão de perfil do usuário */}
          <UserProfileCard
            userData={userData}
            openProfileModal={() => setIsProfileModalOpen(true)}
          />

          {/* Cartão de recordes musculares */}
          <MuscleRecordsCard
            recordesMusculares={recordesMusculares}
            openGoalModal={openGoalModal}
          />
        </div>
      </div>

      {/* Volume Goal Edit Modal */}
      {isGoalModalOpen && (
        <EditGoalModal
          grupo={currentEditGroup}
          initialValue={
            recordesMusculares.find((r) => r.grupo === currentEditGroup)
              ?.metaVolume
          }
          onSave={updateVolumeGoal}
          onCancel={() => setIsGoalModalOpen(false)}
          loading={updating}
        />
      )}

      {/* Modal de Edição de Perfil */}
      {isProfileModalOpen && (
        <EditProfileModal
          userData={userData}
          onSave={handleSaveUserData}
          onCancel={() => setIsProfileModalOpen(false)}
          loading={updating}
        />
      )}
    </div>
  );
};

export default Home;
