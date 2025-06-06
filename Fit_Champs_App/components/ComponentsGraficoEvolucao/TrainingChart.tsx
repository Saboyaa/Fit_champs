import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { VictoryChart, VictoryLine, VictoryBar, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer, VictoryLegend, VictoryScatter } from "victory-native";
import Svg, { Defs, LinearGradient, Stop } from "react-native-svg";
import { calculateTrainingChartYAxis } from "./Utils";

export const TrainingChart = ({
  type="cardio",
  data,
  showMetas,
  metas,
  visualizationType,
  hoveredChart,
  isLastItemOdd = false,
}) => {
  const chartWidth = Dimensions.get("window").width * (isLastItemOdd ? 0.8 : 0.9);
  const chartHeight = 250;

  // Prepare data with meta
  const updatedData = data.map((item) => ({
    ...item,
    meta: showMetas ? metas[type] || 0 : 0,
  }));

  // Y-axis configuration
  const yAxisConfig = calculateTrainingChartYAxis(data, metas, type, showMetas);

  // Custom tooltip component
  const CustomTooltip = ({ datum }) => {
    if(!datum) return null;
    return (
      <View style={styles.tooltip}>
        <Text style={styles.tooltipDate}>{datum.data}</Text>
        <View style={styles.tooltipRow}>
          <View style={[styles.tooltipDot, styles.workoutDot]} />
          <Text style={styles.tooltipText}>
            Treino: <Text style={styles.tooltipValue}>{datum.volume} kg</Text>
          </Text>
        </View>
        {showMetas && (
          <View style={styles.tooltipRow}>
            <View style={[styles.tooltipDot, styles.goalDot]} />
            <Text style={styles.tooltipText}>
              Meta: <Text style={styles.tooltipValue}>{metas[type]} kg</Text>
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { width: chartWidth }]}>

      {visualizationType === "line" ? (
        <VictoryChart
          theme={VictoryTheme?.material}
          width={chartWidth}
          height={chartHeight}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={({ datum }) => datum.volume}
              labelComponent={
                <VictoryTooltip
                  flyoutComponent={<CustomTooltip />}
                  cornerRadius={8}
                  flyoutStyle={styles.tooltipFlyout}
                />
              }
            />
          }
        >
          <VictoryAxis
            style={{
              axis: { stroke: "#334155" },
              tickLabels: { fill: "#94a3b8" },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "#334155" },
              tickLabels: { fill: "#94a3b8" },
            }}
            label="Volume (kg)"
            domain={yAxisConfig.domain}
            tickValues={yAxisConfig.ticks}
          />
          <VictoryLine
            data={data}
            x="data"
            y="volume"
            style={{
              data: {
                stroke: hoveredChart === type ? "#1E40AF" : "#3B82F6",
                strokeWidth: hoveredChart === type ? 3 : 2,
              },
            }}
          />
          {showMetas && (
            <VictoryLine
              data={data.map(item => ({ ...item, volume: metas[type] }))}
              x="data"
              y="volume"
              style={{
                data: {
                  stroke: "#10B981",
                  strokeWidth: 2,
                  strokeDasharray: "5,5",
                },
              }}
            />
          )}
        </VictoryChart>
      ) : (
        <VictoryChart
          theme={VictoryTheme.material}
          width={chartWidth}
          height={chartHeight}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={({ datum }) => datum.volume}
              labelComponent={
                <VictoryTooltip
                  flyoutComponent={<CustomTooltip />}
                  cornerRadius={8}
                  flyoutStyle={styles.tooltipFlyout}
                />
              }
            />
          }
        >
          <VictoryAxis
            style={{
              axis: { stroke: "#334155" },
              tickLabels: { fill: "#94a3b8" },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "#334155" },
              tickLabels: { fill: "#94a3b8" },
            }}
            label="Volume (kg)"
            domain={yAxisConfig.domain}
            tickValues={yAxisConfig.ticks}
          />
          <VictoryBar
            data={data}
            x="data"
            y="volume"
            style={{
              data: {
                fill: `url(#volumeGradient)`,
                width: 20,
              },
            }}
            cornerRadius={{ top: 4 }}
          />
          {showMetas && (
            <VictoryLine
              data={data.map(item => ({ ...item, volume: metas[type] }))}
              x="data"
              y="volume"
              style={{
                data: {
                  stroke: "#10B981",
                  strokeWidth: 2,
                  strokeDasharray: "5,5",
                },
              }}
            />
          )}
        </VictoryChart>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginBottom: 16,
  },
  tooltip: {
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    borderRadius: 8,
    borderColor: "#1e293b",
    padding: 12,
  },
  tooltipFlyout: {
    fill: "rgba(15, 23, 42, 0.9)",
    stroke: "#1e293b",
    strokeWidth: 1,
  },
  tooltipDate: {
    color: "#e2e8f0",
    fontWeight: "bold",
    marginBottom: 8,
    borderBottomColor: "#334155",
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  tooltipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  tooltipDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  workoutDot: {
    backgroundColor: "#3B82F6",
  },
  goalDot: {
    backgroundColor: "#10B981",
  },
  tooltipText: {
    color: "#e2e8f0",
    fontSize: 14,
  },
  tooltipValue: {
    fontWeight: "bold",
  },
});

