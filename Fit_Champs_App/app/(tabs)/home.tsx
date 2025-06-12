import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useGlobalContext } from '@/Context/ContextoGlobal';
import Header from "../../components/ComponentsHome/Header";
import UserProfileCard from "../../components/ComponentsHome/UserProfileCard";
import MuscleRecordsCard from "../../components/ComponentsHome/MuscleRecordCard";
import { useNotificationState } from "../../Context/notification";
import userService from '@/services/userService';
import trainingService from '@/services/trainingService';

// Tipos
interface IMC {
  value: number | null;
  classification: string;
}

interface UserData {
  nome: string;
  foto: any;
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
  data: string | null;
}

interface HomeProps {
  navigation: any;
}

export default function Home({ navigation }: HomeProps) {
  const { isMenuOpen } = useGlobalContext();
  const { showNotification } = useNotificationState();

  const [userData, setUserData] = useState<UserData>({
    nome: "",
    foto: require('../../images/peito.png'),
    telefone: "",
    email: "",
    idade: 0,
    altura: 0,
    peso: 0,
    posicaoRank: 0,
    sexo: "",
    cidade: "",
    imc: { value: null, classification: "" },
  });
  const [recordesMusculares, setRecordesMusculares] = useState<MuscleRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modais e edição
  const [isGoalModalOpen, setIsGoalModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [currentEditGroup, setCurrentEditGroup] = useState<string | null>(null);

  const openGoalModal = (grupo: string): void => {
    setCurrentEditGroup(grupo);
    setIsGoalModalOpen(true);
  };

  const updateVolumeGoal = (grupo: string, newGoal: number | string): void => {
    // atualiza no state local
    setRecordesMusculares(prev =>
      prev.map(r =>
        r.grupo === grupo ? { ...r, metaVolume: Number(newGoal) } : r
      )
    );
    setIsGoalModalOpen(false);
  };

  const handleSaveUserData = (updatedData: UserData): void => {
    setUserData(updatedData);
    const imcResult = userService.calculateIMC(updatedData.altura, updatedData.peso);
    setUserData(prev => ({ ...prev, imc: imcResult }));
    setIsProfileModalOpen(false);
  };

  // Carrega dados reais ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1) Busca dados do usuário (inclui recordes e metas)
        const userInfo = await userService.getCurrentUser();

        // 2) Busca histórico de treinos
        const trainings = await trainingService.getUserTrainings();

        // 3) Converte para o formato esperado pelo calculateRecordsFromHistory
        const history = trainings.map(t => ({
          grupoMuscular: t.nome,
          volumeTotal:
            t.volumeTotal ??
            trainingService.calculateTotalVolume(t.exercicios),
          data: t.data,
        }));

        // 4) Calcula recordes finais
        const muscleRecords = userService.calculateRecordsFromHistory(
          history,
          userInfo.metas 
        );

        // 5) Atualiza state
        setUserData(prev => ({
          ...prev,
          nome: userInfo.nome,
          telefone: userInfo.telefone,
          email: userInfo.email,
          idade: userInfo.idade,
          altura: userInfo.altura,
          peso: userInfo.peso,
          sexo: userInfo.sexo,
          cidade: userInfo.cidade,
        }));
        // recalcula IMC
        const imcResult = userService.calculateIMC(userInfo.altura, userInfo.peso);
        setUserData(prev => ({ ...prev, imc: imcResult }));

        setRecordesMusculares(muscleRecords);
      } catch (error: any) {
        showNotification(error.message || "Erro ao carregar dados", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.content, isMenuOpen && styles.menuOpenStyle]}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#38bdf8" />
          ) : (
            <>
              <Header />

              <UserProfileCard
                userData={userData}
                openProfileModal={() => setIsProfileModalOpen(true)}
                onSave={handleSaveUserData}
                isModalOpen={isProfileModalOpen}
              />

              {/* <MuscleRecordsCard
                recordesMusculares={recordesMusculares}
                openGoalModal={openGoalModal}
                updateGoal={updateVolumeGoal}
                isModalOpen={isGoalModalOpen}
                currentGroup={currentEditGroup}
              /> */}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    marginTop: 30,
  },
  content: {
    flex: 1,
  },
  menuOpenStyle: {
    marginLeft: 256,
    opacity: 0.5,
  },
});
