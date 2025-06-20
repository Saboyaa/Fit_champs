import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import authService from "@/services/authService";
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError]     = useState<string>('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await authService.login(username, password);

      if (rememberMe) {
        await AsyncStorage.setItem('rememberMe', 'true');
        await AsyncStorage.setItem('savedUsername', username);
      } else {
        await AsyncStorage.removeItem('rememberMe');
        await AsyncStorage.removeItem('savedUsername');
      }

      // navega para a tela de evolução
      router.push("/GraficodeEvolucao")
    } catch (err: unknown) {
      // extrai mensagem do Axios ou genérica
      let message = 'Erro ao fazer login. Verifique suas credenciais.';
      if (axios.isAxiosError(err)) {
        message =
          err.response?.data?.message ||
          err.message ||
          message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
      await AsyncStorage.setItem('loginError', message);
      // opcional: alerta imediato
      Alert.alert('Falha no Login', message);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const loadSaved = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem('savedUsername');
        const remember      = (await AsyncStorage.getItem('rememberMe')) === 'true';
        const savedError    = await AsyncStorage.getItem('loginError');

        if (remember && savedUsername) {
          setUsername(savedUsername);
          setRememberMe(true);
        }
        if (savedError) {
          setError(savedError);
          await AsyncStorage.removeItem('loginError');
        }
      } catch (e) {
        console.warn('Erro ao carregar dados salvos:', e);
      }
    };

    loadSaved();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
        //   source={require("../assets/icone.png")} // verifique o caminho correto
          style={styles.logo}
        />
        <Text style={styles.logoText}>Fit Champs</Text>
        <Text style={styles.subtitle}>Supere seus limites!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showPasswordBtn}
        >
          <Text style={styles.showPasswordText}>
            {showPassword ? "Ocultar senha" : "Mostrar senha"}
          </Text>
        </TouchableOpacity>

        <View style={styles.optionsRow}>
          <View style={styles.rememberMe}>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              thumbColor={rememberMe ? "#38bdf8" : "#888"}
            />
            <Text style={styles.rememberText}>Lembrar-me</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert("Recuperação de senha")}>
            <Text style={styles.forgotText}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>ENTRAR</Text>
        </TouchableOpacity>

        <View style={styles.registerBox}>
          <Text style={styles.newHere}>Novo por aqui?</Text>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => router.push("/cadastro")}
          >
            <Text style={styles.registerBtnText}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.motivation}>
          "O único treino ruim é aquele que você não fez."
        </Text>
      </View>

      <Text style={styles.footer}>
        © 2025 Fit Champs - Todos os direitos reservados
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#0f172a",
    flexGrow: 1,
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#38bdf8",
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderColor: "#334155",
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#334155",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 12,
  },
  showPasswordBtn: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  showPasswordText: {
    color: "#38bdf8",
    fontSize: 12,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rememberText: {
    color: "#cbd5e1",
    fontSize: 12,
    marginLeft: 4,
  },
  forgotText: {
    color: "#38bdf8",
    fontSize: 12,
  },
  loginBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerBox: {
    borderColor: "#334155",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 20,
    backgroundColor: "#1e293b",
    alignItems: "center",
  },
  newHere: {
    color: "#94a3b8",
    marginBottom: 8,
  },
  registerBtn: {
    backgroundColor: "#334155",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  registerBtnText: {
    color: "#fff",
    fontWeight: "500",
  },
  motivation: {
    marginTop: 24,
    fontStyle: "italic",
    color: "#94a3b8",
    textAlign: "center",
  },
  footer: {
    marginTop: 32,
    fontSize: 12,
    color: "#38bdf8",
  },
});
