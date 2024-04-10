import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  maxWorkers: 2,
  testRegex: '.e2e-spec.ts$',
  setupFilesAfterEnv: ['./test/e2e/setup.ts', 'jest-extended/all'],
  globalSetup: './test/e2e/globalSetup.ts',
  globalTeardown: './test/e2e/globalTeardown.ts',
};

export default config;
