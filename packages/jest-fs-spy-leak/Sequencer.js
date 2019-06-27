const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => testA.path.match(/leak/) ? -1 : testB.path.match(/leak/) ? 1 : 0);
  }
}

module.exports = CustomSequencer;