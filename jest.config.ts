import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testMatch: ['**/+(*.)+(spec).ts'],
};

export default config;
