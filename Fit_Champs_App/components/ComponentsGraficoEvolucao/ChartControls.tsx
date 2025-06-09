import { BarChart2, Calendar, Filter, Target } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ChartControls = ({
  viewMode,
  setViewMode,
  visualizationType,
  setVisualizationType,
  showMetas,
  setShowMetas,
}: {
  viewMode: string;
  setViewMode: (mode: string) => void;
  visualizationType: string;
  setVisualizationType: (type: string) => void;
  showMetas: boolean;
  setShowMetas: (show: boolean) => void;
}) => {
  const renderButton = (
    icon: React.ReactElement | null,
    text: string,
    active: boolean,
    onPress: () => void,
    isGoalButton: boolean = false
  ) => {
    const activeBgColor = isGoalButton ? '#16a34a' : '#4338ca';
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          active ? { backgroundColor: activeBgColor } : styles.inactiveButton
        ]}
      >
        <Text style={active ? styles.buttonTextActive : styles.buttonTextInactive}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* View modes */}
      <View style={styles.controlGroup}>
        {renderButton(
          <Filter size={16} />,
          "Por Grupo",
          viewMode === "cards",
          () => setViewMode("cards")
        )}
        {renderButton(
          <BarChart2 size={16} />,
          "Comparação",
          viewMode === "comparison",
          () => setViewMode("comparison")
        )}
        {renderButton(
          <Calendar size={16} />,
          "Resumo",
          viewMode === "summary",
          () => setViewMode("summary")
        )}
      </View>
      
      {/* Chart type */}
      <View style={styles.controlGroup}>
        {renderButton(
          null,
          "Linha",
          visualizationType === "line",
          () => setVisualizationType("line")
        )}
        {renderButton(
          null,
          "Barras",
          visualizationType === "bar",
          () => setVisualizationType("bar")
        )}
      </View>
      
      {/* Goals toggle */}
      <View style={styles.controlGroup}>
        {renderButton(
          <Target size={16} />,
          showMetas ? "Ocultar Metas" : "Mostrar Metas",
          showMetas,
          () => setShowMetas(!showMetas),
          true
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
    width: '90%',
    alignSelf: 'center',
  },
  controlGroup: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  inactiveButton: {
    backgroundColor: '#334155',
  },
  buttonTextActive: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '500',
  },
  buttonTextInactive: {
    color: '#e2e8f0',
    marginLeft: 8,
    fontWeight: '500',
  },
  icon: {
    marginRight: 0, // reset since we're using marginLeft in text
  },
});

export default ChartControls;