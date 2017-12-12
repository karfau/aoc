import {collect} from './12';

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
      expect(collect(TEST_INPUT).size).toEqual(6);
    });
  });
});
