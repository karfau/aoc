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

export type KnotHash = {
  pos: number;
  data: ReadonlyArray<number>;
}

export const step = ({pos, data}: KnotHash, length: number, skipSize: number): KnotHash => {
  return {
    pos: (pos + length + skipSize) % data.length,
    data: mergeReverse(data, pos, pick(data, pos, length))
  };
};

export const LENGTH_SUFFIX: ReadonlyArray<number> = [17, 31, 73, 47, 23];
export const asciiLength = (input: string) => {
  return [...input.split('').map(c => c.charCodeAt(0)), ...LENGTH_SUFFIX];
};

export const main = (input: string) => {
  const data = range(0, 256);
  const line = splitLines(input)[0];
  const {data: [first, second]} = lineToNumbers(line, ',')
    .reduce(step, {pos: 0, data});
  return [first * second];
};

if (require.main === module) runWithStdIn(main);
