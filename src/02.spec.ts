import {difference} from './02';

describe('day 2', function () {
  describe('difference()', function () {
    it('should return 0 for same numbers', function () {
      expect(difference([3, 3, 3, 3])).toBe(0);
    });
    it('should return 1 for one close number', function () {
      expect(difference([3, 4])).toBe(1);
      expect(difference([3, 2])).toBe(1);
    });
    it('should return fulfill description', function () {
      expect(difference([5, 1, 9, 5])).toBe(8);
      expect(difference([7, 5, 3])).toBe(4);
      expect(difference([2, 4, 6, 8])).toBe(6);
    });
  });
});
