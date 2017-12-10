import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {range} from 'lodash'

export const pick = <T>(list: ReadonlyArray<T>, pos: number, length: number): ReadonlyArray<T> => {
  const end = pos + length;
  const wrapped = end >= list.length ? list.slice(0, end % list.length) : [];
  return [...list.slice(pos, end), ...wrapped];
};

export const mergeReverse = <T>(list: ReadonlyArray<T>, pos: number, picked: ReadonlyArray<T>): ReadonlyArray<T> => {
  const reversed = [...picked].reverse();
  const overlap = (pos + reversed.length) - list.length;
  // console.log('overlap', overlap);
  return list.map((old, i) => {
    const ri = overlap > 0 && i < overlap ? i + reversed.length - overlap : i - pos;
    // console.log(i, ri, reversed[ri]);
    return ri >= 0 && ri < reversed.length ? reversed[ri] : old;
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

export const main = (input: string) => {
  const data = range(0, 256);
  console.log(data.length, data[data.length - 1]);
  const {data: [first, second]} = lineToNumbers(splitLines(input)[0], ',')
    .reduce(step, {pos: 0, data});
  return first * second;
};

if (require.main === module) runWithStdIn(main);
