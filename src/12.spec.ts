import {countGroups, getGroup, pipes} from './12';

const TEST_INPUT = `
0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5
`;

describe('day 12', function () {
  describe('collect()', function () {
    it(`"should work for TEST_INPUT`, function () {
      expect(getGroup(pipes(TEST_INPUT), [0]).size).toEqual(6);
    });
  });
  describe('countGroups()', function () {
    it(`"should work for TEST_INPUT`, function () {
      expect(countGroups(pipes(TEST_INPUT))).toEqual(2);
    });
  });
});
