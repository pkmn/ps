module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules/', 'build/'],
  moduleNameMapper: {
    '^@pkmn/protocol/(.*)$': '<rootDir>/node_modules/@pkmn/protocol/build/$1',
    '^@pkmn/sim/(.*)$': '<rootDir>/node_modules/@pkmn/sim/build/sim/$1',
  }
};