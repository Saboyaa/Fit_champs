import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  PlusCircle,
  Trash2,
  Calendar,
  Dumbbell,
  CheckCircle,
  Clock,
} from 'lucide-react-native';

// Types
export type Task = {
  id: number;
  text: string;
  descripition: string;
  Nexercicio: number;
  reminder: boolean;
  volumedetreino: number;
  data: string;
};

interface TasksProps {
  initialTasks?: Task[];
  onTasksUpdate?: (tasks: Task[]) => void;
  weekStartDate: string;
}

const Tasks: React.FC<TasksProps> = ({ initialTasks = [], onTasksUpdate, weekStartDate }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const calculateTaskDate = (dayOfWeek: string, startDate: string) => {
    const [day, month, year] = startDate.split('-').map(Number);
    const baseDate = new Date(2000 + year, month - 1, day);

    const dayOffsets: Record<string, number> = {
      Domingo: 0,
      'Segunda-feira': 1,
      'Terça-feira': 2,
      'Quarta-feira': 3,
      'Quinta-feira': 4,
      'Sexta-feira': 5,
      Sábado: 6,
    };

    const taskDate = new Date(baseDate);
    taskDate.setDate(baseDate.getDate() + dayOffsets[dayOfWeek]);

    return `${taskDate.getDate().toString().padStart(2, '0')}-${(taskDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${taskDate.getFullYear().toString().slice(-2)}`;
  };

  const [newTask, setNewTask] = useState<Task>({
    id: 0,
    text: 'Segunda-feira',
    descripition: 'Treino de Peito',
    Nexercicio: 1,
    reminder: false,
    volumedetreino: 0,
    data: calculateTaskDate('Segunda-feira', weekStartDate),
  });

  useEffect(() => {
    if (onTasksUpdate) {
      onTasksUpdate(tasks);
    }
  }, [tasks]);

  const addTask = (task: Task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTaskWithId = {
      ...task,
      id,
      data: calculateTaskDate(task.text, weekStartDate),
    };
    setTasks([...tasks, newTaskWithId]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleSubmit = () => {
    if (!newTask.text) {
      Alert.alert('Erro', 'Por favor, adicione um dia da semana');
      return;
    }
    addTask(newTask);
    setNewTask({
      id: 0,
      text: 'Segunda-feira',
      descripition: 'Treino de Peito',
      Nexercicio: 1,
      reminder: false,
      volumedetreino: 0,
      data: calculateTaskDate('Segunda-feira', weekStartDate),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}><Dumbbell size={20} /> Adicionar Novo Treino</Text>

      <Text style={styles.label}><Calendar size={16} /> Dia da Semana</Text>
      <Picker
        selectedValue={newTask.text}
        onValueChange={(value) =>
          setNewTask({ ...newTask, text: value, data: calculateTaskDate(value, weekStartDate) })
        }
        style={styles.picker}
      >
        {['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado','Domingo'].map(day => (
          <Picker.Item key={day} label={day} value={day} />
        ))}
      </Picker>

      <Text style={styles.label}><Dumbbell size={16} /> Tipo de Treino</Text>
      <Picker
        selectedValue={newTask.descripition}
        onValueChange={(value) => setNewTask({ ...newTask, descripition: value })}
        style={styles.picker}
      >
        {['Treino de Peito','Treino de Costas','Treino de Braço','Treino de Perna','Treino de Ombro','Day Off'].map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>

      <Text style={styles.label}><CheckCircle size={16} /> Nº de Exercícios</Text>
      <Picker
        selectedValue={newTask.Nexercicio}
        onValueChange={(value) => setNewTask({ ...newTask, Nexercicio: value })}
        style={styles.picker}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
          <Picker.Item key={n} label={String(n)} value={n} />
        ))}
      </Picker>

      <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
        <PlusCircle size={18} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar Treino</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}><Calendar size={14} /> {item.text} - {item.descripition}</Text>
            <Text style={styles.taskInfo}><CheckCircle size={14} /> Data: {item.data} | {item.Nexercicio} exercícios</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.trashButton}>
              <Trash2 size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 10, fontWeight: '600' },
  picker: { backgroundColor: '#e0e0e0', marginVertical: 5 },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  addButtonText: { color: '#fff', marginLeft: 8 },
  taskCard: {
    marginTop: 15,
    backgroundColor: '#111827',
    padding: 15,
    borderRadius: 10,
  },
  taskTitle: { color: '#fff', fontWeight: '600' },
  taskInfo: { color: '#9ca3af', marginTop: 5 },
  trashButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#dc2626',
    padding: 6,
    borderRadius: 4,
  },
});

export default Tasks;

