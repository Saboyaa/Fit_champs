// src/components/GraficosEvolucao/TrainingChart.tsx
import React from "react";
import { Dimensions, Text, TextStyle, View, ViewStyle } from "react-native";
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTheme
} from "victory";

const { width: screenWidth } = Dimensions.get("window");

// Type definitions
interface TrainingDataItem {
  data: string;
  volume: number;
}

interface ChartDataItem {
  x: number;
  y: number;
  label: string;
}

interface TrainingChartProps {
  type: string;
  data: TrainingDataItem[];
  showMetas: boolean;
  metas: Record<string, number>;
  visualizationType: "line" | "bar";
  hoveredChart?: string;
  isLastItemOdd?: boolean;
}

interface CustomTooltipProps {
  datum?: ChartDataItem;
  x?: number;
  y?: number;
}

const TrainingChart: React.FC<TrainingChartProps> = ({
  type,
  data,
  showMetas,
  metas,
  visualizationType,
  hoveredChart,
  isLastItemOdd = false,
}) => {
  // Convert data format for Victory
  const chartData: ChartDataItem[] = data.map((item, index) => ({
    x: index + 1, // Victory works better with numeric x values
    y: item.volume,
    label: item.data, // Keep original date for tooltips
  }));

  // Meta data for line chart
  const metaData: ChartDataItem[] = showMetas
    ? data.map((item, index) => ({
        x: index + 1,
        y: metas[type] || 0,
        label: item.data,
      }))
    : [];

  const chartWidth: number = isLastItemOdd ? screenWidth * 0.8 : screenWidth * 0.9;
  const chartHeight: number = 250;

  // Color scheme
  const primaryColor: string = hoveredChart === type ? "#1E40AF" : "#3B82F6";
  const metaColor: string = "#10B981";
  const gridColor: string = "#374151";
  const textColor: string = "#94a3b8";

  // Custom tooltip component
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ datum, x, y }) => {
    if (!datum || x === undefined || y === undefined) return null;
    
    const metaValue: number | undefined = showMetas ? metas[type] : undefined;
    
    const tooltipStyle: ViewStyle = {
      position: "absolute",
      left: x - 60,
      top: y - 80,
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#1e293b",
      padding: 12,
      minWidth: 120,
    };

    const titleStyle: TextStyle = {
      color: "#e2e8f0",
      fontSize: 12,
      fontWeight: "600",
      marginBottom: 4,
    };

    const rowStyle: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 2,
    };

    const dotStyle: ViewStyle = {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 8,
    };

    const textStyle: TextStyle = {
      fontSize: 11,
    };

    const boldTextStyle: TextStyle = {
      fontWeight: "bold",
    };
    
    return (
      <View style={tooltipStyle}>
        <Text style={titleStyle}>
          {datum.label}
        </Text>
        <View style={rowStyle}>
          <View style={[dotStyle, { backgroundColor: "#3B82F6" }]} />
          <Text style={[textStyle, { color: "#60A5FA" }]}>
            Treino: <Text style={boldTextStyle}>{datum.y} kg</Text>
          </Text>
        </View>
        {metaValue && metaValue > 0 && (
          <View style={rowStyle}>
            <View style={[dotStyle, { backgroundColor: "#10B981" }]} />
            <Text style={[textStyle, { color: "#34D399" }]}>
              Meta: <Text style={boldTextStyle}>{metaValue} kg</Text>
            </Text>
          </View>
        )}
      </View>
    );
  };

  const containerStyle: ViewStyle = {
    height: chartHeight + 60, // Extra space for legend
    width: chartWidth,
    alignSelf: isLastItemOdd ? "center" : "stretch",
    backgroundColor: "transparent",
  };

  const legendContainerStyle: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  };

  const legendItemStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  };

  const legendLineStyle: ViewStyle = {
    width: 16,
    height: 3,
    backgroundColor: primaryColor,
    marginRight: 6,
    borderRadius: 1,
  };

  const legendDashedLineStyle: ViewStyle = {
    width: 16,
    height: 2,
    borderWidth: 1,
    borderColor: metaColor,
    borderStyle: "dashed",
    marginRight: 6,
    borderRadius: 1,
  };

  const legendTextStyle: TextStyle = {
    color: textColor,
    fontSize: 11,
  };

  return (
    <View style={containerStyle}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={chartWidth}
        height={chartHeight}
        padding={{ left: 60, top: 20, right: 20, bottom: 40 }}
        domainPadding={{ x: 20 }}
      >
        {/* X Axis */}
        <VictoryAxis
          dependentAxis={false}
          tickFormat={(t: number) => {
            const dataPoint = data[t - 1];
            return dataPoint ? dataPoint.data.split('/').slice(0, 2).join('/') : "";
          }}
          style={{
            axis: { stroke: "#334155" },
            tickLabels: { 
              fill: textColor, 
              fontSize: 10, 
              angle: -45,
              textAnchor: "end"
            },
            grid: { stroke: "transparent" },
          }}
        />

        {/* Y Axis */}
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "#334155" },
            tickLabels: { fill: textColor, fontSize: 12 },
            grid: { 
              stroke: gridColor, 
              strokeDasharray: "3,3", 
              strokeOpacity: 0.3 
            },
          }}
        />

        {/* Chart based on visualization type */}
        {visualizationType === "line" ? (
          <>
            {/* Area under the line for gradient effect */}
            <VictoryArea
              data={chartData}
              style={{
                data: {
                  fill: primaryColor,
                  fillOpacity: 0.2,
                  stroke: "transparent",
                },
              }}
              animate={{
                duration: 1000,
                onLoad: { duration: 500 },
              }}
            />

            {/* Main data line */}
            <VictoryLine
              data={chartData}
              style={{
                data: {
                  stroke: primaryColor,
                  strokeWidth: hoveredChart === type ? 3 : 2,
                },
              }}
              animate={{
                duration: 1000,
                onLoad: { duration: 500 },
              }}
            />

            {/* Meta line */}
            {showMetas && metaData.length > 0 && metas[type] > 0 && (
              <>
                <VictoryArea
                  data={metaData}
                  style={{
                    data: {
                      fill: metaColor,
                      fillOpacity: 0.1,
                      stroke: "transparent",
                    },
                  }}
                />
                <VictoryLine
                  data={metaData}
                  style={{
                    data: {
                      stroke: metaColor,
                      strokeWidth: 2,
                      strokeDasharray: "5,5",
                    },
                  }}
                />
              </>
            )}
          </>
        ) : (
          <>
            {/* Bar chart */}
            <VictoryBar
              data={chartData}
              style={{
                data: {
                  fill: primaryColor,
                  fillOpacity: 0.8,
                },
              }}
              cornerRadius={{ top: 4 }}
              animate={{
                duration: 1000,
                onLoad: { duration: 500 },
              }}
            />

            {/* Meta line for bar chart */}
            {showMetas && metaData.length > 0 && metas[type] > 0 && (
              <VictoryLine
                data={metaData}
                style={{
                  data: {
                    stroke: metaColor,
                    strokeWidth: 2,
                    strokeDasharray: "5,5",
                  },
                }}
              />
            )}
          </>
        )}
      </VictoryChart>

      {/* Custom Legend */}
      <View style={legendContainerStyle}>
        <View style={legendItemStyle}>
          <View style={legendLineStyle} />
          <Text style={legendTextStyle}>
            Volume {type}
          </Text>
        </View>
        
        {showMetas && metas[type] > 0 && (
          <View style={[legendItemStyle, { marginRight: 0 }]}>
            <View style={legendDashedLineStyle} />
            <Text style={legendTextStyle}>
              Meta
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TrainingChart;