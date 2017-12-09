import {condition, Data, findMax, instruction, iteration} from './08';

describe('day 8', function () {
  describe('instruction()', function () {
    [
      [{}, ['x', 'inc', 1], {x:1}],
      [{}, ['x', 'dec', 1], {x:-1}],
      [{x: 5}, ['x', 'inc', 2], {x:7}],
    ].forEach((
      [input, [reg, dir, val], result]: [any, [string, 'inc' | 'dec', number], any]
    ) => {
      it(`"should ${dir} ${reg} by ${val} to ${result}`, function () {
        expect(instruction(input, reg, dir, val)).toEqual(result);
      });
    });
  });
  describe('condition()', function () {
    [
      [{x:1}, 'x == 1', true],
      [{}, 'x == 0', true]
    ].forEach((
      [input, cond, result]: [any, string, boolean]
    ) => {
      it(`"${cond}" should be ${result} for ${JSON.stringify(input)}`, function () {
        expect(condition(input, cond)).toEqual(result);
      });
    });
  });
  describe('iteration()', function () {
    it(`should work as expected`, function () {
      let data: Data = {};
      [
        'b inc 5 if a > 1',
        'a inc 1 if b < 5',
        'c dec -10 if a >= 1',
        'c inc -20 if c == 10'
      ].forEach((line) => {
        data = iteration(data, line);
      });
      expect(data).toEqual({a: 1, c: -10});
      expect(findMax(0, data)).toBe(1);
    });
  });
});
