import {runWithStdIn} from './tools';

export type Spin = {
  list: ReadonlyArray<number>;
  needle?: number;
  last?: number;
  lastPos?: number;
}

export function spin(
  {list, needle = NaN, last = Math.max(...list), lastPos = list.indexOf(last)}: Spin, steps: number
): Spin {

  const next = last + 1; // next is also the virtual length of the list
  const nextPos = ((lastPos + steps) % (next)) + 1;
  const result = nextPos > list.length ? list : [
    ...list.slice(0,nextPos),
    next,
    ...(nextPos === list.length ? [] : list.slice(nextPos))
  ];
  const needlePos = result.indexOf(needle);

  return needlePos === -1 ? {
    list: result,
    needle
  } : {
    list: result.slice(0, needlePos + 2),
    needle,
    last: next,
    lastPos: nextPos
  }
}

export const digitAfter = (rounds: number, steps: number, needle: number) : number => {
  let result: Spin = {list: [0], needle}, i = 0;
  while (i++ < rounds) {
    result = spin(result, steps);
  }
  return result.list[result.list.indexOf(needle) + 1];
};

export const main = () => {
  const puzzle_input = 345;
  return [
    digitAfter(2017, puzzle_input, 2017),
    digitAfter(50000000, puzzle_input, 0)
  ];
};

if (require.main === module) runWithStdIn(main);
