module.exports = {
  setupFiles: ['<rootDir>src/setupTestsEnv.js'],
  setupFilesAfterEnv: ['<rootDir>src/setupTests.js'],
  coverageReporters: ['html', 'text-summary', 'cobertura', 'lcov'],
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['setupTests.js'],
  testEnvironment: 'jsdom',
};
