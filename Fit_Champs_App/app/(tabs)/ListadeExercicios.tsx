import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  reps: string;
  weight: number;
  volume: number;
}

interface WorkoutDay {
  id: string;
  date: string;
  dayName: string;
  workoutType: string;
  exercises: Exercise[];
}

const ExerciseList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exercises' | 'summary'>('exercises');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([
    {
      id: '1',
      date: '09-06-25',
      dayName: 'Segunda-feira',
      workoutType: 'Treino de Peito',
      exercises: [
        {
          id: '1',
          name: 'Supino Reto',
          muscleGroup: 'Peitoral Médio',
          reps: '3 x 12',
          weight: 12,
          volume: 432,
      },
        {
          id: '2',
          name: 'Pullover',
          muscleGroup: 'Peitoral Superior/Serrátil',
          reps: '3 x 12',
          weight: 0,
          volume: 0,
        },
      ]
    }
  ]);

  const [activeWorkoutDay, setActiveWorkoutDay] = useState<string>('1');

  const exerciseDatabase = {
    'Supino Reto': 'Peitoral Médio',
    'Supino Inclinado': 'Peitoral Superior',
    'Supino Declinado': 'Peitoral Inferior',
    'Pullover': 'Peitoral Superior/Serrátil',
    'Crucifixo': 'Peitoral Médio',
    'Crucifixo Inclinado': 'Peitoral Superior',
    'Flexão': 'Peitoral Médio',
    'Peck Deck': 'Peitoral Médio',
    'Cross Over': 'Peitoral Médio',
    'Cross Over Superior': 'Peitoral Inferior',
    'Mergulho': 'Peitoral Inferior',
    'Supino Halteres': 'Peitoral Médio',
  };

  const workoutTypes = [
    'Treino de Peito',
    'Treino de Costas', 
    'Treino de Pernas',
    'Treino de Ombros',
    'Treino de Braços'
  ];

  const exerciseOptions = Object.keys(exerciseDatabase);
  const muscleGroups = [...new Set(Object.values(exerciseDatabase))];

  const repOptions = [
    '3 x 8', '3 x 10', '3 x 12', '3 x 15',
    '4 x 8', '4 x 10', '4 x 12', '4 x 15',
    '5 x 5', '5 x 8'
  ];

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getCurrentWorkoutDay = () => {
    return workoutDays.find(day => day.id === activeWorkoutDay) || workoutDays[0];
  };

  const addExercise = () => {
    const currentDay = getCurrentWorkoutDay();
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: 'Supino Reto',
      muscleGroup: exerciseDatabase['Supino Reto'],
      reps: '3 x 12',
      weight: 0,
      volume: 0,
    };
    
    setWorkoutDays(workoutDays.map(day => 
      day.id === activeWorkoutDay 
        ? { ...day, exercises: [...day.exercises, newExercise] }
        : day
    ));
  };

  const removeExercise = (id: string) => {
    setWorkoutDays(workoutDays.map(day => 
      day.id === activeWorkoutDay 
        ? { ...day, exercises: day.exercises.filter(ex => ex.id !== id) }
        : day
    ));
  };

  const updateExercise = (id: string, field: keyof Exercise, value: any) => {
    setWorkoutDays(workoutDays.map(day => 
      day.id === activeWorkoutDay 
        ? {
            ...day,
            exercises: day.exercises.map(ex => {
              if (ex.id === id) {
                const updated = { ...ex, [field]: value };
                // Recalculate volume when weight or reps change
                if (field === 'weight' || field === 'reps') {
                  const sets = parseInt(updated.reps.split(' x ')[0]) || 0;
                  const repsPerSet = parseInt(updated.reps.split(' x ')[1]) || 0;
                  updated.volume = sets * repsPerSet * updated.weight;
                }
                return updated;
              }
              return ex;
            })
          }
        : day
    ));
  };

  const getTotalVolume = () => {
    const currentDay = getCurrentWorkoutDay();
    return currentDay.exercises.reduce((total, ex) => total + ex.volume, 0);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (day: number, month: number, year: number) => {
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = (month + 1).toString().padStart(2, '0');
    const formattedYear = year.toString().slice(-2);
    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
  };

  const getDayName = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    const dayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return dayNames[date.getDay()];
  };

  const addWorkoutDay = (day: number) => {
    const dateString = formatDate(day, selectedMonth, selectedYear);
    const dayName = getDayName(day, selectedMonth, selectedYear);
    
    // Check if date already exists
    const existingDay = workoutDays.find(wd => wd.date === dateString);
    if (existingDay) {
      Alert.alert('Data já existe', 'Já existe um treino para esta data.');
      return;
    }

    const newWorkoutDay: WorkoutDay = {
      id: Date.now().toString(),
      date: dateString,
      dayName: dayName,
      workoutType: 'Treino de Peito',
      exercises: []
    };

    setWorkoutDays([...workoutDays, newWorkoutDay]);
    setActiveWorkoutDay(newWorkoutDay.id);
    setShowCalendar(false);
    Alert.alert('Dia Adicionado', `${dayName} (${dateString}) foi adicionado com sucesso!`);
  };

  const removeWorkoutDay = (dayId: string) => {
    if (workoutDays.length <= 1) {
      Alert.alert('Erro', 'Deve manter pelo menos um dia de treino.');
      return;
    }

    Alert.alert(
      'Remover Dia',
      'Tem certeza que deseja remover este dia de treino?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            const newWorkoutDays = workoutDays.filter(day => day.id !== dayId);
            setWorkoutDays(newWorkoutDays);
            // Set active day to first remaining day
            if (activeWorkoutDay === dayId) {
              setActiveWorkoutDay(newWorkoutDays[0].id);
            }
          }
        }
      ]
    );
  };

  const updateWorkoutType = (dayId: string, workoutType: string) => {
    setWorkoutDays(workoutDays.map(day => 
      day.id === dayId ? { ...day, workoutType } : day
    ));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.calendarDay}>
          <Text></Text>
        </View>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(day, selectedMonth, selectedYear);
      const hasWorkout = workoutDays.some(wd => wd.date === dateString);
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            hasWorkout && styles.calendarDayWithWorkout
          ]}
          onPress={() => addWorkoutDay(day)}
        >
          <Text style={[
            styles.calendarDayText,
            hasWorkout && styles.calendarDayTextWithWorkout
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const goBack = () => {
    Alert.alert('Voltar', 'Voltando para Treinos Semanais...');
  };

  const currentWorkoutDay = getCurrentWorkoutDay();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🏋️ Lista de Exercícios</Text>
        <Text style={styles.subtitle}>
          Selecione os exercícios para cada dia de treino
        </Text>
      </View>

      {/* Add Day Button */}
      <View style={styles.addDayContainer}>
        <TouchableOpacity 
          style={styles.addDayButton} 
          onPress={() => setShowCalendar(true)}
        >
          <Text style={styles.addDayButtonText}>📅 Adicionar Dia</Text>
        </TouchableOpacity>
      </View>

      {/* Workout Days Selector */}
      <View style = {{height:120}}>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelector}>
        {workoutDays.map((day) => (
          <TouchableOpacity
            key={day.id}
            style={[
              styles.dayCard,
              activeWorkoutDay === day.id && styles.activeDayCard
            ]}
            onPress={() => setActiveWorkoutDay(day.id)}
          >
            <View style={styles.dayCardContent}>
              <Text style={[
                styles.dayCardDate,
                activeWorkoutDay === day.id && styles.activeDayCardText
              ]}>
                {day.date}
              </Text>
              <Text style={[
                styles.dayCardName,
                activeWorkoutDay === day.id && styles.activeDayCardText
              ]}>
                {day.dayName}
              </Text>
              <Text style={[
                styles.dayCardType,
                activeWorkoutDay === day.id && styles.activeDayCardText
              ]}>
                {day.workoutType}
              </Text>
            </View>
            {workoutDays.length > 1 && (
              <TouchableOpacity
                style={styles.removeDayButton}
                onPress={() => removeWorkoutDay(day.id)}
              >
                <Text style={styles.removeDayButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
        
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'exercises' && styles.activeTab
          ]}
          onPress={() => setActiveTab('exercises')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'exercises' && styles.activeTabText
          ]}>
            📋 Lista de Exercícios
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'summary' && styles.activeTab
          ]}
          onPress={() => setActiveTab('summary')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'summary' && styles.activeTabText
          ]}>
            📊 Resumo Semanal
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'exercises' && (
          <View style={styles.workoutSection}>
            {/* Workout Header */}
            <View style={styles.workoutHeader}>
              <View style={styles.workoutHeaderContent}>
                <Text style={styles.workoutTitle}>
                  📅 {currentWorkoutDay.dayName} ({currentWorkoutDay.date}) - {currentWorkoutDay.workoutType}
                </Text>
                <View style={styles.workoutStats}>
                  <Text style={styles.statText}>
                    {currentWorkoutDay.exercises.length}/2 exercícios
                  </Text>
                  <Text style={styles.statText}>
                    Volume total: {getTotalVolume()}
                  </Text>
                </View>
              </View>
              <Text style={styles.expandIcon}>⌄</Text>
            </View>

            {/* Workout Type Selector */}
            <View style={styles.workoutTypeContainer}>
              <Text style={styles.workoutTypeLabel}>Tipo de Treino:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.workoutTypeOptions}>
                  {workoutTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.workoutTypeOption,
                        currentWorkoutDay.workoutType === type && styles.activeWorkoutTypeOption
                      ]}
                      onPress={() => updateWorkoutType(activeWorkoutDay, type)}
                    >
                      <Text style={[
                        styles.workoutTypeOptionText,
                        currentWorkoutDay.workoutType === type && styles.activeWorkoutTypeOptionText
                      ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Exercise Table - Mobile Optimized */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.tableContainer}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.headerText, styles.nameColumn]}>Nome do Exercício</Text>
                  <Text style={[styles.headerText, styles.muscleColumn]}>Subgrupo Muscular</Text>
                  <Text style={[styles.headerText, styles.repsColumn]}>Repetições</Text>
                  <Text style={[styles.headerText, styles.weightColumn]}>Peso (kg)</Text>
                  <Text style={[styles.headerText, styles.volumeColumn]}>Volume</Text>
                  <Text style={[styles.headerText, styles.actionsColumn]}>Ações</Text>
                </View>

                {/* Exercise Rows */}
                {currentWorkoutDay.exercises.map((exercise) => (
                  <ExerciseRow
                    key={exercise.id}
                    exercise_call={exercise}
                    exerciseOptions={exerciseOptions}
                    exerciseDatabase={exerciseDatabase}
                    muscleGroups={muscleGroups}
                    repOptions={repOptions}
                    onUpdate={updateExercise}
                    onRemove={removeExercise}
                  />
                ))}
              </View>
            </ScrollView>

            {/* Add Exercise Button */}
            <TouchableOpacity style={styles.addButton} onPress={addExercise}>
              <Text style={styles.addButtonText}>⊕ Adicionar Exercício</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'summary' && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>📊 Resumo da Semana</Text>
            {workoutDays.map((day) => (
              <View key={day.id} style={styles.summaryCard}>
                <Text style={styles.summaryDayTitle}>
                  {day.dayName} ({day.date}) - {day.workoutType}
                </Text>
                <Text style={styles.summaryText}>
                  Exercícios: {day.exercises.length}
                </Text>
                <Text style={styles.summaryText}>
                  Volume: {day.exercises.reduce((total, ex) => total + ex.volume, 0)} kg
                </Text>
              </View>
            ))}
            <View style={styles.summaryTotalCard}>
              <Text style={styles.summaryTotalTitle}>Total Geral</Text>
              <Text style={styles.summaryText}>
                Dias de Treino: {workoutDays.length}
              </Text>
              <Text style={styles.summaryText}>
                Total de Exercícios: {workoutDays.reduce((total, day) => total + day.exercises.length, 0)}
              </Text>
              <Text style={styles.summaryText}>
                Volume Total: {workoutDays.reduce((total, day) => 
                  total + day.exercises.reduce((dayTotal, ex) => dayTotal + ex.volume, 0), 0
                )} kg
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarModal}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity
                onPress={() => setSelectedMonth(selectedMonth === 0 ? 11 : selectedMonth - 1)}
              >
                <Text style={styles.calendarNavButton}>‹</Text>
              </TouchableOpacity>
              <Text style={styles.calendarHeaderText}>
                {monthNames[selectedMonth]} {selectedYear}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedMonth(selectedMonth === 11 ? 0 : selectedMonth + 1)}
              >
                <Text style={styles.calendarNavButton}>›</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.calendarDaysHeader}>
              {dayNames.map((day) => (
                <Text key={day} style={styles.calendarDayHeader}>{day}</Text>
              ))}
            </View>
            
            <View style={styles.calendarGrid}>
              {renderCalendar()}
            </View>
            
            <TouchableOpacity
              style={styles.closeCalendarButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeCalendarButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

interface ExerciseRowProps {
  exercise_call: Exercise;
  exerciseOptions: string[];
  exerciseDatabase: { [key: string]: string };
  muscleGroups: string[];
  repOptions: string[];
  onUpdate: (id: string, field: keyof Exercise, value: any) => void;
  onRemove: (id: string) => void;
}

const ExerciseRow: React.FC<ExerciseRowProps> = ({
  exercise_call,
  exerciseOptions,
  exerciseDatabase,
  muscleGroups,
  repOptions,
  onUpdate,
  onRemove,
}) => {
  const [exercise,setExercise] = useState(exercise_call);
  const [showExerciseOptions, setShowExerciseOptions] = useState(false);
  const [showMuscleOptions, setShowMuscleOptions] = useState(false);
  const [showRepOptions, setShowRepOptions] = useState(false);

  const handleExerciseChange = (exerciseName: string) => {
    onUpdate(exercise.id, 'name', exerciseName);
    
    // Automatically set muscle group based on exercise
    const muscleGroup = exerciseDatabase[exerciseName];
    if (muscleGroup) {
      onUpdate(exercise.id, 'muscleGroup', muscleGroup);
    }
    exercise_call.name = exerciseName;
    exercise_call.muscleGroup = muscleGroup;
    setExercise(exercise_call);
    setShowExerciseOptions(false);
  };

  return (
    <View style={styles.exerciseRow}>
      {/* Exercise Name */}
      <View style={[styles.cell, styles.nameColumn]}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowExerciseOptions(!showExerciseOptions)}
        >
          <Text style={styles.dropdownText} numberOfLines={1}>{exercise.name}</Text>
          <Text style={styles.dropdownArrow}>⌄</Text>
        </TouchableOpacity>
        {showExerciseOptions && (
          <View style={styles.optionsContainer}>
            <ScrollView style={styles.optionsScroll} nestedScrollEnabled>
              {exerciseOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.option}
                  onPress={() => handleExerciseChange(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Muscle Group */}
      <View style={[styles.cell, styles.muscleColumn]}>
        <TouchableOpacity
          style={[styles.dropdown, styles.disabledDropdown]}
          onPress={() => setShowMuscleOptions(!showMuscleOptions)}
        >
          <Text style={[styles.dropdownText, styles.autoText]} numberOfLines={2}>
            {exercise.muscleGroup}
          </Text>
        </TouchableOpacity>
        {showMuscleOptions && (
          <View style={styles.optionsContainer}>
            <ScrollView style={styles.optionsScroll} nestedScrollEnabled>
              {muscleGroups.map((group) => (
                <TouchableOpacity
                  key={group}
                  style={styles.option}
                  onPress={() => {
                    onUpdate(exercise.id, 'muscleGroup', group);
                    setShowMuscleOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>{group}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Repetitions */}
      <View style={[styles.cell, styles.repsColumn]}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowRepOptions(!showRepOptions)}
        >
          <Text style={styles.dropdownText}>{exercise.reps}</Text>
          <Text style={styles.dropdownArrow}>⌄</Text>
        </TouchableOpacity>
        {showRepOptions && (
          <View style={styles.optionsContainer}>
            <ScrollView style={styles.optionsScroll} nestedScrollEnabled>
              {repOptions.map((rep) => (
                <TouchableOpacity
                  key={rep}
                  style={styles.option}
                  onPress={() => {
                    onUpdate(exercise.id, 'reps', rep);
                    setShowRepOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>{rep}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Weight */}
      <View style={[styles.cell, styles.weightColumn]}>
        <TextInput
          style={styles.input}
          value={exercise.weight.toString()}
          onChangeText={(text) => onUpdate(exercise.id, 'weight', parseFloat(text) || 0)}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#6B7280"
        />
      </View>

      {/* Volume */}
      <View style={[styles.cell, styles.volumeColumn]}>
        <Text style={styles.volumeText}>{exercise.volume}</Text>
      </View>

      {/* Actions */}
      <View style={[styles.cell, styles.actionsColumn]}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(exercise.id)}
        >
          <Text style={styles.removeButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    padding: 20,
    backgroundColor: '#1F2937',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  addDayContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1F2937',
  },
  addDayButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addDayButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  daySelector: {
    backgroundColor: '#1F2937',
    padding:20,
  },
  dayCard: {
    backgroundColor: '#374151',
    marginRight: 12,
    borderRadius: 8,
    padding: 12,
    minWidth: 120,
    position: 'relative',
  },
  activeDayCard: {
    backgroundColor: '#3B82F6',
  },
  dayCardContent: {
    alignItems: 'center',
  },
  dayCardDate: {
    color: '#D1D5DB',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dayCardName: {
    color: '#9CA3AF',
    fontSize: 10,
    marginVertical: 2,
  },
  dayCardType: {
    color: '#9CA3AF',
    fontSize: 9,
    textAlign: 'center',
  },
  activeDayCardText: {
    color: '#FFFFFF',
  },
  removeDayButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeDayButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  tab: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginTop:10,
  },
  workoutSection: {
    margin: 12,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 12,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  workoutHeaderContent: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  workoutStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  expandIcon: {
    color: '#9CA3AF',
    fontSize: 18,
  },
  workoutTypeContainer: {
    marginBottom: 16,
  },
  workoutTypeLabel: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  workoutTypeOptions: {
    flexDirection: 'row',
  },
  workoutTypeOption: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  activeWorkoutTypeOption: {
    backgroundColor: '#3B82F6',
  },
  workoutTypeOptionText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  activeWorkoutTypeOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tableContainer: {
    minWidth: 800, // Ensures horizontal scroll
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerText: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Column widths for mobile optimization
  nameColumn: {
    width: 160,
  },
  muscleColumn: {
    width: 140,
  },
  repsColumn: {
    width: 80,
  },
  weightColumn: {
    width: 70,
  },
  volumeColumn: {
    width: 70,
  },
  actionsColumn: {
    width: 50,
  },
  exerciseRow: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    padding: 6,
    borderRadius: 8,
    marginBottom: 6,
    minHeight: 50,
  },
  cell: {
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  dropdown: {
    backgroundColor: '#374151',
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 40,
  },
  disabledDropdown: {
    backgroundColor: '#2D3748', // Slightly darker to show it's auto-filled
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 11,
    flex: 1,
    paddingRight: 4,
  },
  autoText: {
    color: '#A0AEC0', // Lighter color to show it's auto-filled
    fontStyle: 'italic',
  },
  dropdownArrow: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  optionsContainer: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#374151',
    borderRadius: 6,
    zIndex: 10000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionsScroll: {
    maxHeight: 150,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 11,
  },
  input: {
    backgroundColor: '#374151',
    color: '#FFFFFF',
    padding: 8,
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 11,
    minHeight: 40,
  },
  volumeText: {
    color: '#FFFFFF',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#DC2626',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    width: 40,
  },
  removeButtonText: {
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  summarySection: {
    margin: 16,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  summaryDayTitle: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryText: {
    color: '#D1D5DB',
    fontSize: 14,
    marginBottom: 4,
  },
  summaryTotalCard: {
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  summaryTotalTitle: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  // Calendar Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarModal: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarHeaderText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarNavButton: {
    color: '#3B82F6',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },
  calendarDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  calendarDayHeader: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 6,
  },
  calendarDayWithWorkout: {
    backgroundColor: '#10B981',
  },
  calendarDayText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  calendarDayTextWithWorkout: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  closeCalendarButton: {
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeCalendarButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },})
  export default ExerciseList