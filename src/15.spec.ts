import {GEN_A, GEN_B, generate} from './15';

describe('day 15', () => {
  describe('generate()', () => {
    [
      [65, GEN_A, 1092455],
      [1092455, GEN_A, 1181022009],
      [1181022009, GEN_A, 245556042],
      [245556042, GEN_A, 1744312007],
      [1744312007, GEN_A, 1352636452],

      [8921, GEN_B, 430625591],
      [430625591, GEN_B, 1233683848],
      [1233683848, GEN_B, 1431495498],
      [1431495498, GEN_B, 137874439],
      [137874439, GEN_B, 285222916],
    ].forEach(([prev, factor, result]: [number, number, number]) => {
      it(`should generate ${result} from ${prev} and factor ${factor}`, () => {
        expect(generate(prev, factor)).toEqual(result);
      });
    });
  });
});
