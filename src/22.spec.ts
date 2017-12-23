import { splitLines} from './tools';
import {
  burst, CLEAN, countInfectingBursts, Direction, DirectionKey, FLAGGED, INFECTED, Infection, parseGrid, turn,
  V1, WEAK
} from './22';
import {range} from 'lodash';


const EXAMPLE: ReadonlyArray<string> = splitLines(`
..#
#..
...
`);

const EXAMPLE_BIG: ReadonlyArray<string> = splitLines(`
.........
.........
.........
.....#...
...#.....
.........
.........
.........
.........
`);

const ONE: ReadonlyArray<string> = splitLines(`
.........
.........
.........
.....#...
...##....
.........
.........
.........
.........
`);

const TWO: ReadonlyArray<string> = splitLines(`
.........
.........
.........
.....#...
...=#....
.........
.........
.........
.........
`);

const EXAMPLE_2: ReadonlyArray<string> = splitLines(`
#...#
.....
.....
.....
#...#
`);

const SEVEN: ReadonlyArray<string> = splitLines(`
.........
.........
.........
..#=.#...
..###....
.........
.........
.........
.........
`);

describe('day 22', () => {
  describe('turn()', () => {
    [
      ['left', CLEAN, 'down'],
      ['down', CLEAN, 'right'],
      ['right', CLEAN, 'up'],
      ['up', CLEAN, 'left'],

      ['left', WEAK, 'left'],
      ['down', WEAK, 'down'],
      ['right', WEAK, 'right'],
      ['up', WEAK, 'up'],

      ['left', INFECTED, 'up'],
      ['up', INFECTED, 'right'],
      ['right', INFECTED, 'down'],
      ['down', INFECTED, 'left'],

      ['left', FLAGGED, 'right'],
      ['down', FLAGGED, 'up'],
      ['right', FLAGGED, 'left'],
      ['up', FLAGGED, 'down'],
    ].forEach(([dir, mode, next]: [DirectionKey, string, DirectionKey]) => {
      it(`should turn from ${dir} to ${next} for mode "${mode}"`, () => {
        expect(turn(Direction[dir], mode)).toEqual(Direction[next]);
      });
    });
  });

  describe('parseGrid()', () => {
    it('should work for example', () => {
      expect(parseGrid(EXAMPLE, V1)).toEqual({'-1,0': INFECTED,'1,-1': INFECTED})
    });
    it('should work for example 2', () => {
      expect(parseGrid(EXAMPLE_2, V1)).toEqual({'-2,-2': INFECTED,'2,-2': INFECTED,'2,2': INFECTED,'-2,2': INFECTED})
    });
    it('should work for example with false', () => {
      expect(parseGrid(TWO, V1)).toEqual({'0,0': INFECTED,'1,-1': INFECTED,'-1,0': CLEAN})
    });
    it('should work for small and big example', () => {
      expect(parseGrid(EXAMPLE, V1)).toEqual(parseGrid(EXAMPLE_BIG, V1))
    });
  });

  describe('burst()', () => {
    it('should work for example', () => {
      const initial = parseGrid(EXAMPLE, V1);
      const infection: Infection = {
        grid: initial,
        position: [0,0],
        direction: Direction.up
      };
      const steps: Infection[] = [burst(infection, V1)];
      range(1,7).forEach(i => steps.push(burst(steps[i - 1], V1)));
      const [first, second, third, fourth, fifth, sixth, seventh] = steps;
      expect(first).toEqual({grid: parseGrid(ONE, V1), position: [-1,0], direction: Direction.left});
      expect(second).toEqual({grid: parseGrid(TWO, V1), position: [-1,-1], direction: Direction.up});
      expect(seventh.grid).toEqual(parseGrid(SEVEN, V1));
    });
  });

  describe('countInfectingBursts()', () => {
    [
      [7, 5],
      [70, 41],
      // [10000, 5587],
    ].forEach(([iterations, expected]: [number, number]) => {
      it(`${iterations} iterations should cause ${expected} infections`, () => {
        expect(countInfectingBursts(parseGrid(EXAMPLE, V1), V1, iterations)).toBe(expected)
      });
    });
  });
});
