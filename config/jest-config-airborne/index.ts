import type { Config } from 'jest';
import type { JestConfigWithTsJest } from 'ts-jest';

const moduleNameMapper: Config['moduleNameMapper'] = {
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/../../config/jest-config-airborne/__mocks__/fileMock.js',
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
};

export const nodeJs: Config = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
};

export const jsDom: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/.pnpm/(?!react-children-utilities)'],
  moduleNameMapper,
  collectCoverageFrom: [],
  coverageDirectory: undefined,
};

export const nextJs: Config = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper,
};
