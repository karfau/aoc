import {countBy, sum, values} from 'lodash';
import {runWithStdIn, splitLines} from './tools';

export type Directions = {
  n: number;
  ne: number;
  se: number;
  s: number;
  sw: number;
  nw: number;
}

type Step = keyof Directions;

export const INITIAL: Readonly<Directions> = {
  n: 0,
  ne: 0,
  se: 0,
  s: 0,
  sw: 0,
  nw: 0
};

const clearOpposites = (
  dir: Directions, a: keyof Directions, b: keyof Directions
): Partial<Directions> => dir[a] === 0 || dir[b] === 0 ? {[a]: dir[a], [b]: dir[b]} : {
  [a]: dir[a] > dir[b] ? dir[a] - dir[b] : 0,
  [b]: dir[b] > dir[a] ? dir[b] - dir[a] : 0
};

const walkCorner = (
  dir: Directions, a: keyof Directions, b: keyof Directions, target: keyof Directions
): Partial<Directions> => {
  if (dir[a] === 0 || dir[b] === 0) {
    return {};
  }
  const common = Math.min(dir[a], dir[b]);
  return {
    [a]: dir[a] - common,
    [b]: dir[b] - common,
    [target]: dir[target] + common
  };
};

export const reduceSteps = (dir: Directions): Directions => {
  let result: Directions = {
    ...clearOpposites(dir, 'n', 's'),
    ...clearOpposites(dir, 'nw', 'se'),
    ...clearOpposites(dir, 'ne', 'sw')
  } as Directions;
  result = {...result, ...walkCorner(result, 'ne', 's', 'se')};
  result = {...result, ...walkCorner(result, 'se', 'n', 'ne')};

  result = {...result, ...walkCorner(result, 'nw', 's', 'sw')};
  result = {...result, ...walkCorner(result, 'sw', 'n', 'nw')};

  result = {...result, ...walkCorner(result, 'sw', 'se', 's')};
  result = {...result, ...walkCorner(result, 'nw', 'ne', 'n')};
  return result;
};

export const minimalSteps = (input: string): number =>
  sum(values(reduceSteps({...INITIAL, ...countBy(input.split(/,/)) as Directions})));

const furthest = (input: string): number =>
  input.split(/,/).reduce(
    (max, step, i, allSteps: Step[]) => Math.max(max, minimalSteps(allSteps.slice(0, i).join(','))),
    0
  );

export const main = (input: string) => {
  const line = splitLines(input)[0];
  return [
    minimalSteps(line),
    furthest(line)
  ];
};

if (require.main === module) runWithStdIn(main);
