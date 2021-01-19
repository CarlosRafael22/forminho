module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
    // collectCoverage: true,
    // collectCoverageFrom: ['src/**/*.ts(x)?', '!src/**/stories.tsx'],
    // setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  }