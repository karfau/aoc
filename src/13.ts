import {lineToNumbers, runWithStdIn, splitLines} from './tools';

export const isScanned = (depth: number, time: number): boolean => time % (depth + depth - 2) === 0;

export type Scanners = {readonly [key: number]: number};

export const severity = (scanners: Scanners, time: number) => {
  return Object.keys(scanners)
        .map(skey => parseInt(skey, 10))
        .filter(level => isScanned(scanners[level], time + level))
        .reduce((sum, level) => sum + level * scanners[level], 0)
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

  return severity(scanners, 0);
};

if (require.main === module) runWithStdIn(main);
