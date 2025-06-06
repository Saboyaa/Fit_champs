import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Image } from "react-native";
import TrainingChart from "./TrainingChart";
import TrendIndicator from "./TrendIndicator";
import ProgressIndicator from "./ProgressIndicator";
import { calculateTrend, getIconComponent } from "./Utils";

const TrainingCard = ({
  type: type,
  data: data,
  icons: icons,
  isLastItemOdd: isLastItemOdd,
  hoveredChart: hoveredChart,
  setHoveredChart: setHoveredChart,
  visualizationType: visualizationType,
  showMetas: showMetas,
  metas: metas,
}) => {
  const isHovered = hoveredChart === type;
  const isOtherHovered = hoveredChart !== null && hoveredChart !== type;
  const scaleValue = new Animated.Value(1);
  const opacityValue = new Animated.Value(1);
  const translateYValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: isHovered ? 1.05 : 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: isOtherHovered ? 0.5 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateYValue, {
        toValue: isHovered ? -10 : 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isHovered, isOtherHovered]);

  const animatedStyle = {
    transform: [{ scale: scaleValue }, { translateY: translateYValue }],
    opacity: opacityValue,
  };


  return (
    <TouchableWithoutFeedback
      onPressIn={() => setHoveredChart(type)}
      onPressOut={() => setHoveredChart(null)}
    >
      <Animated.View
        style={[
          styles.card,
          isLastItemOdd && styles.fullWidthCard,
          isHovered && styles.hoveredCard,
          animatedStyle,
        ]}
      >
        <View style={styles.header}>
          <View style={[styles.titleContainer, isHovered && styles.hoveredTitle]}>
            <Text style={[styles.title, isHovered && styles.hoveredTitleText]}>
              {type}
            </Text>
          </View>
          
          {data.length > 0 && (
            <View style={[styles.dateBadge, isHovered && styles.hoveredBadge]}>
              <Text style={styles.dateText}>Último: {data[data.length - 1].data}</Text>
            </View>
          )}
        </View>

        <Animated.View style={[styles.chartContainer, isHovered && styles.hoveredChart]}>
          <TrainingChart
            type={type}
            data={data}
            showMetas={showMetas}
            metas={metas}
            visualizationType={visualizationType}
            hoveredChart={hoveredChart}
            isLastItemOdd={isLastItemOdd}
          />
        </Animated.View>

        <View style={[styles.footer, isHovered && styles.hoveredFooter]}>
          <TrendIndicator trend={calculateTrend(data)} />
          {showMetas && (
            <ProgressIndicator type={type} data={data} meta={metas[type]} />
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)', // slate-800/90
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155', // slate-700
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  fullWidthCard: {
    width: '100%',
  },
  hoveredCard: {
    borderColor: '#3b82f6', // blue-500
    borderWidth: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
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
  hoveredTitle: {
    transform: [{ scale: 1.1 }],
  },
  iconContainer: {
    backgroundColor: '#334155', // slate-700
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  hoveredIcon: {
    backgroundColor: '#1d4ed8', // blue-700
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: '#e2e8f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9', // slate-100
  },
  hoveredTitleText: {
    color: '#93c5fd', // blue-300
  },
  dateBadge: {
    backgroundColor: '#334155', // slate-700
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  hoveredBadge: {
    backgroundColor: '#1d4ed8', // blue-700
  },
  dateText: {
    color: '#93c5fd', // blue-300
    fontSize: 12,
  },
  chartContainer: {
    marginBottom: 16,
  },
  hoveredChart: {
    transform: [{ scale: 1.05 }],
  },
  footer: {
    backgroundColor: '#1e293b', // slate-800
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155', // slate-700
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hoveredFooter: {
    borderColor: 'rgba(59, 130, 246, 0.5)', // blue-500/50
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
});

export default TrainingCard;
