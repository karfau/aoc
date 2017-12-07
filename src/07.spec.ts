import {splitLines} from './tools';
import {findRoot, Sums, sums, tasks, Tower, tower} from './07';

const INPUT = `
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`;

describe('day 7', function () {
  describe('findRoot()', function () {
    it(`"should find tknk`, function () {
      expect(findRoot(splitLines(INPUT))).toEqual('tknk');
    });
  });
  describe('tree()', function () {
    it(`"should create tree for`, function () {
      expect(tower(splitLines(INPUT))).toMatchSnapshot();
    });
  });
  describe('tasks()', function () {
    it(`"should create tasks for one level`, function () {
      expect(tasks({root:{w: NaN,c:['a', 'b']}}, 'root'))
        .toEqual([['root'], ['a', 'b']]);
    });
    it(`"should create tasks for two levels`, function () {
      expect(tasks(
        {
          root:{w: NaN,c:['a1', 'b1']},
          a1:{w: NaN,c:['c2']}
        }, 'root')).toEqual([['root'], ['a1', 'b1'], ['c2']]);
    });
    it(`"should create tasks for est input`, function () {
      expect(tasks(tower(splitLines(INPUT)), 'tknk')).toMatchSnapshot();
    });
  });
  describe('sums()', function () {
    let t: Tower;
    beforeAll(() => {
      t = tower(splitLines(INPUT));
    });
    it(`"should create sum for single`, function () {
      const expected: Sums = {jptl:[61, []]};
      expect(sums(t, tasks(t, 'jptl'))).toEqual(expected);
    });
    it(`"should create sums for ugml`, function () {
      const expected: Sums = {ugml: [251,[61, 61, 61]], gyxo: [61, []], ebii:[61, []], jptl:[61, []]};
      expect(sums(t, tasks(t, 'ugml'))).toEqual(expected);
    });
    it(`"should create sums for test input`, function () {
      const expected: Sums = {ugml: [251,[61, 61, 61]], gyxo: [61, []], ebii:[61, []], jptl:[61, []]};
      expect(sums(t, tasks(t, 'tknk'))['tknk']).toEqual([778, [251, 243, 243]]);
    });
  });
});
