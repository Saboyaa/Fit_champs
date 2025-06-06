import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { VictoryChart, VictoryStack, VictoryBar, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryLegend, VictoryVoronoiContainer } from "victory-native";
import { Calendar } from "lucide-react-native";
import { prepareSummaryData } from "./Utils";
import { calculateSummaryChartYAxis } from "./Utils";

const SummaryChart = ({ trainingData, trainingTypes, visualizationType }) => {
  const data = prepareSummaryData(trainingData, trainingTypes);
  const yAxisConfig = calculateSummaryChartYAxis(data, trainingTypes);
  const chartWidth = Dimensions.get("window").width * 0.9;
  const chartHeight = 400;

  const colors = {
    Peito: "#3B82F6",
    Costas: "#10B981",
    Braço: "#F59E0B",
    Perna: "#8B5CF6",
    Ombro: "#EC4899",
  };

  const CustomTooltip = ({ datum }) => {
    return (
      <View style={styles.tooltip}>
        <Text style={styles.tooltipTitle}>{datum.data}</Text>
        {trainingTypes.map((type) => {
          if (datum[type] > 0) {
            return (
              <View key={type} style={styles.tooltipRow}>
                <View style={[styles.tooltipDot, { backgroundColor: colors[type] }]} />
                <Text style={styles.tooltipText}>
                  {type}: <Text style={styles.tooltipValue}>{datum[type]} kg</Text>
                </Text>
              </View>
            );
          }
          return null;
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Calendar color="#60a5fa" size={20} style={styles.icon} />
        <Text style={styles.title}>Evolução Total do Treino</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <VictoryChart
          theme={VictoryTheme.material}
          width={chartWidth}
          height={chartHeight}
          domain={{ y: yAxisConfig.domain }}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={({ datum }) => datum.data}
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
              tickLabels: { fill: "#94a3b8" }
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "#334155" },
              tickLabels: { fill: "#94a3b8" }
            }}
            tickValues={yAxisConfig.ticks}
            label="Volume (kg)"
            axisLabelComponent={
              <VictoryLabel
                angle={-90}
                textAnchor="middle"
                style={{ fill: "#94a3b8" }}
                dy={-chartHeight * 0.4}
              />
            }
          />
          
          {visualizationType === "bar" ? (
            <VictoryStack>
              {trainingTypes.map((type) => (
                <VictoryBar
                  key={type}
                  data={data}
                  x="data"
                  y={type}
                  style={{
                    data: {
                      fill: colors[type],
                      width: 20
                    }
                  }}
                />
              ))}
            </VictoryStack>
          ) : (
            <>
              {trainingTypes.map((type) => (
                <VictoryLine
                  key={type}
                  data={data}
                  x="data"
                  y={type}
                  style={{
                    data: {
                      stroke: colors[type],
                      strokeWidth: 2
                    }
                  }}
                />
              ))}
            </>
          )}

          <VictoryLegend
            x={chartWidth - 150}
            y={20}
            orientation="vertical"
            gutter={20}
            style={{
              labels: { fill: "#e2e8f0" }
            }}
            data={trainingTypes.map(type => ({
              name: type,
              symbol: { fill: colors[type] }
            }))}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
    marginBottom: 16,
    width: '95%',
    alignSelf: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  icon: {
    marginRight: 8
  },
  title: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: '600'
  },
  chartContainer: {
    height: 400
  },
  tooltip: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderRadius: 8,
    borderColor: '#1e293b',
    padding: 12,
    minWidth: 150
  },
  tooltipTitle: {
    color: '#e2e8f0',
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomColor: '#334155',
    borderBottomWidth: 1,
    paddingBottom: 4
  },
  tooltipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  tooltipDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8
  },
  tooltipText: {
    color: '#e2e8f0',
    fontSize: 14
  },
  tooltipValue: {
    fontWeight: 'bold'
  },
  tooltipFlyout: {
    fill: 'rgba(15, 23, 42, 0.9)',
    stroke: '#1e293b',
    strokeWidth: 1
  }
});

export default SummaryChart;
