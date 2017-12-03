import {range} from 'lodash';
import {collectPairs, main, sameOrZero} from './01';

describe('day 1', () => {
  describe('sameOrZero()', () => {
    range(0, 10).forEach((num: number) => {
      it(`should return the first digit second is same(${num})`, () => {
        expect(sameOrZero(num, num)).toBe(num);
      });
    });
    range(0, 10).forEach((num: number) => {
      it(`should return zero if second is different (${num})`, () => {
        expect(sameOrZero(num, num - 1)).toBe(0);
        expect(sameOrZero(num, num + 1)).toBe(0);
      });
    });
  });

  describe('collectPairs()', () => {
    it(`should return tuple for single value`, () => {
      expect(collectPairs([1])).toEqual([[1, 1]]);
    });
    it(`should return two tuples for two values`, () => {
      expect(collectPairs([1, 2])).toEqual([[1, 2], [2, 1]]);
    });
    it(`should return distant tuples for two values`, () => {
      expect(collectPairs([1, 2], 2)).toEqual([[1, 1], [2, 2]]);
      expect(collectPairs([1, 2, 3, 4], 3)).toEqual([[1, 4], [2, 1], [3, 2], [4, 3]]);
    });
  });

  describe('main()', () => {
    [
      {input: '1234', result: 0},
      {input: '1122', result: 3},
      {input: '1111', result: 4},
      {input: '91212129', result: 9}
    ].forEach(({input, result}) => {
      it(`should return ${result} for ${input} (v1)`, function () {
        expect(main(input)[0]).toBe(result);
      });
    });

    [
      {input: '1212', result: 6},
      {input: '1221', result: 0},
      {input: '123425', result: 4},
      {input: '12131415', result: 4},
      {input: '123123', result: 12}
    ].forEach(({input, result}) => {
      it(`should return ${result} for ${input} (v2)`, function () {
        expect(main(input)[1]).toBe(result);
      });
    });
  });
});


