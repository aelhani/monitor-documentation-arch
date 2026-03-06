module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }]
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/main.tsx'],
  coverageThreshold: {
    global: {
      statements: 38,
      branches: 35,
      functions: 38,
      lines: 38
    }
  }
};
