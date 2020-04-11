module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules/', 'build/'],
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
};