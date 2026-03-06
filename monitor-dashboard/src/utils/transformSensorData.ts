export type SensorState = 'normal' | 'warning' | 'critical';

export interface SensorReading {
  id: string;
  value: number;
  thresholdWarning: number;
  thresholdCritical: number;
}

export const deriveSensorState = (sensor: SensorReading): SensorState => {
  if (sensor.value >= sensor.thresholdCritical) return 'critical';
  if (sensor.value >= sensor.thresholdWarning) return 'warning';
  return 'normal';
};

export const summarizeByState = (sensors: SensorReading[]) =>
  sensors.reduce(
    (acc, sensor) => {
      acc[deriveSensorState(sensor)] += 1;
      return acc;
    },
    { normal: 0, warning: 0, critical: 0 }
  );
