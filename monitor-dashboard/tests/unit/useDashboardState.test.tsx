import { renderHook, waitFor } from '@testing-library/react';
import { useDashboardState } from '../../src/hooks/useDashboardState';

jest.mock('../../src/services/apiClient', () => ({
  fetchSensors: jest.fn().mockResolvedValue([
    { id: '1', value: 95, thresholdWarning: 70, thresholdCritical: 90 },
    { id: '2', value: 72, thresholdWarning: 70, thresholdCritical: 90 },
    { id: '3', value: 20, thresholdWarning: 70, thresholdCritical: 90 }
  ])
}));

describe('useDashboardState', () => {
  it('loads and computes summary', async () => {
    const { result } = renderHook(() => useDashboardState());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.summary).toEqual({ normal: 1, warning: 1, critical: 1 });
    expect(result.current.error).toBeNull();
  });
});
