import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {uniq} from 'lodash';

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

export const loop = (input: ReadonlyArray<number>): [number, number] => {
  const known: string[] = [input.join()];
  let current = input;
  do {
    current = distribute(current);
    known.push(current.join());
  } while (uniq(known).length === known.length);
  return [known.length - 1, known.reverse().lastIndexOf(known[0])];
};

export const main = (input: string) => {
  const numbers = lineToNumbers(splitLines(input)[0], /\s+/);
  return loop(numbers);
};

if (require.main === module) runWithStdIn(main);
