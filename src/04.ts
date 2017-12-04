import {Pair, runWithStdIn, splitLines} from './tools';

type Check = (list: string[], word: string) => boolean;

export const occurrences: Check = (list, word) => list.filter(word_ => word_ === word).length > 1;
export const hasAnagrams: Check = (list, word) => list.filter(
  word_ => word_.split('').sort().join('') === word.split('').sort().join('')
).length > 1;

export const isValid = (check: Check, pass: string): boolean => {
  let words = pass.split(/\s+/);
  return words.find(word => check(words, word)) === undefined;
};

export const main = (input: string) => {
  return [
    splitLines(input).filter(isValid.bind(null, occurrences)).length,
    splitLines(input).filter(isValid.bind(null, hasAnagrams)).length
  ];
};

if (require.main === module) runWithStdIn(main);
