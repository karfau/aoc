import {minimalSteps} from './11';

describe('day 11', function () {

  describe('minimalSteps()', function () {
    [
      ['ne,ne,ne', 3],
      ['ne,ne,sw,sw', 0],
      ['ne,ne,s,s', 2],
      ['se,sw,se,sw,sw', 3],
    ].forEach(([input, result]: [string, number]) => {
    it(`should need ${result} steps for input "${input}"`, function () {
      expect(minimalSteps(input)).toBe(result)
    });
    });
  });
});
