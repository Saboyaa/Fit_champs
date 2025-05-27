import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { useGlobalContext } from '@/Context/ContextoGlobal';
import Header from "../../components/ComponentsHome/Header";
import UserProfileCard from "../../components/ComponentsHome/UserProfileCard";
import MuscleRecordsCard from "../../components/ComponentsHome/MuscleRecordCard";
import EditProfileModal from "../Components/ComponentsHome/EditProfileModal";
import EditGoalModal from "../Components/ComponentsHome/EditGoalModal";
import { useNotificationState } from "../../Context/notification";
import peito from "../../images/peito.png";

const Home = ({ navigation }) => {
  const { isMenuOpen } = useGlobalContext();

  const [userData, setUserData] = useState({
    nome: "João Silva",
    foto: peito,
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

  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentEditGroup, setCurrentEditGroup] = useState(null);

  const { notification, showNotification } = useNotificationState();

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

  useEffect(() => {
    calculateIMC(userData.altura, userData.peso);
  }, [userData.altura, userData.peso]);

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

  const openGoalModal = (grupo) => {
    setCurrentEditGroup(grupo);
    setIsGoalModalOpen(true);
  };

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

  const handleSaveUserData = (updatedData) => {
    setUserData(updatedData);
    calculateIMC(updatedData.altura, updatedData.peso);
    setIsProfileModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.content, isMenuOpen && styles.menuOpenStyle]}>
          {/* Header */}
          <Header navigation={navigation} />

          {/* User Profile Card */}
          <UserProfileCard
            userData={userData}
            openProfileModal={() => setIsProfileModalOpen(true)}
          />

          {/* Muscle Records Card */}
	  <MuscleRecordsCard
            recordesMusculares={recordesMusculares}
            openGoalModal={openGoalModal}
          />} 
        </View>
      </ScrollView>

      {/* Volume Goal Edit Modal */}
      {/*<EditGoalModal
        visible={isGoalModalOpen}
        grupo={currentEditGroup}
        initialValue={
          recordesMusculares.find((r) => r.grupo === currentEditGroup)
            ?.metaVolume
        }
        onSave={updateVolumeGoal}
        onCancel={() => setIsGoalModalOpen(false)}
      />*/}

      {/* Profile Edit Modal */}
      {/*<EditProfileModal
        visible={isProfileModalOpen}
        userData={userData}
        onSave={handleSaveUserData}
        onCancel={() => setIsProfileModalOpen(false)}
      />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // slate-900 equivalent
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  menuOpenStyle: {
    marginLeft: 256, // Adjust based on your menu width
    opacity: 0.5,
  },
});

export default Home;
