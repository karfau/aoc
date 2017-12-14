import {padStart, range} from 'lodash';
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

export const asciiLength = (input: string): ReadonlyArray<number> => {
  return [...input.split('').map(c => c.charCodeAt(0)), ...LENGTH_SUFFIX];
};

export const xorConvert = (input: ReadonlyArray<number>, base = 16): string => {
  const [_0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, ...more] = input;
  const hex = (_0 ^ _1 ^ _2 ^ _3 ^ _4 ^_5 ^_6 ^_7 ^_8 ^_9 ^_10 ^_11 ^_12 ^_13 ^_14 ^_15).toString(base);
  return padStart(hex, (255).toString(base).length, '0') + (more.length > 0 ? xorConvert(more, base) : '');
};

export const knotHash = (input: string, base = 16): string => {
  const length = asciiLength(input);
  const singleRound = (acc: KnotHashIter) => {
    return length.reduce(step, acc);
  };
  return xorConvert(range(0, 64).reduce(singleRound, INITIAL).data, base);
};

export const main = (input: string) => {
  const line = splitLines(input)[0];
  const {data: [first, second]} = lineToNumbers(line, ',').reduce(step, INITIAL);
  return [
    first * second,
    knotHash(line)
  ];
};

if (require.main === module) runWithStdIn(main);
