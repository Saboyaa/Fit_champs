import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { useGlobalContext } from '@/Context/ContextoGlobal';
import Header from "../../components/ComponentsHome/Header";
import UserProfileCard from "../../components/ComponentsHome/UserProfileCard";
import MuscleRecordsCard from "../../components/ComponentsHome/MuscleRecordCard";
import { useNotificationState } from "../../Context/notification";

// Type definitions
interface IMC {
  value: number | null;
  classification: string;
}

interface UserData {
  nome: string;
  foto: any; // For require() imported images
  telefone: string;
  email: string;
  idade: number;
  altura: number;
  peso: number;
  posicaoRank: number;
  sexo: string;
  cidade: string;
  imc: IMC;
}

interface MuscleRecord {
  grupo: string;
  recordeVolume: number;
  metaVolume: number;
  data: string;
}

interface HomeProps {
  navigation: any; // You might want to import proper navigation types from @react-navigation/native
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { isMenuOpen } = useGlobalContext();

  const [userData, setUserData] = useState<UserData>({
    nome: "João Silva",
    foto: require('../../images/peito.png'),
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

  const [isGoalModalOpen, setIsGoalModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [currentEditGroup, setCurrentEditGroup] = useState<string | null>(null);

  const { notification, showNotification } = useNotificationState();

  const [recordesMusculares, setRecordesMusculares] = useState<MuscleRecord[]>([
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

  const calculateIMC = (altura: number, peso: number): void => {
    if (altura && peso) {
      const heightInMeters = altura / 100;
      const imcValue = parseFloat((peso / (heightInMeters * heightInMeters)).toFixed(2));
      let classification: string = "";

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

  const openGoalModal = (grupo: string): void => {
    setCurrentEditGroup(grupo);
    setIsGoalModalOpen(true);
  };

  const updateVolumeGoal = (grupo: string, newGoal: number | string): void => {
    setRecordesMusculares((prev) =>
      prev.map((recorde) =>
        recorde.grupo === grupo
          ? { ...recorde, metaVolume: Number(newGoal) }
          : recorde
      )
    );
    setIsGoalModalOpen(false);
  };

  const handleSaveUserData = (updatedData: UserData): void => {
    setUserData(updatedData);
    calculateIMC(updatedData.altura, updatedData.peso);
    setIsProfileModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.content, isMenuOpen && styles.menuOpenStyle]}>
          {/* Header */}
          

          <UserProfileCard
            userData={userData}
            openProfileModal={() => setIsProfileModalOpen(true)}
          />
          
          <MuscleRecordsCard
            recordesMusculares={recordesMusculares}
            openGoalModal={openGoalModal}
          />
        </View>
      </ScrollView>
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