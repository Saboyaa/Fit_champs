import { Calendar } from "lucide-react";
import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLegend, VictoryLine, VictoryStack, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from "victory";
import { calculateSummaryChartYAxis, prepareSummaryData } from "./Utils";

interface TrainingData {
  [key: string]: any;
}

interface SummaryChartProps {
  trainingData: TrainingData[];
  trainingTypes: string[];
  visualizationType: "bar" | "line";
}

const SummaryChart: React.FC<SummaryChartProps> = ({ trainingData, trainingTypes, visualizationType }) => {
  const data = prepareSummaryData(trainingData, trainingTypes);
  const yAxisConfig = calculateSummaryChartYAxis(data, trainingTypes);
  const chartWidth = window.innerWidth * 0.9;
  const chartHeight = 400;

  const colors: { [key: string]: string } = {
    Peito: "#3B82F6",
    Costas: "#10B981",
    Braço: "#F59E0B",
    Perna: "#8B5CF6",
    Ombro: "#EC4899",
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Calendar color="#60a5fa" size={20} style={styles.icon} />
        <h3 style={styles.title}>Evolução Total do Treino</h3>
      </div>
      
      <div style={styles.chartContainer}>
        <VictoryChart
          theme={VictoryTheme.material}
          width={chartWidth}
          height={chartHeight}
          domain={{ y: yAxisConfig.domain as [number, number] }}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={({ datum }: { datum: any }) => {
                let tooltipContent = `${datum.data}\n`;
                trainingTypes.forEach(type => {
                  if (datum[type] > 0) {
                    tooltipContent += `${type}: ${datum[type]} kg\n`;
                  }
                });
                return tooltipContent;
              }}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={8}
                  flyoutStyle={styles.tooltipFlyout}
                  style={{
                    fill: "#e2e8f0",
                    fontSize: 12
                  }}
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
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: '12px',
    border: '1px solid #334155',
    padding: '16px',
    marginBottom: '16px',
    width: '95%',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  },
  icon: {
    marginRight: '8px'
  },
  title: {
    color: '#f1f5f9',
    fontSize: '18px',
    fontWeight: '600',
    margin: 0
  },
  chartContainer: {
    height: '400px'
  },
  tooltip: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderRadius: '8px',
    border: '1px solid #1e293b',
    padding: '12px',
    minWidth: '150px'
  },
  tooltipTitle: {
    color: '#e2e8f0',
    fontWeight: 'bold',
    marginBottom: '8px',
    borderBottom: '1px solid #334155',
    paddingBottom: '4px'
  },
  tooltipRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px'
  },
  tooltipDot: {
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    marginRight: '8px'
  },
  tooltipText: {
    color: '#e2e8f0',
    fontSize: '14px'
  },
  tooltipValue: {
    fontWeight: 'bold'
  },
  tooltipFlyout: {
    fill: 'rgba(15, 23, 42, 0.9)',
    stroke: '#1e293b',
    strokeWidth: 1
  }
};

export default SummaryChart;