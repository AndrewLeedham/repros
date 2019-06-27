module.exports = {
  verbose: false,
  testRunner: 'jest-circus/runner',
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['cobertura'],
  coverageDirectory: './reports/istanbul/',
  "testSequencer": "./Sequencer.js"
};
