import {flow} from 'lodash';
import {lineToNumbers, Pair, runWithStdIn, splitLines} from './tools';

export const sameOrZero = (first: number, second: number) => first === second ? first : 0;

export const collectPairs = <T>(list: T[], step = 1): Pair<T>[] =>
  list.map((v, i): Pair<T> => [v, list[(i+step) % list.length]]);

export const main = (input: string) => {
  const line = splitLines(input)[0];
  return [
    flow(
      lineToNumbers,
      collectPairs,
      (pairs: Pair<number>[]) => pairs.reduce((sum, [first, second]) => sum + sameOrZero(first, second), 0)
    )(line),
    flow(
      lineToNumbers,
      (nums) => collectPairs(nums, nums.length / 2),
      (pairs: Pair<number>[]) => pairs.reduce((sum, [first, second]) => sum + sameOrZero(first, second), 0)
    )(line)
  ];
};
if (require.main === module) runWithStdIn(main);