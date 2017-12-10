import {asciiLength, INITIAL, LENGTH_SUFFIX, mergeReverse, pick, step} from './10';

describe('day 10', function () {
  describe('pick()', function () {
    [
      [0, 3, [0, 1, 2]],
      [3, 4, [3, 4, 0, 1]],
    ].forEach(([pos, length, result]: [number, number, number[]]) => {
      it(`"should pick [${result.join()}] from starting from ${pos} with length ${length}`, function () {
        expect(pick([0, 1, 2, 3, 4], pos, length)).toEqual(result);
      });
    });
  });

  describe('mergeReverse()', function () {
    [
      [0, [0, 1, 2], [2, 1, 0, 3, 4]],
      [1, [1, 2, 3], [0, 3, 2, 1, 4]],
      [3, [3, 4, 0, 1], [4, 3, 2, 1, 0]],
      [1, [3, 0, 1, 2, 4], [3, 4, 2, 1, 0]],
    ].forEach(([pos, picked, result]: [number, number[], number[]]) => {
      it(`"should merge [${picked.join()}] starting from ${pos} to [${result.join()}]`, function () {
        expect(mergeReverse([0, 1, 2, 3, 4], pos, picked)).toEqual(result);
      });
    });
  });

  describe('step()', function () {
    it(`"should work for example`, function () {
      const actual = [3, 4, 1, 5].reduce(step, {...INITIAL, data: [0, 1, 2, 3, 4]});
      expect(actual).toEqual({data: [3, 4, 2, 1, 0], pos: 4, skipSize: 4});
    });
  });

  describe('asciiLength()', function () {
    [
      ['1,2,3', [49, 44, 50, 44, 51, ...LENGTH_SUFFIX]],
    ].forEach(([input, result]: [string, number[]]) => {
      it(`"should emit [${result.join()}] from "${input}"`, function () {
        expect(asciiLength(input)).toEqual(result);
      });
    });
  });

});
