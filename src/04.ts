import {Pair, runWithStdIn, splitLines} from './tools';

type Check = (list: string[], word: string) => boolean;

export const occurrences: Check = (list, word) => list.filter(word_ => word_ === word).length > 1;

export const isValid = (check: Check, pass: string): boolean => {
  let words = pass.split(/\s+/);
  return words.find(word => check(words, word)) === undefined;
};

export const main = (input: string) => {
  return splitLines(input).filter(isValid.bind(null, occurrences)).length;
};

if (require.main === module) runWithStdIn(main);
