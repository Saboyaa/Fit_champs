import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart2 } from "lucide-react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <BarChart2 color="#60a5fa" size={32} />
        <Text style={styles.title}>Estatísticas de Treino</Text>
      </View>
      <Text style={styles.subtitle}>
        Acompanhe seu progresso e alcance seus objetivos!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f172a", // slate-900
    padding: 24,
    borderRadius: 16,
    marginTop: 8,
    width: "90%",
    alignSelf: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.3)", // indigo-500/30
    // Note: React Native doesn't support backdrop filters directly
    // You might need a third-party library for this effect
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    color: "#bfdbfe", // blue-200
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
});

export default Header;
