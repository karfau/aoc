import {uniq} from 'lodash';
import {runWithStdIn, splitLines} from './tools';

export const jump = (instructions: number[], position: number): number => {
  return position + instructions[position]++
};

export const findExit = (instructions: number[]): number => {
  let steps = 0, pos = 0;
  // const step = jump.bind(null, instructions);
  while (pos < instructions.length) {
    pos = jump(instructions, pos);
    steps++;
  }
  return steps;
};

export const main = (input: string) => {

  return findExit(splitLines(input).map(l => parseInt(l, 10)));
};

if (require.main === module) runWithStdIn(main);
