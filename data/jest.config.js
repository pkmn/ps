module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules/', 'build/'],
  moduleNameMapper: {
    '^@smogon/calc/(.*)$': '<rootDir>/node_modules/@smogon/calc/dist/$1',
  },
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
};