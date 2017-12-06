import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {uniq} from 'lodash'

export function distribute(input: ReadonlyArray<number>): ReadonlyArray<number> {
  let index = input.indexOf(Math.max(...input));
  let blocks = input[index];
  const result = input.map((v, i) => i === index ? 0 : v);
  while (blocks > 0) {
    index = (index + 1) % result.length;
    result[index]++;
    blocks--;
  }
  return result;
}

export const loop = (input: ReadonlyArray<number>): number => {
  const known: string[] = [];
  let current = input;
  do {
    known.push(current.join());
    current = distribute(current);
  } while (uniq(known).length === known.length);
  return known.length - 1;
};

export const main = (input: string) => {
  const numbers = lineToNumbers(splitLines(input)[0], /\s+/);
  // console.log(numbers);
  return [loop(numbers)];
};

if (require.main === module) runWithStdIn(main);
