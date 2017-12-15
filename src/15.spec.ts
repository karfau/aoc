import {CHECK_4, CHECK_8, countMatches, GEN_A, GEN_B, generate, matchBinary} from './15';

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

    [
      [START_A, GEN_A, 1352636452],
      [1352636452, GEN_A, 1992081072],
      [1992081072, GEN_A, 530830436],
      [530830436, GEN_A, 1980017072],
      [1980017072, GEN_A, 740335192],

      [START_B, GEN_B, 1233683848],
      [1233683848, GEN_B, 862516352],
      [862516352, GEN_B, 1159784568],
      [1159784568, GEN_B, 1616057672],
      [1616057672, GEN_B, 412269392],
    ].forEach(([prev, factor, result]: [number, number, number]) => {
      it(`should generate ${result} from ${prev} and factor ${factor} with predicate`, () => {
        expect(generate(prev, factor, factor === GEN_A ? CHECK_4 : CHECK_8)).toEqual(result);
      });
    });
  });

  describe('matchBinary()', () => {
    it('should match from example', () => {
      expect(matchBinary(THIRD_A, THIRD_B)).toBe(true)
    });
  });

  describe('countMatches()', () => {
    it('should match from example', () => {
      expect(countMatches(START_A, START_B)).toBe(588)
    });
    it('should match from example with predicate', () => {
      expect(countMatches(START_A, START_B, 5000000, true)).toBe(309)
    });
  });
});
