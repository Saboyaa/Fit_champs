import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Award, Target, PartyPopper } from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";

const MuscleRecordItem = ({
  recorde,
  isHovered,
  isOtherHovered,
  openGoalModal,
}) => {
  const metaAlcancada = recorde.recordeVolume >= recorde.metaVolume;

  const cardStyle = [
    styles.card,
    metaAlcancada && styles.cardGoalAchieved,
    isHovered && styles.cardHovered,
    isOtherHovered && styles.cardOtherHovered,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={cardStyle}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            metaAlcancada ? styles.iconGoalAchieved : styles.iconDefault,
          ]}
        >
        </View>
        <Text style={styles.muscleGroup}>{recorde.grupo}</Text>
        {metaAlcancada && <Award size={18} color="#4ade80" style={styles.awardIcon} />}
      </View>

      <View style={styles.volumeContainer}>
        <Text style={styles.volumeLabel}>Volume Atual / Meta:</Text>
        <Text style={[styles.volumeValue, metaAlcancada ? styles.volumeAchieved : styles.volumeDefault]}>
          {recorde.recordeVolume}/{recorde.metaVolume}
        </Text>
      </View>

      {/* Progress Bar */}

      {metaAlcancada && <GoalAchievedMessage />}
      <View style={styles.footer}>
        <Text style={styles.dateText}>Data: {recorde.data}</Text>
        <TouchableOpacity
          onPress={() => openGoalModal(recorde.grupo)}
          style={styles.goalButton}
        >
          <Target size={14} color="#cbd5e1" />
          <Text style={styles.goalButtonText}>Alterar Meta</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const GoalAchievedMessage = () => (
  <View style={styles.goalAchievedContainer}>
    <PartyPopper color="#4ade80" size={18} style={styles.partyIcon} />
    <Text style={styles.goalAchievedText}>
      Objetivo Alcançado! Altere sua meta para continuar progredindo.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 16,
    width: "100%",
  },
  cardGoalAchieved: {
    borderColor: "rgba(74, 222, 128, 0.5)",
  },
  cardHovered: {
    transform: [{ scale: 1.02 }],
    borderColor: "#3b82f6",
    zIndex: 10,
    elevation: 10,
  },
  cardOtherHovered: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  iconDefault: {
    backgroundColor: "#1e293b",
  },
  iconGoalAchieved: {
    backgroundColor: "rgba(5, 150, 105, 0.5)",
  },
  muscleGroup: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginLeft: 12,
  },
  awardIcon: {
    marginLeft: "auto",
  },
  volumeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  volumeLabel: {
    color: "#94a3b8",
  },
  volumeValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  volumeDefault: {
    color: "#60a5fa",
  },
  volumeAchieved: {
    color: "#4ade80",
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 24,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#374151",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  goalAchievedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(5, 150, 105, 0.3)",
    borderRadius: 8,
    padding: 8,
    marginTop: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(74, 222, 128, 0.5)",
  },
  partyIcon: {
    marginRight: 8,
  },
  goalAchievedText: {
    color: "#4ade80",
    fontWeight: "500",
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  dateText: {
    color: "#7dd3fc",
    fontSize: 14,
  },
  goalButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#1e293b",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  goalButtonText: {
    color: "#e2e8f0",
  },
});

export default MuscleRecordItem;
