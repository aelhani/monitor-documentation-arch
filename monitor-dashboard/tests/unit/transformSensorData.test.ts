import { deriveSensorState, summarizeByState } from '../../src/utils/transformSensorData';

describe('transformSensorData', () => {
  it('derives critical/warning/normal correctly', () => {
    expect(deriveSensorState({ id: '1', value: 95, thresholdWarning: 70, thresholdCritical: 90 })).toBe('critical');
    expect(deriveSensorState({ id: '2', value: 75, thresholdWarning: 70, thresholdCritical: 90 })).toBe('warning');
    expect(deriveSensorState({ id: '3', value: 55, thresholdWarning: 70, thresholdCritical: 90 })).toBe('normal');
  });

  it('summarizes counts by state', () => {
    const result = summarizeByState([
      { id: '1', value: 95, thresholdWarning: 70, thresholdCritical: 90 },
      { id: '2', value: 75, thresholdWarning: 70, thresholdCritical: 90 },
      { id: '3', value: 55, thresholdWarning: 70, thresholdCritical: 90 }
    ]);

    expect(result).toEqual({ normal: 1, warning: 1, critical: 1 });
  });
});
