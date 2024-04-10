import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  maxWorkers: 2,
  testRegex: '.*\\.spec\\.ts$',
  setupFilesAfterEnv: ['./test/unit/setup.ts', 'jest-extended/all'],
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: '../coverage',
};

export default config;
