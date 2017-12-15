import {countMatches, GEN_A, GEN_B, generate, matchBinary} from './15';

const START_A = 65;
const START_B = 8921;
const THIRD_A = 245556042;
const THIRD_B = 1431495498;

describe('day 15', () => {
  describe('generate()', () => {
    [
      [START_A, GEN_A, 1092455],
      [1092455, GEN_A, 1181022009],
      [1181022009, GEN_A, THIRD_A],
      [THIRD_A, GEN_A, 1744312007],
      [1744312007, GEN_A, 1352636452],

      [START_B, GEN_B, 430625591],
      [430625591, GEN_B, 1233683848],
      [1233683848, GEN_B, THIRD_B],
      [THIRD_B, GEN_B, 137874439],
      [137874439, GEN_B, 285222916],
    ].forEach(([prev, factor, result]: [number, number, number]) => {
      it(`should generate ${result} from ${prev} and factor ${factor}`, () => {
        expect(generate(prev, factor)).toEqual(result);
      });
    });
  });

  describe('matchBinary()', () => {
    it('should match from example', () => {
      expect(matchBinary(THIRD_A, THIRD_B)).toBe(true)
    });
  });

  describe.skip('countMatches()', () => {
    it('should match from example', () => {
      expect(countMatches(START_A, START_B)).toBe(588)
    });
  });
});
