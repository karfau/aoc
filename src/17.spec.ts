import {digitAfter, spin} from './17';

describe('day 6', () => {
  describe('spin()', () => {
    [
      [[0], [0, 1]],
      [[0, 1], [0, 2, 1]],
      [[0, 2, 1], [0, 2, 3, 1]],
      [[0, 2, 3, 1], [0, 2, 4, 3, 1]],
      [[0, 2, 4, 3, 1], [0, 5, 2, 4, 3, 1]],
      [[0, 5, 2, 4, 3, 1], [0, 5, 2, 4, 3, 6, 1]],
      [[0, 5, 2, 4, 3, 6, 1], [0, 5, 7, 2, 4, 3, 6, 1]],
      [[0, 5, 7, 2, 4, 3, 6, 1], [0, 5, 7, 2, 4, 3, 8, 6, 1]],
      [[0, 5, 7, 2, 4, 3, 8, 6, 1], [0, 9, 5, 7, 2, 4, 3, 8, 6, 1]],
    ].forEach(([input, result]: [number[], number[]]) => {
      it(`should spin from [${input.join()}] to [${result.join()}] using 3 steps`, () => {
        expect(spin(input, 3)).toEqual(result);
      });
    });
  });

  describe('digitAfter()', () => {
    it('should work for example', () => {
      expect(digitAfter(3)).toBe(638);
    });
  });
});
