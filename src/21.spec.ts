import {splitLines} from './tools';
import {countOn, enhance, expandRule, readRules, splitBlocks, START} from './21';

describe('day 21', () => {
  describe('expandRule()', () => {
    [
      ['../..', ['....']],
      ['#./..', ['#...','.#..','..#.','...#']],
      ['.#/..', ['#...','.#..','..#.','...#']],
      ['##/..', ['##..','.#.#','#.#.','..##']],
      ['.#/#.', ['.##.', '#..#']],
      ['##/#.', ['.###','#.##','##.#','###.']],
      ['##/##', ['####']],
      ['###/###/###', ['#########']],
      ['.../.#./...', ['....#....']],
      ['#.#/.#./#.#', ['#.#.#.#.#']],
      ['###/#.#/###', ['####.####']],
      ['#../.../...', ['#........', '..#......', '......#..', '........#']],
      ['.#./.../...', ['.#.......', '...#.....', '.....#...', '.......#.']],
    ].forEach(([input, result]: [string, string[]]) => {
      it(`"${input}" should find the matching rules ${JSON.stringify(result)}`, () => {
        expect(Object.keys(expandRule(input, '')).sort()).toEqual(result.sort());
      });
    });
  });

  describe('splitBlocks()', () => {
    [
      [['...', '...', '...'], ['.........']],
      [['###', '...', '###'], ['###...###']],
      [[
        '###...###',
        '...###...',
        '#.#.#.#.#',
        '###...###',
        '...###...',
        '#.#.#.#.#',
        '###...###',
        '...###...',
        '#.#.#.#.#'
      ], [
        '###...#.#', '...###.#.', '###...#.#',
        '###...#.#', '...###.#.', '###...#.#',
        '###...#.#', '...###.#.', '###...#.#',
      ]],
      [['#.', '#.'], ['#.#.']],
      [['#..#', '#.#.', '#..#', '#.#.'], ['#.#.', '.##.', '#.#.', '.##.']],
    ].forEach(([input, result]: [string[], string[]]) => {
      it(`${JSON.stringify(input)} should be converted to ${JSON.stringify(result)}`, () => {
        expect(splitBlocks(input)).toEqual(result);
      });
    });
  });

  describe('enhance', () => {
    const rules = readRules(['../.# => ##./#../...', '.#./..#/### => #..#/..../..../#..#']);
    const FIRST = splitLines(`
#..#
....
....
#..#
`);
    const SECOND = splitLines(`
##.##.
#..#..
......
##.##.
#..#..
......
`);

    it('should work for example', () => {
      const first = enhance(START, rules);
      expect(first).toEqual(FIRST);
      const second = enhance(first, rules);
      expect(second).toEqual(SECOND);
      expect(countOn(second)).toBe(12);
    });
  });

});
