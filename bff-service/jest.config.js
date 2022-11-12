/* eslint-disable no-undef */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "roots": ["./tests"],
  "testMatch": ["./**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  "transform": { "^.+\\.(ts|tsx)$": "ts-jest" },
}
