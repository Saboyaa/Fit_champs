// src/components/GraficosEvolucao/ComparisonChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";
import { BarChart } from "lucide-react";
import { prepareComparisonData } from "./Utils";
import { calculateComparisonChartYAxis } from "./Utils";

const ComparisonChart = ({
  trainingData,
  visualizationType,
  showMetas,
  metas,
}) => {
  const comparisonData = prepareComparisonData(trainingData, metas);

  // Configuração do eixo Y usando função utilitária
  const yAxisConfig = calculateComparisonChartYAxis(comparisonData, showMetas);

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg w-full border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-slate-100 flex items-center">
        <BarChart className="mr-2 text-blue-400" size={20} />
        Comparação de Volumes por Grupo Muscular
      </h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {visualizationType === "line" ? (
            <LineChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis dataKey="nome" tick={{ fill: "#94a3b8" }} />
              <YAxis
                domain={yAxisConfig.domain}
                ticks={yAxisConfig.ticks}
                label={{
                  value: "Volume (kg)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#94a3b8",
                }}
                tick={{ fill: "#94a3b8" }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "Volume Atual") {
                    return [`${value} kg`, "Volume Atual"];
                  } else if (name === "Meta") {
                    return [`${value} kg`, "Meta"];
                  }
                  return [`${value} kg`, name];
                }}
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  borderRadius: "8px",
                  borderColor: "#1e293b",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
                  color: "#e2e8f0",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Volume Atual"
                activeDot={{ r: 8 }}
              />
              {showMetas && (
                <Line
                  type="monotone"
                  dataKey="meta"
                  stroke="#10B981"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="Meta"
                  dot={false}
                />
              )}
            </LineChart>
          ) : (
            <ComposedChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis dataKey="nome" tick={{ fill: "#94a3b8" }} />
              <YAxis
                domain={yAxisConfig.domain}
                ticks={yAxisConfig.ticks}
                label={{
                  value: "Volume (kg)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#94a3b8",
                }}
                tick={{ fill: "#94a3b8" }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "Volume Atual") {
                    return [`${value} kg`, "Volume Atual"];
                  } else if (name === "Meta") {
                    return [`${value} kg`, "Meta"];
                  }
                  return [`${value} kg`, name];
                }}
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  borderRadius: "8px",
                  borderColor: "#1e293b",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
                  color: "#e2e8f0",
                }}
              />
              <Legend />
              <Bar dataKey="volume" fill="#3B82F6" name="Volume Atual" />
              {showMetas && (
                <Line
                  type="monotone"
                  dataKey="meta"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Meta"
                />
              )}
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonChart;
