export const isMockMode = (): boolean => {
  return import.meta.env.VITE_USE_MOCKS === 'true';
};

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api';
