import {distribute, loop} from './06';

describe('day 6', () => {
  describe('distribute()', () => {
    [
      [[0, 0, 0, 0], [0, 0, 0, 0]],
      [[0, 2, 7, 0], [2, 4, 1, 2]],
      [[2, 4, 1, 2], [3, 1, 2, 3]],
    ].forEach(([input, result]: [number[], number[]]) => {
      it(`should distribute [${input.join()}] to [${result.join()}]`, () => {
        expect(distribute(input)).toEqual(result);
      });
    });
    it(`should need 1 steps for [0, 0]`, () => {
      expect(loop([0, 0])).toEqual([1, 1]);
    });
    it(`should need 5 steps for star 1`, () => {
      expect(loop([0, 2,  7,  0])[0]).toBe(5);
    });
    it(`should return loop size 4 steps for star 2`, () => {
      expect(loop([0, 2,  7,  0])[1]).toBe(4);
    });
  });
});
