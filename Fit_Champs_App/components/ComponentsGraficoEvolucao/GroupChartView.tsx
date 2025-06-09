import React from "react";
import { StyleSheet, View } from "react-native";
import TrainingCard from "./TrainingCard";

// Define the props interface
interface GroupChartViewProps {
  trainingData: Record<string, any>; // or more specific type based on your data structure
  trainingTypes: string[];
  hoveredChart: string | null;
  setHoveredChart: (chart: string | null) => void;
  visualizationType: string;
  showMetas: boolean;
  metas: any; // Replace with specific type if known
  icons: Record<string, any>; // or more specific icon type
}

export const GroupChartView: React.FC<GroupChartViewProps> = ({
  trainingData,
  trainingTypes,
  hoveredChart,
  setHoveredChart,
  visualizationType,
  showMetas,
  metas,
  icons,
}) => {
  const isOdd = trainingTypes.length % 2 !== 0;
  const lastItemIndex = trainingTypes.length - 1;

  return (
      <View style={styles.gridContainer}>
        {trainingTypes.map((type, index) => {
          const isLastItemOdd = isOdd && index === lastItemIndex;
          return (
            <View
              key={type}
              style={[
                styles.cardWrapper,
                isLastItemOdd && styles.fullWidthCard
              ]}
            >
              <TrainingCard
                type={type}
                data={trainingData[type]}
                isLastItemOdd={isLastItemOdd}
                hoveredChart={hoveredChart||''}
                setHoveredChart={setHoveredChart}
                visualizationType="line"
                showMetas={showMetas}
                metas={metas}
              />
            </View>
          );
        })}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    width: "95%",
    alignSelf: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 24,
  },
  fullWidthCard: {
    width: "100%",
  },
});