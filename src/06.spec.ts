import {distribute, loop} from './06';

describe('day 6', function () {
  describe('distribute()', function () {
    [
      [[0, 0, 0, 0], [0, 0, 0, 0]],
      [[0, 2, 7, 0], [2, 4, 1, 2]],
      [[2, 4, 1, 2], [3, 1, 2, 3]],
    ].forEach(([input, result]: [number[], number[]]) => {
      it(`"should distribute [${input.join()}] to [${result.join()}]`, function () {
        expect(distribute(input)).toEqual(result);
      });
    });
    it(`"should need 1 steps for [0, 0]`, function () {
      expect(loop([0, 0])).toBe(1);
    });
    it(`"should need 5 steps for star 1`, function () {
      expect(loop([0, 2,  7,  0])).toBe(5);
    });
  });
});
