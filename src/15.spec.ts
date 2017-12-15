import {generate} from './15';

describe('day 15', () => {
  describe('generate()', () => {
    [
      [0, 0, 0],
    ].forEach(([prev, factor, result]: [number, number, number]) => {
      it(`should generate ${result} from ${prev} and factor ${factor}`, () => {
        expect(generate(prev, factor)).toEqual(result);
      });
    });
  });
});
