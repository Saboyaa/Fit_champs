import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { VictoryChart, VictoryBar, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryLegend, VictoryVoronoiContainer } from "victory-native";
import { BarChart } from "lucide-react-native";
import { prepareComparisonData } from "./Utils";
import { calculateComparisonChartYAxis } from "./Utils";

const ComparisonChart = ({
  trainingData,
  visualizationType,
  showMetas,
  metas,
}) => {
  const comparisonData = prepareComparisonData(trainingData, metas);
  const yAxisConfig = calculateComparisonChartYAxis(comparisonData, showMetas);
  const chartWidth = Dimensions.get("window").width * 0.9;
  const chartHeight = 400;

  const CustomTooltip = ({ datum }) => {
    return (
      <View style={styles.tooltip}>
        <Text style={styles.tooltipTitle}>{datum.nome}</Text>
        <View style={styles.tooltipRow}>
          <View style={[styles.tooltipDot, styles.volumeDot]} />
          <Text style={styles.tooltipText}>
            Volume: <Text style={styles.tooltipValue}>{datum.volume} kg</Text>
          </Text>
        </View>
        {showMetas && (
          <View style={styles.tooltipRow}>
            <View style={[styles.tooltipDot, styles.metaDot]} />
            <Text style={styles.tooltipText}>
              Meta: <Text style={styles.tooltipValue}>{datum.meta} kg</Text>
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BarChart color="#60a5fa" size={20} style={styles.icon} />
        <Text style={styles.title}>Comparação de Volumes por Grupo Muscular</Text>
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
            <VictoryBar
              data={comparisonData}
              x="nome"
              y="volume"
              style={{
                data: {
                  fill: "#3b82f6",
                  width: 30
                }
              }}
            />
          ) : (
            <VictoryLine
              data={comparisonData}
              x="nome"
              y="volume"
              style={{
                data: {
                  stroke: "#3b82f6",
                  strokeWidth: 2
                }
              }}
            />
          )}

          {showMetas && (
            <VictoryLine
              data={comparisonData}
              x="nome"
              y="meta"
              style={{
                data: {
                  stroke: "#10b981",
                  strokeWidth: 2,
                  strokeDasharray: "5,5"
                }
              }}
            />
          )}

          <VictoryLegend
            x={chartWidth - 150}
            y={20}
            orientation="vertical"
            gutter={20}
            style={{
              labels: { fill: "#e2e8f0" }
            }}
            data={[
              {
                name: "Volume Atual",
                symbol: { fill: "#3b82f6" }
              },
              ...(showMetas ? [{
                name: "Meta",
                symbol: { fill: "#10b981" }
              }] : [])
            ]}
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
  volumeDot: {
    backgroundColor: '#3b82f6'
  },
  metaDot: {
    backgroundColor: '#10b981'
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

export default ComparisonChart;
