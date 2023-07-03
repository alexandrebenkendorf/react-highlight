module.exports = {
  jest: {
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}}', '!**/node_modules/**'],
    // coverageReporters: ['text-summary', 'lcov', 'cobertura'],
    testMatch: ['**/*.{spec,test}.*'],
  },
};
