import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Filter, BarChart2, Calendar, Target } from "lucide-react-native";

const ChartControls = ({
  viewMode,
  setViewMode,
  visualizationType,
  setVisualizationType,
  showMetas,
  setShowMetas,
}) => {
  const renderButton = (icon, text, active, onPress, isGoalButton = false) => {
    const activeBgColor = isGoalButton ? '#16a34a' : '#4338ca';
    
    return (
      <TouchableOpacity 
        onPress={onPress}
        style={[
          styles.button,
          active ? { backgroundColor: activeBgColor } : styles.inactiveButton
        ]}
      >
        {icon && React.cloneElement(icon, {
          color: active ? 'white' : '#e2e8f0',
          style: styles.icon
        })}
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
