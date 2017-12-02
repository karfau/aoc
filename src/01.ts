import {flow} from 'lodash';
import {lines, numbers, run} from './tools';

export const sameOrZero = (first: number, second: number) => first === second ? first : 0;

type Pair<T> = [T, T]
export const collectPairs = <T>(list: T[]): Pair<T>[] => list.map((v, i): Pair<T> => [v, list[(i+1) % list.length]]);

export const main = (input: string) => {
  return flow(
    numbers,
    collectPairs,
    (pairs: Pair<number>[]) => pairs.reduce((sum, [first, second]) => sum + sameOrZero(first, second), 0)
  )(lines(input)[0]);
};
if (require.main === module) run(main);