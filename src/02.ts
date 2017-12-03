import {flow} from 'lodash';
import {lineToNumbers, runWithStdIn, splitLines} from './tools';

export const difference = (numbers: number[]): number => Math.max(...numbers) - Math.min(...numbers);

export const divided = (numbers: number[]): number => {
  const maxToMin = [...numbers].sort();
  for (let high = maxToMin.length; high >= 0; high--) {
    for (let low = 0; low < maxToMin.length; low++) {
      if (high != low && maxToMin[high] % maxToMin[low] === 0) {
        return maxToMin[high] / maxToMin[low];
      }
    }
  }
  return 0;
};

const checksum = (calculator: (numbers: number[]) => number, lines: string[]) =>
  lines.map(line => lineToNumbers(line, /\s+/))
       .reduce(
         (sum, numbers) => sum + calculator(numbers),
         0
       );

export const main = (input: string) => {
  return [
    flow(
      splitLines,
      checksum.bind(null, difference)
    )(input),
    flow(
      splitLines,
      checksum.bind(null, divided)
    )(input)
  ];

};

if (require.main === module) runWithStdIn(main);
