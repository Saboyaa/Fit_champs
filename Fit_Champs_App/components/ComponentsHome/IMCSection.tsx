import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivitySquare } from "lucide-react-native";

const IMCSection = ({ imc }) => {
  // Function to determine IMC indicator color
  const getIMCColor = (classification) => {
    switch (classification) {
      case "Abaixo do peso":
        return "#eab308"; // yellow-500
      case "Peso normal":
        return "#22c55e"; // green-500
      case "Sobrepeso":
        return "#fb923c"; // orange-400
      case "Obesidade grau I":
      case "Obesidade grau II":
      case "Obesidade grau III":
        return "#ef4444"; // red-500
      default:
        return "#6b7280"; // gray-500
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ActivitySquare color="#60a5fa" size={20} />
        <Text style={styles.title}>Índice de Massa Corporal (IMC)</Text>
      </View>
      
      <View style={styles.valuesContainer}>
        <View style={styles.valueBox}>
          <Text style={styles.valueText}>{imc.value || "---"}</Text>
          <Text style={styles.valueLabel}>Valor</Text>
        </View>
        
        <View style={styles.valueBox}>
          <Text style={[styles.classificationText, { color: getIMCColor(imc.classification) }]}>
            {imc.classification || "---"}
          </Text>
          <Text style={styles.valueLabel}>Classificação</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    padding: 8,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  title: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  valuesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  valueBox: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    minWidth: 100,
  },
  valueText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#60a5fa", // blue-400
  },
  classificationText: {
    fontSize: 18,
    fontWeight: "600",
  },
  valueLabel: {
    fontSize: 12,
    color: "#94a3b8", // slate-400
    marginTop: 4,
  },
});

export default IMCSection;
