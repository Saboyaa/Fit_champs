import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from "lucide-react-native";

interface trendType {
  type: string,
  diff: number,
}
const TrendIndicator = ( trend : any) => {
  if (trend.type === "melhora") {
    return (
      <View style={[styles.container, styles.improvementContainer]}>
        <ArrowUpCircle color="#22c55e" size={20} />
        <Text style={styles.improvementText}>
          Melhora de <Text style={styles.boldText}>{trend.diff}%</Text> em relação ao treino anterior, continue assim!
        </Text>
      </View>
    );
  } else if (trend.type === "piora") {
    return (
      <View style={[styles.container, styles.declineContainer]}>
        <ArrowDownCircle color="#ef4444" size={20} />
        <Text style={styles.declineText}>
          Queda de <Text style={styles.boldText}>{trend.diff}%</Text> em relação ao treino anterior, não deixe a peteca cair!
        </Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.container, styles.neutralContainer]}>
        <MinusCircle color="#94a3b8" size={20} />
        <Text style={styles.neutralText}>
          Volume mantido em relação ao treino anterior
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  improvementContainer: {
    backgroundColor: 'rgba(22, 163, 74, 0.2)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  declineContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  neutralContainer: {
    backgroundColor: 'rgba(51, 65, 85, 0.3)',
    borderColor: 'rgba(148, 163, 184, 0.3)',
  },
  icon: {
    marginRight: 8,
  },
  improvementText: {
    color: '#22c55e',
    flex: 1,
    flexWrap: 'wrap',
  },
  declineText: {
    color: '#ef4444',
    flex: 1,
    flexWrap: 'wrap',
  },
  neutralText: {
    color: '#94a3b8',
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default TrendIndicator;
