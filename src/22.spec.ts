import { splitLines} from './tools';
import {Direction, DirectionKey, parseGrid, turn} from './22';


const EXAMPLE: ReadonlyArray<string> = splitLines(`
..#
#..
...
`);

const EXAMPLE_2: ReadonlyArray<string> = splitLines(`
#...#
.....
.....
.....
#...#
`);

describe('day 22', () => {
  describe('turn()', () => {
    [
      ['left', true, 'down'],
      ['down', true, 'right'],
      ['right', true, 'up'],
      ['up', true, 'left'],

      ['left', false, 'up'],
      ['up', false, 'right'],
      ['right', false, 'down'],
      ['down', false, 'left'],
    ].forEach(([dir, left, next]: [DirectionKey, boolean, DirectionKey) => {
      it(`should turn ${left ? 'left': 'right'} from ${dir} to ${next}`, () => {
        expect(turn(Direction[dir], left)).toEqual(Direction[next]);
      });
    });
  });
/*
  describe('parse()', () => {
    [
      [[0, 5], 'right', 'down'],
      [[5, 5], 'down', 'right'],
      [[5, 8], 'right', 'up'],
      [[1, 8], 'up', 'right'],
      [[1, 11], 'right', 'down'],
      [[5, 11], 'down', 'right'],
      [[5, 14], 'right', 'up'],
      [[3, 14], 'up', 'left'],
    ].forEach(([start, from, to]: [Pair<number>, DirectionKey, DirectionKey]) => {
      it(`should turn from ${from} to ${to} at [${start.join()}]`, () => {
        expect(turn(EXAMPLE, start, Direction[from])).toEqual(Direction[to]);
      });
    });
  });
*/
  describe('parseGrid()', () => {
    it('should work for example', () => {
      expect(parseGrid(EXAMPLE)).toEqual({'-1,0': true,'1,-1': true})
    });
    it('should work for example 2', () => {
      expect(parseGrid(EXAMPLE_2)).toEqual({'-2,-2': true,'2,-2': true,'2,2': true,'-2,2': true})
    });
  });
});
