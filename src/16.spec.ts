import {dance, exchange, spin, swap} from './16';

describe('day 16', () => {
  describe('spin()', () => {
    [
      ['abcde', 1, 'eabcd'],
      ['abcde', 3, 'cdeab'],
    ].forEach(([input, amount, result]: [string, number, string]) => {
      it(`should spin ${amount} chars in ${input} to "${result}"`, () => {
        expect(spin(input, amount)).toBe(result);
      });
    });
  });

  describe('exchange()', () => {
    [
      ['abcde', 1, 3, 'adcbe'],
      ['abcde', 3, 2, 'abdce'],
    ].forEach(([input, posa, posb, result]: [string, number, number, string]) => {
      it(`should flip ${posa} and ${posb} chars in ${input} to "${result}"`, () => {
        expect(exchange(input, posa, posb)).toBe(result);
      });
    });
  });

  describe('swap()', () => {
    [
      ['abcde', 'b', 'e', 'aecdb'],
      ['abcde', 'a', 'd', 'dbcae'],
    ].forEach(([input, posa, posb, result]: [string, string, string, string]) => {
      it(`should flip ${posa} and ${posb} chars in ${input} to "${result}"`, () => {
        expect(swap(input, posa, posb)).toBe(result);
      });
    });
  });

  describe('dance()', () => {
    [
      ['abcde', 's1', 'eabcd'],
      ['eabcd', 'x3/4', 'eabdc'],
      ['eabdc', 'pe/b', 'baedc'],
    ].forEach(([input, step, result]: [string, string, string]) => {
      it(`should dance from ${input} to ${result} using ${step}`, () => {
        expect(dance(input, step)).toBe(result);
      });
    });
  });
});
