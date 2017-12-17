import {A, B, CHECK_4, CHECK_8, countMatches, matchBinary} from './15';

const START_A = 65;
const START_B = 8921;
const THIRD_A = 245556042;
const THIRD_B = 1431495498;

describe('day 15', () => {
  describe('generate()', () => {
    [
      [START_A, 1092455],
      [1092455, 1181022009],
      [1181022009, THIRD_A],
      [THIRD_A, 1744312007],
      [1744312007, 1352636452],
    ].forEach(([prev, result]: [number, number]) => {
      it(`A should generate ${result} from ${prev}`, () => {
        expect(A(prev).next().value).toEqual(result);
      });
    });

    [
      [START_B, 430625591],
      [430625591, 1233683848],
      [1233683848, THIRD_B],
      [THIRD_B, 137874439],
      [137874439, 285222916],
    ].forEach(([prev, result]: [number, number]) => {
      it(`B should generate ${result} from ${prev}`, () => {
        expect(B(prev).next().value).toEqual(result);
      });
    });

    [
      [START_A, 1352636452],
      [1352636452, 1992081072],
      [1992081072, 530830436],
      [530830436, 1980017072],
      [1980017072, 740335192],
    ].forEach(([prev, result]: [number, number]) => {
      it(`A should generate ${result} from ${prev} with predicate`, () => {
        expect(A(prev, CHECK_4).next().value).toEqual(result);
      });
    });
    [
      [START_B, 1233683848],
      [1233683848, 862516352],
      [862516352, 1159784568],
      [1159784568, 1616057672],
      [1616057672, 412269392],
    ].forEach(([prev, result]: [number, number]) => {
      it(`B should generate ${result} from ${prev} with predicate`, () => {
        expect(B(prev, CHECK_8).next().value).toEqual(result);
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
      expect(countMatches(A(START_A), B(START_B))).toBe(588)
    });
    it('should match from example with predicate', () => {
      expect(countMatches(A(START_A, CHECK_4), B(START_B, CHECK_8), 5000000)).toBe(309)
    });
  });
});
