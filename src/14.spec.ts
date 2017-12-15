import {calculateUsed, countRegions, createDisk, Disk} from './14';

//takes 6 seconds on my machine, so putting it here for reusing the value
// (testsuite still takes 6 seconds but not twelve)
export const DISK = createDisk('flqrgnkx');

describe('day 14', function () {
  // the tests related to the changes to `knotHash` can be found in `./10.spec.ts`

  describe('calculateUsed()', function () {
    it(`should work for test case`, function () {
      expect(calculateUsed(DISK)).toBe(8108);
    });
  });
  describe('countRegions()', function () {

    ([
      [['00000','00000'], 0],
      [['11111','11111'], 1],
      [[
        '.1.11..1',
        '.1.1..11'
      ], 3],
      [[
        '.1.1.111',
        '.1.1...1',
        '.111.111'
      ], 2],
      [[
        '.1.1.1.1',
        '1.1.1.1.',
        '.1.1.1.1'
      ], 12],
    ] as [Disk, number][]).forEach(([input, result], index) => {
      it(`"should count ${result} regions for example ${index}`, function () {
        expect(countRegions(input)).toBe(result);
      });
    });

    it(`should work for test case`, function () {
      expect(countRegions(DISK)).toBe(1242);
    });
  });
});
