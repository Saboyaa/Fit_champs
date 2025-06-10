import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { User, Info, ActivitySquare, Edit } from "lucide-react-native";
import IMCSection from "./IMCSection";

const UserProfileCard = ({ userData, openProfileModal }) => {
  return (
    <View style={styles.cardContainer}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.userName}>Olá, {userData.nome}!</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
          </View>

          <Image
            source={userData.foto}
            style={styles.userImage}
            resizeMode="cover"
          />
        </View>

      <View style={styles.gridContainer}>
        <View style={styles.infoCard}>
          <View style={styles.sectionHeader}>
            <Info color="#60a5fa" size={20} />
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefone:</Text>
              <Text style={styles.infoValue}>{userData.telefone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Idade:</Text>
              <Text style={styles.infoValue}>{userData.idade} anos</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Altura:</Text>
              <Text style={styles.infoValue}>{userData.altura} cm</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Peso:</Text>
              <Text style={styles.infoValue}>{userData.peso} kg</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cidade:</Text>
              <Text style={styles.infoValue}>{userData.cidade}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Sexo:</Text>
              <Text style={styles.infoValue}>{userData.sexo}</Text>
            </View>
          </View>

          <IMCSection imc={userData.imc} />

        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#0f172a",
    marginBottom: 16,
    overflow: "hidden",
    padding:10,
  },
  gradientHeader: {
    padding: 24,
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin:8,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  userEmail: {
    color: "#93c5fd",
  },
  userImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  infoCard: {
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginLeft: 8,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
  },
  infoLabel: {
    fontWeight: "500",
    color: "#94a3b8",
    width: 80,
  },
  infoValue: {
    color: "#bfdbfe",
  },
  editButton: {
    marginTop: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default UserProfileCard;
