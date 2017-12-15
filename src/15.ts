import {padStart} from 'lodash'

export const GEN_A = 16807;
export const GEN_B = 48271;
export const DIVIDER = 2147483647;

export type Check = (n: number) => boolean;
export const CHECK_4: Check = n => n % 4 === 0;
export const CHECK_8: Check = n => n % 8 === 0;

export const generate = (start: number, factor: number, check?: Check): number => {
  let next = (start * factor) % DIVIDER;
  return check === undefined || check(next) ? next : generate(next, factor, check);
};

export const toBinary = (num: number, length: number): string => padStart(num.toString(2), length, '0');
const MATCH_LENGTH = 16;

export const matchBinary = (a: number, b: number): boolean => {
  return toBinary(a, MATCH_LENGTH).substr(-MATCH_LENGTH) === toBinary(b, MATCH_LENGTH).substr(-MATCH_LENGTH)
};

export const countMatches = (a: number, b: number, numChecks = 40000000, withCheck = false): number => {
  let result = 0, i = 0, currentA = a, currentB = b;
  while (i++ < numChecks) {
    currentA = generate(currentA, GEN_A, withCheck ? CHECK_4 : undefined);
    currentB = generate(currentB, GEN_B, withCheck ? CHECK_8 : undefined);
    if (matchBinary(currentA, currentB)) {
      result++;
    }
  }
  return result;
};

export const main = (start_a: number, start_b: number) => {
  return countMatches(start_a, start_b, 5 * 1000 * 1000, true);
};

if (require.main === module) console.log(main(722, 354));
