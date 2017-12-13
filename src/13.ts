import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {uniq} from 'lodash';

export const isScanned = (depth: number, time: number): boolean => time % (depth + depth - 2) === 0;

export const main = (input: string) => {
  return;
};

if (require.main === module) runWithStdIn(main);
