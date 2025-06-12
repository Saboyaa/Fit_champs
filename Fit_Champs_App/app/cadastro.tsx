import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import authService from '@/services/authService';
import { useNotificationState } from '@/Context/notification';

// Tipos específicos para o formulário
type Sex = 'masculino' | 'feminino';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  city: string;
  sex: Sex;
  age: string;
  phone: string;
  height: string;
  weight: string;
}

export default function Cadastro() {
  const { showNotification } = useNotificationState();
  const router = useRouter();

  // Estado do formulário, tipado como FormData
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    city: '',
    sex: 'masculino',
    age: '',
    phone: '',
    height: '',
    weight: '',
  });

  // Outros estados
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, color: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<keyof FormData | null>(null);

  // Handler genérico
  const handleChange = (field: keyof FormData, value: string) => {
    if (field === 'phone') {
      let digits = value.replace(/\D/g, '');
      if (digits.length > 0) digits = '(' + digits;
      if (digits.length > 3) digits = digits.slice(0,3) + ') ' + digits.slice(3);
      if (digits.length > 10) digits = digits.slice(0,10) + '-' + digits.slice(10);
      if (digits.length > 15) digits = digits.slice(0,15);
      setFormData(prev => ({ ...prev, phone: digits }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value } as FormData));
    }
    if (field === 'password') calculatePasswordStrength(value);
  };

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    let color = score <= 25 ? 'red' : score <= 50 ? 'orange' : score <= 75 ? 'yellowgreen' : 'green';
    setPasswordStrength({ score, color });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (formData.password !== formData.confirm_password) {
      showNotification('As senhas não coincidem!', 'error');
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      showNotification('A senha deve ter pelo menos 8 caracteres!', 'error');
      setIsLoading(false);
      return;
    }
    try {
      // Agora tipado corretamente
      await authService.register(formData);
      showNotification('Cadastro realizado com sucesso!', 'success');
      // resetar
      setFormData({ username: '', email: '', password: '', confirm_password: '', city: '', sex: 'masculino', age: '', phone: '', height: '', weight: '' });
      setPasswordStrength({ score: 0, color: '' });
      setTimeout(() => router.push('/login'), 2000);
    } catch (e: any) {
      showNotification(e.message || 'Erro ao cadastrar', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      {/* Campos do formulário, todos mapeados via handleChange */}
      <TextInput
        style={[styles.input, focusedField === 'username' && styles.inputFocused]}
        placeholder="Nome completo"
        placeholderTextColor="#aaa"
        value={formData.username}
        onChangeText={text => handleChange('username', text)}
        onFocus={() => setFocusedField('username')}
        onBlur={() => setFocusedField(null)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        placeholderTextColor="#aaa"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sexo (masculino ou feminino)"
        value={formData.sex}
        onChangeText={text => handleChange('sex', text.toLowerCase() === 'feminino' ? 'feminino' : 'masculino')}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        placeholderTextColor="#aaa"
        value={formData.city}
        onChangeText={(text) => handleChange("city", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        keyboardType="numeric"
        placeholderTextColor="#aaa"
        value={formData.age}
        onChangeText={(text) => handleChange("age", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        placeholderTextColor="#aaa"
        value={formData.phone}
        onChangeText={(text) => handleChange("phone", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        keyboardType="numeric"
        placeholderTextColor="#aaa"
        value={formData.height}
        onChangeText={(text) => handleChange("height", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        placeholderTextColor="#aaa"
        value={formData.weight}
        onChangeText={(text) => handleChange("weight", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={!showPassword}
        value={formData.password}
        onChangeText={text => handleChange('password', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry={!showConfirmPassword}
        value={formData.confirm_password}
        onChangeText={text => handleChange('confirm_password', text)}
      />

      {/* Barra de força da senha */}
      <View style={[styles.strengthBar, { backgroundColor: passwordStrength.color, width: `${passwordStrength.score}%` }]} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Cadastrando...' : 'Cadastrar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#0f172a', flexGrow: 1},
  title: { color: '#38bdf8', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, marginTop: 24 },
  input: { backgroundColor: '#1e293b', color: '#fff', padding: 12, marginBottom: 12, borderRadius: 8, borderColor: '#334155', borderWidth: 1 },
  inputFocused: { borderColor: '#38bdf8' },
  strengthBar: { height: 4, borderRadius: 2, marginBottom: 12 },
  button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 16, opacity: 1 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});