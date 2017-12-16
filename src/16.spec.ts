import {dance, doDance, exchange, spin, swap} from './16';

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

  describe('doDance()', () => {
    [
      ['abcde', [], 0, 'abcde'],
      ['abcde', ['s1','x3/4','pe/b'], 1, 'baedc'],
      ['abcde', ['s1','x3/4','pe/b'], 2, 'ceadb'],
      ['abcde', ['s1','x3/4','pe/b'], 3, 'ecbda'],
      ['abcde', ['s1','x3/4','pe/b'], 4, 'abcde'], // reached initial state
      ['abcde', ['s1','x3/4','pe/b'], 5, 'baedc'],
      // only doing iterations until repetition found, otherwise tests would run for over an hour
      ['abcde', ['s1','x3/4','pe/b'], 1000000000, 'abcde'],
      ['abcde',
        ['s1','x3/4', 's2','x2/4','pa/b', 's3','x2/4','pe/c', 's2','x3/1','pa/c', 's3','x2/4','pc/d'],
        100000000, 'abcde'
      ],
    ].forEach(([input, steps, rounds, result]: [string, string[], number, string]) => {
      it(`should dance from ${input} to ${result} using [${steps.join(',')}] ${rounds} times`, () => {
        expect(doDance(input, steps, rounds)).toBe(result);
      });
    });
  });
});
