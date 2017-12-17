import {padStart} from 'lodash';

export const GEN_A = 16807;
export const GEN_B = 48271;
export const DIVIDER = 2147483647;

export type Check = (n: number) => boolean;
export const CHECK_4: Check = n => n % 4 === 0;
export const CHECK_8: Check = n => n % 8 === 0;

export class Generator implements Iterator<number> {
  constructor (
    private prev: number,
    protected readonly factor: number,
    private readonly check?: Check
  ) {}

  protected doGenerate(): number{
    let next = this.prev;
    do {
      next = (next * this.factor) % DIVIDER;
    } while (this.check && !this.check(next));
    return next;
  }

  next(): IteratorResult<number> {
    this.prev = this.doGenerate();
    return {value: this.prev, done: false};
  }
}

export const A = (start: number, check?: Check) => new Generator(start, GEN_A, check);
export const B = (start: number, check?: Check) => new Generator(start, GEN_B, check);

export const toBinary = (num: number, length: number): string =>
  padStart(num.toString(2), length, '0');

const MATCH_LENGTH = 16;
export const matchBinary = (a: number, b: number): boolean =>
  toBinary(a, MATCH_LENGTH).substr(-MATCH_LENGTH)
  ===
  toBinary(b, MATCH_LENGTH).substr(-MATCH_LENGTH);

export const countMatches = (a: Generator, b: Generator, numChecks = 40000000): number => {
  let result = 0, i = 0;
  while (i++ < numChecks) {
    if (matchBinary(a.next().value, b.next().value)) {
      result++;
    }
  }
  return result;
};

export const main = (start_a: number, start_b: number) => {
  return [
    countMatches(A(start_a), B(start_b)),
    countMatches(A(start_a, CHECK_4), B(start_b, CHECK_8), 5 * 1000 * 1000)
  ];
};

if (require.main === module) console.log(main(722, 354));
