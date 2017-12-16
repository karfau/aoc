import {runWithStdIn, splitLines} from './tools';

export const spin = (input: string, amount: number): string =>
  input.substr(-amount) + input.substr(0, input.length - amount);

export const exchange = (input: string, posa: number, posb: number): string => {
  const pos1 = Math.min(posa, posb), pos2 = Math.max(posa, posb);
  const first = input[pos1], second = input[pos2];
  return `${input.substring(0, pos1)}${second}${input.substring(pos1+1, pos2)}${first}${input.substring(pos2+1)}`;
};

export const swap = (input: string, a: string, b: string): string => {
  return exchange(input, input.indexOf(a), input.indexOf(b));
};

export const dance = (input: string, step: string): string => {

  switch (step[0]) {
    case 's':
      const amount = step.match(/s(\d+)/);
      return amount == null ? input : spin(input, parseInt(amount[1], 10));
    case 'x':
      const matchx = step.match(/x(\d+)\/(\d+)/);
      return matchx == null ? input : exchange(input, parseInt(matchx[1], 10), parseInt(matchx[2], 10));
    case 'p':
      const matchp = step.match(/p(\w+)\/(\w+)/);
      return matchp == null ? input : swap(input, matchp[1], matchp[2]);
    default:
      return input;
  }
};

export const main = (input: string) => {
  const start = 'abcdefghijklmnop';
  const steps = splitLines(input)[0].split(',');

  return steps.reduce(dance, start);
};

if (require.main === module) runWithStdIn(main);
