import {instruction} from './18';

const INITIAL = (): any => ({
  z: 0, // zero
  p: 1, // positive
  n: -1 // negative
});

describe('day 6', () => {
  describe('instruction()', () => {
    [
      ["set a 1", {...INITIAL(), a: 1, _move: 1}],
      ["set a z", {...INITIAL(), a: 0, _move: 1}],
      ["snd 5", {...INITIAL(), _snd: 5, _move: 1}],
      ["snd p", {...INITIAL(), _snd: 1, _move: 1}],
    ].forEach(([input, result]: [string, any]) => {
      it(`"${input}" should result in ${JSON.stringify(result)}`, () => {
        expect(instruction(INITIAL(), input)).toEqual(result);
      });
    });
  });
});
