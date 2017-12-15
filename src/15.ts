import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {uniq} from 'lodash'

export const generate = (start: number, factor: number): number => {
  return start;
};

export const main = (input: string) => {
  const numbers = lineToNumbers(splitLines(input)[0], /\s+/);
  return;
};

if (require.main === module) runWithStdIn(main);
