import {range} from 'lodash';
import {lineToNumbers, runWithStdIn, splitLines} from './tools';

export const isScanned = (depth: number, time: number): boolean => time % (depth + depth - 2) === 0;

export type Scanners = {readonly [key: number]: number};

export const catchingScanners = (scanners: Scanners, time: number): ReadonlyArray<number> =>
  Object.keys(scanners).map(skey => parseInt(skey, 10))
        .filter(level => isScanned(scanners[level], time + level));

export const severity = (scanners: Scanners, time: number): number =>
  catchingScanners(scanners, time).reduce((sum, level) => sum + level * scanners[level], 0);

export const findPassDelay = (scanners: Scanners, start = 0, iterate = 10): number => {
  // we need to iterate here to prevent `Maximum call stack size exceeded`
  // we increase `iterate` each time we need to go to net stack
  // if this down't work for you, you can pass a bigger initial value for `iterate`
  const found = range(start, start + iterate).find(time => catchingScanners(scanners, time).length === 0);
  return found !== undefined ? found : findPassDelay(scanners, start + iterate, iterate * 10);
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
