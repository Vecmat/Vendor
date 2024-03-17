import baseConfig from '../../jest.config.js';

/** @type {import('jest').Config} */
const config = {
  ...baseConfig,
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['jest-matcher-specific-error'],
};

export default config;
