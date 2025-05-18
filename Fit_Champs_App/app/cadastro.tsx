// app/index.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    weight: "",
    phone: "",
    password: "",
    confirmPassword: "",
    cidade: "",
    sexo: "masculino",
    altura: "",
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert("Erro", "A senha deve ter pelo menos 8 caracteres!");
      return;
    }

    const dataToSubmit = { ...formData, confirmPassword: undefined };
    console.log("Dados enviados:", dataToSubmit);
    Alert.alert("Sucesso", "Cadastro realizado com sucesso!");

    setFormData({
      name: "",
      email: "",
      age: "",
      weight: "",
      phone: "",
      password: "",
      confirmPassword: "",
      cidade: "",
      sexo: "masculino",
      altura: "",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#aaa"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
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
        placeholder="Cidade"
        placeholderTextColor="#aaa"
        value={formData.cidade}
        onChangeText={(text) => handleChange("cidade", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sexo (masculino/feminino)"
        placeholderTextColor="#aaa"
        value={formData.sexo}
        onChangeText={(text) => handleChange("sexo", text)}
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
        value={formData.altura}
        onChangeText={(text) => handleChange("altura", text)}
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
        secureTextEntry
        placeholderTextColor="#aaa"
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        placeholderTextColor="#aaa"
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#0f172a",
    flexGrow: 1,
  },
  title: {
    color: "#38bdf8",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: "#334155",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});