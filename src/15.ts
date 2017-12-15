import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {uniq} from 'lodash'

export const GEN_A = 16807;
export const GEN_B = 48271;
export const DIVIDER = 2147483647;

export const generate = (start: number, factor: number): number => {
  return (start * factor) % DIVIDER;
};

export const main = (input: string) => {
  const numbers = lineToNumbers(splitLines(input)[0], /\s+/);
  return;
};

if (require.main === module) runWithStdIn(main);
