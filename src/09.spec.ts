import {countGroups, removeGarbage, scoreGroups} from './09';

describe('day 9', function () {
  describe('removeGarbage()', function () {
    [
      '<>',
      '<random characters>',
      '<<<<>',
      '<{!>}>',
      '<!!!>>',
      '<{o"i!a,<{i<a>',
      '<{o"i!a,<{i<a><{o"i!a,<{i<a>',
    ].forEach((garbage) => {
      it(`"should return empty string for "${garbage}"`, function () {
        expect(removeGarbage(garbage)).toEqual('');
      });
    });
  });

  describe('countGroups()', function () {
    [
      ['<>', 0],
      ['{}', 1],
      ['{{{}}}', 3],
      ['{{},{}}', 3],
      ['{{{},{},{{}}}}', 6],
    ].forEach(([input, groups]: [string, number]) => {
      it(`"should find ${groups} for "${input}"`, function () {
        expect(countGroups(input)).toEqual(groups);
      });
    });

    [
      ['{<{},{},{{}}>}', 1],
      ['{<a>,<a>,<a>,<a>}', 1],
      ['{{<a>},{<a>},{<a>},{<a>}}', 5],
      ['{{<!>},{<!>},{<!>},{<a>}}', 2],
    ].forEach(([input, groups]: [string, number]) => {
      it(`"should find ${groups} using removeGarbage for "${input}"`, function () {
        expect(countGroups(removeGarbage(input))).toEqual(groups);
      });
    });
  });

  describe('scoreGroups()', function () {
    [
      ['{}', 1],
      ['{{{}}}', 6],
      ['{{},{}}', 5],
      ['{{{},{},{{}}}}', 16],
    ].forEach(([input, score]: [string, number]) => {
      it(`"should score ${score} for "${input}"`, function () {
        expect(scoreGroups(input)).toEqual(score);
      });
    });

    [
      ['{<a>,<a>,<a>,<a>}', 1],
      ['{{<ab>},{<ab>},{<ab>},{<ab>}}', 9],
      ['{{<!!>},{<!!>},{<!!>},{<!!>}}', 9],
      ['{{<a!>},{<a!>},{<a!>},{<ab>}}', 3],
    ].forEach(([input, groups]: [string, number]) => {
      it(`"should find ${groups} using removeGarbage for "${input}"`, function () {
        expect(scoreGroups(removeGarbage(input))).toEqual(groups);
      });
    });
  });
});
