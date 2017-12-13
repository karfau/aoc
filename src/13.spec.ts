import {isScanned, Scanners, severity} from './13';

const TEST_INPUT: Scanners = {
  0: 3,
  1: 2,
  4: 4,
  6: 4
};

describe('day 13', function () {
  describe('isScanned()', function () {
    [
      [2, 0, true],
      [2, 1, false],
      [2, 2, true],
      [2, 3, false],
      [2, 4, true],
      [3, 0, true],
      [3, 1, false],
      [3, 2, false],
      [3, 3, false],
      [3, 4, true],
      [3, 5, false],
      [3, 7, false],
      [3, 8, true],
      [4, 0, true],
      [4, 1, false],
      [4, 5, false],
      [4, 6, true],
      [4, 7, false],
      [4, 11, false],
      [4, 12, true],
    ].forEach(([depth, time, result]: [number, number, boolean]) => {
      it(`should ${result ? '' : 'not '} be scanned with depth ${depth} at time ${time}`, function () {
        expect(isScanned(depth, time)).toEqual(result);
      });
    });
  });

  describe('severity()', () => {
    it('should gather 24 severity for the TEST_INPUT', () => {
      expect(severity(TEST_INPUT, 0)).toBe(24);
    });
  });
});
