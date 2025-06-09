import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { calculateProgress } from "./Utils";

interface TrainingDataPoint {
  volume: number | string;
  date: string;
  [key: string]: any;
}

interface ProgressIndicatorProps {
  type: string;
  data: TrainingDataPoint[];
  meta: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ type, data, meta }) => {
  const progress = calculateProgress(data, meta);
  
  // Safely convert volume to number
  const lastVolume = data.length > 0 
    ? (typeof data[data.length - 1].volume === 'number' 
       ? data[data.length - 1].volume 
       : parseFloat(data[data.length - 1].volume as string) || 0)
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>Progresso para meta: {progress}%</Text>
        <Text style={styles.volumeText}>
          {lastVolume} / {meta} kg
        </Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${Math.min(progress, 100)}%`,
              backgroundColor: progress >= 100 ? "#22c55e" : "#2563eb"
            }
          ]}
        />
      </View>
      {progress >= 100 && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Meta alcançada!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    color: '#d1d5db',
    fontSize: 12,
  },
  volumeText: {
    color: '#d1d5db',
    fontSize: 12,
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#374151',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  icon: {
    marginRight: 4,
  },
  successText: {
    color: '#22c55e',
    fontSize: 12,
  },
});

export default ProgressIndicator;