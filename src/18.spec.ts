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
      ["set b x", {...INITIAL(), b: 0, _move: 1}],
      ["set b -50", {...INITIAL(), b: -50, _move: 1}],

      ["snd 5", {...INITIAL(), _snd: 5, _move: 1}],
      ["snd p", {...INITIAL(), _snd: 1, _move: 1}],
      ["snd x", {...INITIAL(), _snd: 0, _move: 1}],

      ["add p 1", {...INITIAL(), p: 2, _move: 1}],
      ["add z z", {...INITIAL(), z: 0, _move: 1}],
      ["add n p", {...INITIAL(), n: 0, _move: 1}],
      ["add p n", {...INITIAL(), p: 0, _move: 1}],
      ["add x 5", {...INITIAL(), x: 5, _move: 1}],
      ["add x -5", {...INITIAL(), x: -5, _move: 1}],

      ["mul p 4", {...INITIAL(), p: 4, _move: 1}],
      ["mul z z", {...INITIAL(), z: 0, _move: 1}],
      ["mul n p", {...INITIAL(), n: -1, _move: 1}],
      ["mul p n", {...INITIAL(), p: -1, _move: 1}],
      ["mul x 5", {...INITIAL(), x: 0, _move: 1}],
      ["mul x -5", {...INITIAL(), x: -0, _move: 1}],

      ["mod p 4", {...INITIAL()/*, p: 1*/, _move: 1}],
      ["mod p p", {...INITIAL(), p: 0, _move: 1}],
      ["mod p 1", {...INITIAL(), p: 0, _move: 1}],
      ["mod x 5", {...INITIAL(), x: 0, _move: 1}],

    ].forEach(([input, result]: [string, any]) => {
      it(`"${input}" should result in ${JSON.stringify(result)}`, () => {
        expect(instruction(INITIAL(), input)).toEqual(result);
      });
    });
  });
});
