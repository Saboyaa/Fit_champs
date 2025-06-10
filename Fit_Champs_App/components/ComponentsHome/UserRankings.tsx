import { useNavigation } from "@react-navigation/native";
import { LucideMedal, TrendingUp } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UserRankings = ({ userData }) => {
  const navigation = useNavigation();

  // Simulated muscle records for the ranking display
  const recordesMusculares = [
    {
      grupo: "Peito",
      recordeVolume: 4000,
      metaVolume: 5000,
      data: "2022-10-10",
    },
    {
      grupo: "Costas",
      recordeVolume: 6100,
      metaVolume: 6000,
      data: "2022-10-11",
    },
    {
      grupo: "Perna",
      recordeVolume: 7200,
      metaVolume: 8000,
      data: "2022-10-12",
    },
    {
      grupo: "Ombro",
      recordeVolume: 2800,
      metaVolume: 4000,
      data: "2022-10-14",
    },
    {
      grupo: "Braço",
      recordeVolume: 1800,
      metaVolume: 3000,
      data: "2022-10-15",
    },
  ];

  // Navigate to rankings page
  const goToRankings = () => {
    navigation.navigate("Rank");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LucideMedal color="#facc15" size={20} />
          <Text style={styles.headerTitle}>Posições no Ranking</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={goToRankings}
        >
          <TrendingUp color="#93c5fd" size={14} />
          <Text style={styles.viewAllText}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rankingsGrid}>
        {recordesMusculares.map((recorde) => (
          <TouchableOpacity 
            key={recorde.grupo} 
            style={styles.rankingItem}
            activeOpacity={0.8}
          >
            <View style={styles.itemContent}>
              <View>
                <Text style={styles.rankText}>
                  <Text style={styles.rankNumber}>{userData.posicaoRank}º </Text>
                  <Text style={styles.muscleGroup}>{recorde.grupo}</Text>
                </Text>
                <Text style={styles.categoryText}>
                  Categoria: {recorde.grupo}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  viewAllText: {
    color: "#93c5fd",
    fontSize: 12,
  },
  rankingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  rankingItem: {
    width: "48%",
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    backgroundColor: "#334155",
    padding: 8,
    borderRadius: 8,
  },
  rankText: {
    color: "white",
  },
  rankNumber: {
    color: "#facc15",
    fontSize: 18,
    fontWeight: "bold",
  },
  muscleGroup: {
    fontWeight: "500",
  },
  categoryText: {
    fontSize: 12,
    color: "#93c5fd",
  },
});

export default UserRankings;
