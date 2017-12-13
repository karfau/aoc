import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {uniq} from 'lodash';

export const isScanned = (depth: number, time: number): boolean => time % (depth + depth - 2) === 0;

export type Scanners = {readonly [key: number]: number};

export const severity = (scanners: Scanners, time: number) => {
  return Object.keys(scanners)
        .map(skey => parseInt(skey, 10))
        .filter(level => isScanned(scanners[level], time + level))
        .reduce((sum, level) => sum + level * scanners[level], 0)
};

export const main = (input: string) => {
  return;
};

if (require.main === module) runWithStdIn(main);
