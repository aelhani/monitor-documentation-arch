import { useEffect, useState } from 'react';
import { fetchSensors } from '../services/apiClient';
import { summarizeByState } from '../utils/transformSensorData';

export const useDashboardState = () => {
  const [summary, setSummary] = useState({ normal: 0, warning: 0, critical: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSensors()
      .then((sensors) => setSummary(summarizeByState(sensors)))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { summary, isLoading, error };
};
