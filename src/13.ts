import {range} from 'lodash';
import {lineToNumbers, runWithStdIn, splitLines} from './tools';

export const isScanned = (depth: number, time: number): boolean => time % (depth + depth - 2) === 0;

export type Scanners = {readonly [key: number]: number};

export const catchingScanners = (scanners: Scanners, time: number): ReadonlyArray<number> =>
  Object.keys(scanners).map(skey => parseInt(skey, 10))
        .filter(level => isScanned(scanners[level], time + level));

export const severity = (scanners: Scanners, time: number): number =>
  catchingScanners(scanners, time).reduce((sum, level) => sum + level * scanners[level], 0);

export const findPassDelay = (scanners: Scanners, start = 0): number => {
  let time = start;
  while (catchingScanners(scanners, time).length !== 0) {
    time++;
  }
  return time;
};

export const main = (input: string) => {
  const scanners: Scanners = splitLines(input)
    .reduce<Scanners>((prev, line) => {
      const [level, depth] = lineToNumbers(line, /\D+/);
      return {
        ...prev,
        [level]: depth
      }
    }, {});

  return [
    severity(scanners, 0),
    findPassDelay(scanners)
  ];
};

if (require.main === module) runWithStdIn(main);
