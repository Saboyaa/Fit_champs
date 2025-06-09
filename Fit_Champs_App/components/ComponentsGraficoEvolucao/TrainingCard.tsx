import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TrainingChart from "./TrainingChart";

interface TrainingDataItem {
  data: string;
  volume: number;
}

interface TrainingCardProps {
  type: string;
  data: TrainingDataItem[];
  isLastItemOdd: boolean;
  hoveredChart: string | "null";
  setHoveredChart: (type: string | null) => void;
  visualizationType: "line" | "bar";
  showMetas: boolean;
  metas: Record<string, number>;
}

const TrainingCard: React.FC<TrainingCardProps> = ({
  type,
  data,
  isLastItemOdd,
  hoveredChart,
  setHoveredChart,
  visualizationType,
  showMetas,
  metas,
}) => {
  const isHovered = hoveredChart === type;
  const isOtherHovered = hoveredChart !== null && hoveredChart !== type;

  const cardStyles = [
    styles.card,
    isHovered && styles.cardHovered,
    isOtherHovered && styles.cardOtherHovered,
    isLastItemOdd && styles.lastItemOdd,
  ];

  const iconContainerStyles = [
    styles.iconContainer,
    isHovered && styles.iconContainerHovered,
  ];

  const titleStyles = [
    styles.title,
    isHovered && styles.titleHovered,
  ];

  const lastDateStyles = [
    styles.lastDate,
    isHovered && styles.lastDateHovered,
  ];

  const chartContainerStyles = [
    styles.chartContainer,
    isHovered && styles.chartContainerHovered,
  ];

  const footerStyles = [
    styles.footer,
    isHovered && styles.footerHovered,
  ];

  return (
    <TouchableOpacity
      style={cardStyles}
      activeOpacity={0.9}
      onPressIn={() => setHoveredChart(type)}
      onPressOut={() => setHoveredChart(null)}
    >
      <View style={styles.header}>
        <View style={[styles.titleContainer, isHovered && styles.titleContainerHovered]}>
          <Text style={titleStyles}>
            {type}
          </Text>
        </View>
        <View style={lastDateStyles}>
          <Text style={styles.lastDateText}>
            {data.length > 0 && `Último: ${data[data.length - 1].data}`}
          </Text>
        </View>
      </View>

      <View style={chartContainerStyles}>
        <TrainingChart
          type={type}
          data={data}
          showMetas={showMetas}
          metas={metas}
          visualizationType={visualizationType}
          hoveredChart={hoveredChart}
          isLastItemOdd={isLastItemOdd}
        />
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHovered: {
    transform: [{ scale: 1.02 }],
    borderColor: '#3b82f6',
    borderWidth: 2,
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cardOtherHovered: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  lastItemOdd: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainerHovered: {
    transform: [{ scale: 1.05 }],
  },
  iconContainer: {
    backgroundColor: '#1e293b',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  iconContainerHovered: {
    backgroundColor: 'rgba(29, 78, 216, 0.7)',
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  titleHovered: {
    color: '#93c5fd',
  },
  lastDate: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  lastDateHovered: {
    backgroundColor: 'rgba(29, 78, 216, 0.7)',
  },
  lastDateText: {
    color: '#93c5fd',
    fontSize: 12,
  },
  chartContainer: {
    marginBottom: 16,
  },
  chartContainerHovered: {
    transform: [{ scale: 1.03 }],
  },
  footer: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  footerHovered: {
    borderColor: 'rgba(59, 130, 246, 0.5)',
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
  },
});

export default TrainingCard;