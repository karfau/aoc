import {flow} from 'lodash';
import {lines, numbers, run} from './tools';

export const sameOrZero = (first: number, second: number) => first === second ? first : 0;

type Pair<T> = [T, T]
export const collectPairs = <T>(list: T[], step = 1): Pair<T>[] =>
  list.map((v, i): Pair<T> => [v, list[(i+step) % list.length]]);

export const main = (input: string) => {
  const line = lines(input)[0];
  return [
    flow(
      numbers,
      collectPairs,
      (pairs: Pair<number>[]) => pairs.reduce((sum, [first, second]) => sum + sameOrZero(first, second), 0)
    )(line),
    flow(
      numbers,
      (nums) => collectPairs(nums, nums.length / 2),
      (pairs: Pair<number>[]) => pairs.reduce((sum, [first, second]) => sum + sameOrZero(first, second), 0)
    )(line)
  ];
};
if (require.main === module) run(main);