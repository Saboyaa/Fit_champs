import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useGlobalContext } from '@/Context/ContextoGlobal';
import { useExercicios } from '@/Context/ExercícioGlobal';
import { useNavigation } from '@react-navigation/native';
import Tasks from '@/components/tasks';
import { Task } from '@/components/tasks';
import { Calendar, Dumbbell, ChevronRight, ArrowBigRight, ChevronLeft, ListChecks, Activity, Trophy } from 'lucide-react-native';
import { FlatList } from 'react-native';

type WeekRange = {
  start: string;
  end: string;
};

const TreinosSemanais: React.FC = () => {
  const { isMenuOpen } = useGlobalContext();
  const { adicionarTreinos } = useExercicios(); 
  const navigation = useNavigation();
  const [tasksList, setTasksList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const getWeekRange = (offset = 0): WeekRange => {
    const currentDate = new Date();
    const startOfWeek = currentDate.getDate() - currentDate.getDay();
    const start = new Date(currentDate.setDate(startOfWeek + offset * 7));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
      start: start.toLocaleDateString(),
      end: end.toLocaleDateString(),
    };
  };

  const [weekRange, setWeekRange] = useState<WeekRange>(getWeekRange());

  useEffect(() => {
    setWeekRange(getWeekRange(currentWeekOffset));
  }, [currentWeekOffset]);

  const enviarParaListaExercicios = () => {
    if (tasksList.length === 0) {
      Alert.alert('Atenção', 'Adicione pelo menos um treino antes de continuar');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      adicionarTreinos(tasksList);
      navigation.navigate('ListadeExercicios' as never);
    }, 500);
  };

  const atualizarTasks = (tasks: any[]) => {
    setTasksList(tasks);
  };

  const changeWeek = (offset: number) => {
    const newOffset = currentWeekOffset + offset;
    if (newOffset > 0) return;
    setCurrentWeekOffset(newOffset);
  };

  return (
    <FlatList
      data={[{}]} // dado fictício só para renderizar a tela
      keyExtractor={() => 'header'}
      renderItem={null}
      ListHeaderComponent={
        <View style={{ padding: 20, backgroundColor: '#0f172a', flexGrow: 1 }}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Calendar color="skyblue" size={32} />
            <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>Treinos Semanais</Text>
            <Text style={{ color: 'lightblue', textAlign: 'center', marginTop: 10 }}>
              Planeje seus treinos para alcançar seus objetivos!
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, marginVertical: 10 }}>
            <TouchableOpacity onPress={() => changeWeek(-1)}>
              <ChevronLeft color="white" />
            </TouchableOpacity>
            <Text style={{ color: 'white' }}>{weekRange.start} - {weekRange.end}</Text>
            <TouchableOpacity onPress={() => changeWeek(1)} disabled={currentWeekOffset === 0}>
              <ChevronRight color={currentWeekOffset === 0 ? 'gray' : 'white'} />
            </TouchableOpacity>
          </View>

          <View style={{ marginVertical: 20 }}>
            <Tasks
              initialTasks={[]}
              onTasksUpdate={atualizarTasks}
              weekStartDate={weekRange.start.replace(/\//g, '-')}
            />
          </View>

          {/* <View style={{ marginVertical: 20, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={enviarParaListaExercicios}
              disabled={loading}
              style={{ backgroundColor: '#1e3a8a', padding: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text style={{ color: 'white', marginRight: 10 }}>Continuar para Seleção de Exercícios</Text>
                  <ArrowBigRight color="white" />
                </>
              )}
            </TouchableOpacity>
          </View> */}

          {tasksList.length > 0 && (
            <View style={{ marginVertical: 20 }}>
              <View style={{ backgroundColor: '#1e3a8a', padding: 15, borderRadius: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10 }}>
                  <Trophy color="gold" /> Dicas para seus treinos
                </Text>
                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                  <Activity color="skyblue" />
                  <Text style={{ color: 'white', marginLeft: 5 }}>
                    Mantenha intensidade adequada durante seus exercícios para melhores resultados.
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Dumbbell color="skyblue" />
                  <Text style={{ color: 'white', marginLeft: 5 }}>
                    Planeje seus treinos e respeite o descanso entre grupos musculares semelhantes.
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      }
    />
  );
};

export default TreinosSemanais;
