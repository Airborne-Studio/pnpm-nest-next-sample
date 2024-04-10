import { nextJs } from 'jest-config-airborne';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

export default async () => {
  const config = await createJestConfig({
    ...nextJs,
    setupFilesAfterEnv: ['@testing-library/jest-dom', './jest.setup.ts'],
  })();

  // extending default config.transformIgnorePatterns
  const transformIgnorePatterns = [
    '/node_modules/(?!.pnpm)(?!(react-children-utilities|redux|@babel)/)',
    '/node_modules/.pnpm/(?!(react-children-utilities|redux||@babel)@)',
    '^.+\\.module\\.(css|sass|scss)$',
  ];

  return {
    ...config,
    transformIgnorePatterns,
  };
};
