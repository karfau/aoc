import {asciiLength, INITIAL, knotHash, LENGTH_SUFFIX, mergeReverse, pick, step, xorConvert} from './10';

describe('day 10', () => {
  describe('pick()', () => {
    [
      [0, 3, [0, 1, 2]],
      [3, 4, [3, 4, 0, 1]],
    ].forEach(([pos, length, result]: [number, number, number[]]) => {
      it(`"should pick [${result.join()}] from starting from ${pos} with length ${length}`, () => {
        expect(pick([0, 1, 2, 3, 4], pos, length)).toEqual(result);
      });
    });
  });

  describe('mergeReverse()', () => {
    [
      [0, [0, 1, 2], [2, 1, 0, 3, 4]],
      [1, [1, 2, 3], [0, 3, 2, 1, 4]],
      [3, [3, 4, 0, 1], [4, 3, 2, 1, 0]],
      [1, [3, 0, 1, 2, 4], [3, 4, 2, 1, 0]],
    ].forEach(([pos, picked, result]: [number, number[], number[]]) => {
      it(`"should merge [${picked.join()}] starting from ${pos} to [${result.join()}]`, () => {
        expect(mergeReverse([0, 1, 2, 3, 4], pos, picked)).toEqual(result);
      });
    });
  });

  describe('step()', () => {
    it(`"should work for example`, () => {
      const actual = [3, 4, 1, 5].reduce(step, {...INITIAL, data: [0, 1, 2, 3, 4]});
      expect(actual).toEqual({data: [3, 4, 2, 1, 0], pos: 4, skipSize: 4});
    });
  });

  describe('asciiLength()', () => {
    [
      ['1,2,3', [49, 44, 50, 44, 51, ...LENGTH_SUFFIX]],
    ].forEach(([input, result]: [string, number[]]) => {
      it(`"should emit [${result.join()}] from "${input}"`, () => {
        expect(asciiLength(input)).toEqual(result);
      });
    });
  });

  describe('knotHash()', () => {
    [
      ['', 'a2582a3a0e66e6e86e3812dcb672a272'],
      ['AoC 2017', '33efeb34ea91902bb2f59c9920caa6cd'],
      ['1,2,3', '3efbe78a8d82f29979031a4aa0b16a9d'],
      ['1,2,4', '63960835bcdc130f0b66d7ff4f6a5a8e'],
    ].forEach(([input, result]: [string, string]) => {
      it(`"should emit "${result}" from "${input}"`, () => {
        expect(knotHash(input)).toEqual(result);
      });
    });

    it(`"should emit binary hash with correct length`, () => {
      expect(knotHash('flqrgnkx-1', 2)).toHaveLength(128);
    });
    [
      '11010100',
      '01010101',
      '00001010',
      '10101101',
      '01101000',
      '11001001',
      '01000100',
      '11010110',
    ].forEach((result: string, row) => {
      it(`"should emit binary hash for example row ${row} of day 14`, () => {
        expect(knotHash(`flqrgnkx-${row}`, 2).substr(0, result.length)).toBe(result);
      });
    });

  });

  describe('xorConvert()', () => {
    [
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], '00'],
      [[65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22], '40'],
      [[
        65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22,
        65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22
      ], '4040'],
    ].forEach(([input, result]: [number[], string]) => {
      it(`"should produce hash "${result}" from [${input.join()}]`, () => {
        expect(xorConvert(input)).toEqual(result);
      });
    });
  });
});



