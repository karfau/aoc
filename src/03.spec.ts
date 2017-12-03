import {Pair} from 'src/tools';
import {dimension, position} from './03';

describe.only('day 3', function () {
  describe('dimension()', function () {
    [
      [1, 1],
      [2, 3],
      [9, 3],
      [10, 5],
      [25, 5],
      [26, 7],
      [49, 7],
      [81, 9],
      [1024, 33]

    ].forEach(([num, dim]) => {
    it(`should return dimension ${dim} for number ${num}`, function () {
      expect(dimension(num)).toBe(dim);
    });
    });
  });

  describe('position()', function () {
    [
      [1, [0, 0]],
      [9, [1, 1]],
      [8, [0, 1]],
      [25, [2, 2]],
      [21, [-2, 2]],
      [20, [-2, 1]],
      [17, [-2, -2]],
      [16, [-1, -2]],
      [13, [2, -2]],
      [10, [2, 1]],
      [1024, [-15, -16]],
    ].forEach(([num, pos]: [number, Pair<number>]) => {
      it(`should return ${pos} for number ${num}`, function () {
        expect(position(num)).toEqual(pos);
      });
    });
  });
});
