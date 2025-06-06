import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TrainingCard } from "./TrainingCard";

export const GroupChartView = ({
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
    <ScrollView contentContainerStyle={styles.container}>
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
                icons={icons}
                isLastItemOdd={isLastItemOdd}
                hoveredChart={hoveredChart}
                setHoveredChart={setHoveredChart}
                visualizationType={visualizationType}
                showMetas={showMetas}
                metas={metas}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
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
    width: "48%", // Leaves small gap between cards
    marginBottom: 24,
  },
  fullWidthCard: {
    width: "100%", // Full width for last odd card
  },
});

