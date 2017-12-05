import {findExit, jump, jump3} from './05';

describe('day 5', function () {
  describe('jump()', function () {
    it(`"should only increase for 0`, function () {
      const position = 0;
      const instructions = [0];
      expect(jump(instructions, position)).toBe(0);
      expect(instructions).toEqual([1]);
    });
    it(`"should increase and jump for 1`, function () {
      const position = 0;
      const instructions = [1];
      expect(jump(instructions, position)).toBe(1);
      expect(instructions).toEqual([2]);
    });
  });

  describe('findExit()', function () {
    [
      [[1], 1],
      [[0], 2],
      [[0, 3,  0,  1,-3], 5],
    ].forEach(([input, steps]: [number[], number]) => {
      it(`"should need ${steps} steps for [${input.join()}]`, function () {
        expect(findExit(input)).toBe(steps);
      });
    });
    it(`"should need 10 steps for star 2`, function () {
      expect(findExit([0, 3,  0,  1,-3], jump3)).toBe(10);
    });
  });
});
