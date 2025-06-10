import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarChart2 } from "lucide-react-native";
import MuscleRecordItem from "./MuscleRecordItem";

const MuscleRecordsCard = ({ recordesMusculares, openGoalModal }) => {
  const [hoveredRecord, setHoveredRecord] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <BarChart2 color="#60a5fa" size={24} />
          <Text style={styles.title}>Recordes Musculares</Text>
        </View>
        <Text style={styles.subtitle}>
          Maiores volumes de treino por grupo muscular
        </Text>
      </View>

      <View style={styles.grid}>
        {recordesMusculares.map((recorde) => (
          <TouchableOpacity
            key={recorde.grupo}
            activeOpacity={0.7}
            onPressIn={() => setHoveredRecord(recorde.grupo)}
            onPressOut={() => setHoveredRecord(null)}
          >
            <MuscleRecordItem
              recorde={recorde}
              isHovered={hoveredRecord === recorde.grupo}
              isOtherHovered={
                hoveredRecord !== null && hoveredRecord !== recorde.grupo
              }
              openGoalModal={openGoalModal}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f172a",
    padding: 24,
    borderRadius: 12,
    marginBottom: 32,
  },
  header: {
    backgroundColor: "#1e293b", // slate-900
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.3)",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    color: "#93c5fd", // blue-300
    marginTop: 4,
    marginLeft: 32,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 24,
  },
});

export default MuscleRecordsCard;
