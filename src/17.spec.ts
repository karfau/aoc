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
        expect(spin({list: input}, 3).list).toEqual(result);
      });
    });
  });

  describe('spin() optimized', () => {
    //   [[0, 5, 7, 2], [0, 9, 5, 7, 2]],
    it(`should spin optimized using 3 steps with needle 7`, () => {
      const steps = 3;
      const one = spin({list: [0], needle: 7}, steps);
      expect(one).toEqual({list: [0, 1], needle: 7});
      const two = spin(one, steps);
      expect(two.list).toEqual([0, 2, 1]);
      const three = spin(two, steps);
      expect(three.list).toEqual([0, 2, 3, 1]);
      const four = spin(three, steps);
      expect(four.list).toEqual([0, 2, 4, 3, 1]);
      const five = spin(four, steps);
      expect(five.list).toEqual([0, 5, 2, 4, 3, 1]);
      const six = spin(five, steps);
      expect(six).toEqual({list: [0, 5, 2, 4, 3, 6, 1], needle: 7});
      const seven = spin(six, steps);
      expect(seven).toEqual({list: [0, 5, 7, 2], needle: 7, last: 7, lastPos: 2});
      const eight = spin(seven, steps);
      expect(eight).toEqual({list: [0, 5, 7, 2], needle: 7, last: 8, lastPos: 6});
      const nine = spin(eight, steps);
      expect(nine).toEqual({list: [0, 9, 5, 7, 2], needle: 7, last: 9, lastPos: 1});
    });
  });

  describe('digitAfter()', () => {
    it('should work for example', () => {
      expect(digitAfter(2017, 3, 2017)).toBe(638);
    });
  });
});
