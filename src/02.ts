import {flow} from 'lodash';
import {lineToNumbers, runWithStdIn, splitLines} from './tools';

export const difference = (numbers: number[]): number => Math.max(...numbers) - Math.min(...numbers);


export const main = (input: string) => {
  return [
    flow(
      splitLines,
      lines => lines
        .map(line => lineToNumbers(line, /\s+/))
        .reduce(
          (sum, numbers) => sum + difference(numbers),
          0
        )
    )(input)
  ]

};
if (require.main === module) runWithStdIn(main);