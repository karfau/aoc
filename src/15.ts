import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {padStart} from 'lodash'

export const GEN_A = 16807;
export const GEN_B = 48271;
export const DIVIDER = 2147483647;

export const generate = (start: number, factor: number): number => {
  return (start * factor) % DIVIDER;
};


export const toBinary = (num: number, length: number): string => padStart(num.toString(2), length, '0');
const MATCH_LENGTH = 16;

export const matchBinary = (a: number, b: number): boolean => {
  return toBinary(a, MATCH_LENGTH).substr(-MATCH_LENGTH) === toBinary(b, MATCH_LENGTH).substr(-MATCH_LENGTH)
};

export const countMatches = (a: number, b: number): number => {
  let result = 0, i = 0, currentA = a, currentB = b;
  while (i++ < 40000000) {
    currentA = generate(currentA, GEN_A);
    currentB = generate(currentB, GEN_B);
    if (matchBinary(currentA, currentB)) {
      result++;
    }
  }
  return result;
};

export const main = (input: string) => {
  // const numbers = lineToNumbers(splitLines(input)[0], /\s+/);
  return countMatches(722, 354);
};

if (require.main === module) runWithStdIn(main);
