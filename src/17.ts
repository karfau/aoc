import {runWithStdIn} from './tools';
import {range} from 'lodash';

export function spin(input: ReadonlyArray<number>, steps: number): ReadonlyArray<number> {
  const last = Math.max(...input);
  let index = input.indexOf(last);
  let nextPos = ((index + steps) % input.length) + 1;
  return [
    ...input.slice(0,nextPos),
    last + 1,
    ...(nextPos === input.length ? [] : input.slice(nextPos))
  ];
}

export const digitAfter = (steps: number) : number => {
  const complete = range(0,2017).reduce(last => spin(last, steps), [0]);
  return complete[complete.indexOf(2017) + 1];
};

export const main = () => {
  return digitAfter(345);
};

if (require.main === module) runWithStdIn(main);
