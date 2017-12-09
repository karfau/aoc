import {measureGarbage, countChar, removeGarbage, scoreGroups} from './09';

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

  describe('countGarbage()', function () {
    [
      ['<>', 0],
      ['<random characters>', 17],
      ['<<<<>', 3],
      ['<{!>}>', 2],
      ['<!!>', 0],
      ['<!!!>>', 0],
      ['<{o"i!a,<{i<a>', 10],
      ['<{o"i!a,<{i<a><{o"i!a,<{i<a>', 20],
    ].forEach(([garbage, amount]: [string, number]) => {
      it(`"should return ${amount} for "${garbage}"`, function () {
        expect(measureGarbage(garbage)).toEqual(amount);
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
        expect(countChar(input)).toEqual(groups);
      });
    });

    [
      ['{<{},{},{{}}>}', 1],
      ['{<a>,<a>,<a>,<a>}', 1],
      ['{{<a>},{<a>},{<a>},{<a>}}', 5],
      ['{{<!>},{<!>},{<!>},{<a>}}', 2],
    ].forEach(([input, groups]: [string, number]) => {
      it(`"should find ${groups} using removeGarbage for "${input}"`, function () {
        expect(countChar(removeGarbage(input))).toEqual(groups);
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
