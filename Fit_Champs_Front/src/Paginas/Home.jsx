import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context/ContextoGlobal";
import Header from "../Components/ComponentsHome/Header";
import UserProfileCard from "../Components/ComponentsHome/UserProfileCard";
import MuscleRecordsCard from "../Components/ComponentsHome/MuscleRecordCard";
import EditProfileModal from "../Components/ComponentsHome/EditProfileModal";
import EditGoalModal from "../Components/ComponentsHome/EditGoalModal";

//import userService from "../services/userService"; // Importar o serviço de usuário para update de perfil

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
    //imc: userService.calculateIMC(178, 75), ficará assim depois de integrar com o backend
  });

  // State para gerenciar os modais
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentEditGroup, setCurrentEditGroup] = useState(null);

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [updating, setUpdating] = useState(false);

  // // Estados para notificações
  // const [notification, setNotification] = useState({
  //   message: "",
  //   type: "",
  //   visible: false,
  // });

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

  // Calcular IMC quando o componente montar ou quando altura/peso mudar TIRAR ISSO DPS DE INTEGRAR COM O BACKEND
  useEffect(() => {
    calculateIMC(userData.altura, userData.peso);
  }, [userData.altura, userData.peso]);

  // Função para calcular o IMC e sua classificação TIRAR ISSO DPS DE INTEGRAR COM O BACKEND
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

  //   const showNotification = (message, type) => {
  //   setNotification({
  //     message,
  //     type,
  //     visible: true,
  //   });

  //   setTimeout(() => {
  //     setNotification(prev => ({ ...prev, visible: false }));
  //   }, 4000);
  // };

  // Function to open goal edit modal
  const openGoalModal = (grupo) => {
    setCurrentEditGroup(grupo);
    setIsGoalModalOpen(true);
  };

  //  const updateVolumeGoal = async (grupo, newGoal) => {
  //   try {
  //     setUpdating(true);

  //     // Atualizar no servidor usando o userService
  //     await userService.updateVolumeGoal(grupo, newGoal);

  //     // Atualizar estado local apenas se a requisição foi bem-sucedida
  //     setRecordesMusculares(prev =>
  //       prev.map(recorde =>
  //         recorde.grupo === grupo
  //           ? { ...recorde, metaVolume: Number(newGoal) }
  //           : recorde
  //       )
  //     );

  //     showNotification("Meta atualizada com sucesso!", "success");
  //     setIsGoalModalOpen(false);

  //   } catch (error) {
  //     console.error("Erro ao atualizar meta:", error);
  //     showNotification(error.message, "error");
  //   } finally {
  //     setUpdating(false);
  //   }
  // };

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

  // Função para salvar os dados do usuário
  // const handleSaveUserData = async (updatedData) => {
  //   try {
  //     setUpdating(true);
  //     setError("");

  //     // Atualizar no servidor usando o userService
  //     const response = await userService.updateProfile(updatedData);

  //     // Calcular novo IMC
  //     const newIMC = userService.calculateIMC(updatedData.altura, updatedData.peso);

  //     // Atualizar estado local
  //     setUserData({
  //       ...updatedData,
  //       imc: newIMC
  //     });

  //     showNotification("Perfil atualizado com sucesso!", "success");
  //     setIsProfileModalOpen(false);

  //   } catch (error) {
  //     console.error("Erro ao atualizar perfil:", error);
  //     showNotification(error.message, "error");
  //   } finally {
  //     setUpdating(false);
  //   }};

  // Função para salvar os dados do usuário
  const handleSaveUserData = (updatedData) => {
    setUserData(updatedData);
    calculateIMC(updatedData.altura, updatedData.peso);
    setIsProfileModalOpen(false);
  };

  return (
    <div className="w-screen h-full flex justify-center bg-gradient-to-b from-slate-900 via-sky-900 to-slate-900 p-6">
      <div
        className={`rounded-md mt-6 transition-all duration-300 ${
          isMenuOpen ? "w-[90%] ml-64 opacity-50" : "w-full"
        }`}
      >
        {/* Notificação
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
        )} */}
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
          // loading={updating}
        />
      )}

      {/* Modal de Edição de Perfil */}
      {isProfileModalOpen && (
        <EditProfileModal
          userData={userData}
          onSave={handleSaveUserData}
          onCancel={() => setIsProfileModalOpen(false)}
          //loading={updating}
        />
      )}
    </div>
  );
};

export default Home;
