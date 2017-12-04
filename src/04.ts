import {uniq} from 'lodash';
import {runWithStdIn, splitLines} from './tools';

type Check = (list: string[]) => boolean;

const sortStr = (s:string): string => s.split('').sort().join('');
export const occurrences: Check = (list) => list.length === uniq(list).length;
export const hasAnagrams: Check = (list) => occurrences(list.map(w => sortStr(w)));

export const isValid = (check: Check, pass: string): boolean => {
  return check(pass.split(/\s+/));
};

export const main = (input: string) => {
  return [
    splitLines(input).filter(isValid.bind(null, occurrences)).length,
    splitLines(input).filter(isValid.bind(null, hasAnagrams)).length
  ];
};

if (require.main === module) runWithStdIn(main);
