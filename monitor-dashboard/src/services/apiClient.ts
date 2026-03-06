import { apiBaseUrl, isMockMode } from '../config/env';
import { getMockSensors } from './mockData';
import type { SensorReading } from '../utils/transformSensorData';

export const fetchSensors = async (): Promise<SensorReading[]> => {
  if (isMockMode()) {
    const scenario = (import.meta.env.VITE_MOCK_SCENARIO ?? 'normal') as 'normal' | 'warning' | 'critical';
    return getMockSensors(scenario);
  }

  const response = await fetch(`${apiBaseUrl}/sensors`);
  if (!response.ok) {
    throw new Error(`Failed to fetch sensors: ${response.status}`);
  }
  return response.json();
};
