import {Pair, splitLines} from './tools';
import {Direction, main, turn, walkToNextCorner} from './19';

const EXAMPLE: ReadonlyArray<string> = splitLines(`
     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
                
`);

describe('day 19', () => {
  describe('walkToNextCorner()', () => {
    [
      [[0, 5], Direction.down, [5, 5], ['A']],
      [[5, 5], Direction.right, [5, 8], ['B']],
      [[5, 8], Direction.up, [1, 8], []],
      [[3, 14], Direction.left, [3, 0], ['E','F']],
    ].forEach(([start, dir, corner, expectedLetters]: [Pair<number>, Direction, Pair<number>, string[]]) => {
      it(`should walkToNextCorner [${start.join()}] to [${corner.join()}] and collect "${expectedLetters.join('')}"`, () => {
        const letters = [];
        expect(walkToNextCorner(EXAMPLE, start, dir, letters)).toEqual(corner);
        expect(letters).toEqual(expectedLetters);
      });
    });
  });
  describe('turn()', () => {
    [
      [[0, 5], 'right', 'down'],
      [[5, 5], 'down', 'right'],
      [[5, 8], 'right', 'up'],
      [[1, 8], 'up', 'right'],
      [[1, 11], 'right', 'down'],
      [[5, 11], 'down', 'right'],
      [[5, 14], 'right', 'up'],
      [[3, 14], 'up', 'left'],
    ].forEach(([start, from, to]: [Pair<number>, keyof Direction, keyof Direction]) => {
      it(`should turn from ${from} to ${to} at [${start.join()}]`, () => {
        expect(turn(EXAMPLE, start, Direction[from])).toEqual(Direction[to]);
      });
    });
  });
  describe('main()', () => {
    it('should work for example', () => {
      expect(main(EXAMPLE.join('\n'))).toEqual(['ABCDEF', 38])
    });
  });
});
