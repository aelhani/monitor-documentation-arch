import normalFixture from '../fixtures/sensors.normal.json';
import warningFixture from '../fixtures/sensors.warning.json';
import criticalFixture from '../fixtures/sensors.critical.json';
import type { SensorReading } from '../utils/transformSensorData';

type Scenario = 'normal' | 'warning' | 'critical';

const fixtureByScenario: Record<Scenario, SensorReading[]> = {
  normal: normalFixture,
  warning: warningFixture,
  critical: criticalFixture
};

export const getMockSensors = (scenario: Scenario = 'normal'): SensorReading[] => {
  return fixtureByScenario[scenario];
};
