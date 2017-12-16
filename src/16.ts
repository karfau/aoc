import {runWithStdIn, splitLines} from './tools';
import * as prettyMS from 'pretty-ms';

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
      if (amount) return spin(input, parseInt(amount[1], 10));
      break;
    case 'x':
      const matchx = step.match(/x(\d+)\/(\d+)/);
      if (matchx) return exchange(input, parseInt(matchx[1], 10), parseInt(matchx[2], 10));
      break;
    case 'p':
      const matchp = step.match(/p(\w+)\/(\w+)/);
      if (matchp) return swap(input, matchp[1], matchp[2]);
      break;
    default:
  }
  return input;
};

const NS_PER_SEC = 1e9; // from https://nodejs.org/api/process.html#process_process_hrtime_time

export const doDance = (input: string, steps: string[], rounds: number): string => {
  const results = [input];
  let current = input;
  const start = process.hrtime();
  for (let i = 0; i < rounds; i++) {
    current = steps.reduce(dance, current);
    if (i > 0 && current === input) {
      break;
    }
    results.push(current);
  }
  if (rounds > results.length) {
    const [sec, nano] = process.hrtime(start);
    const duration = (sec * NS_PER_SEC + nano) / 1000000;
    const perIter = duration / results.length;
    const ms = rounds * perIter;
    console.log(`doDance("${input}", ${steps.length} steps, ${rounds} times)
collected ${results.length} different results in ${duration} ms,
finding the result using just iteration would have taken around ${prettyMS(ms)}.`
    );
  }
  return results[rounds % results.length];
};

export const main = (input: string) => {
  const start = 'abcdefghijklmnop';
  const steps = splitLines(input)[0].split(',');

  return [
    steps.reduce(dance, start),
    doDance(start, steps, 1000000000)
  ];
};

if (require.main === module) runWithStdIn(main);
