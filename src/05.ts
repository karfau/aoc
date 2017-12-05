import {runWithStdIn, splitLines} from './tools';

export const jump = (instructions: number[], position: number): number => {
  return position + instructions[position]++
};

export const jump3 = (instructions: number[], position: number): number => {
  return instructions[position] >= 3 ? position + instructions[position]-- : position + instructions[position]++
};

export const findExit = (instructions: number[], doStep: typeof jump = jump): number => {
  let steps = 0, pos = 0;
  while (pos < instructions.length) {
    pos = doStep(instructions, pos);
    steps++;
  }
  return steps;
};

export const main = (input: string) => {
  return [
    findExit(splitLines(input).map(l => parseInt(l, 10))),
    findExit(splitLines(input).map(l => parseInt(l, 10)), jump3)
  ];
};

if (require.main === module) runWithStdIn(main);
