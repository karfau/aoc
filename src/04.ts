import {Pair, runWithStdIn, splitLines} from './tools';



export const isValid = (pass: string): boolean => {
  let words = pass.split(/\s+/);
  return words.find(
    word => words.filter(word_ => word_ === word).length > 1
  ) === undefined;
};

export const main = (input: string) => {
  return splitLines(input).filter(isValid).length;
};

if (require.main === module) runWithStdIn(main);
