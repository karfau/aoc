import {range} from 'lodash';
import {toASCII} from 'punycode';
import {lineToNumbers, runWithStdIn, splitLines} from './tools';

export const pick = <T>(list: ReadonlyArray<T>, pos: number, length: number): ReadonlyArray<T> => {
  const end = pos + length;
  const wrapped = end >= list.length ? list.slice(0, end % list.length) : [];
  return [...list.slice(pos, end), ...wrapped];
};

export const mergeReverse = <T>(list: ReadonlyArray<T>, pos: number, picked: ReadonlyArray<T>): ReadonlyArray<T> => {
  const reversed = [...picked].reverse();
  const mapping = range(pos, pos + picked.length).map(i => i % list.length);
  return list.map((old, i) => {
    const ri = mapping.indexOf(i);
    return ri > -1 ? reversed[ri] : old;
  });
};

export type KnotHashIter = Readonly<{
  data: ReadonlyArray<number>;
  pos: number;
  skipSize: number;
}>;

export const INITIAL: KnotHashIter = {
  data: range(0, 256),
  pos: 0,
  skipSize: 0
};

export const step = ({data, pos, skipSize}: KnotHashIter, length: number): KnotHashIter => {
  return {
    data: mergeReverse(data, pos, pick(data, pos, length)),
    pos: (pos + length + skipSize) % data.length,
    skipSize: skipSize + 1
  };
};

export const LENGTH_SUFFIX: ReadonlyArray<number> = [17, 31, 73, 47, 23];
export const asciiLength = (input: string) => {
  return [...input.split('').map(c => c.charCodeAt(0)), ...LENGTH_SUFFIX];
};

export const main = (input: string) => {
  const line = splitLines(input)[0];
  const {data: [first, second]} = lineToNumbers(line, ',')
    .reduce(step, INITIAL);
  return [first * second];
};

if (require.main === module) runWithStdIn(main);
