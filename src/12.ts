import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {isNumber} from 'lodash';

export type Pipes = {readonly [key: number]: ReadonlyArray<number>};

export const getGroup = (
  pipes: Pipes, [current, ...queue]: ReadonlyArray<number>, known: ReadonlySet<number> = new Set()
): ReadonlySet<number> => {

  if (isNumber(current) && current in pipes) {
    const nextQueue: ReadonlyArray<number> = [...queue, ...pipes[current]].filter(it => !known.has(it));
    const newKnown = new Set(known);
    newKnown.add(current);
    return getGroup(pipes, nextQueue, newKnown)
  }
  return known;
};

export function pipes(input: string): Pipes {
  return splitLines(input)
    .map(line => lineToNumbers(line, /\D+/))
    .reduce((pipes, [it, ...others]) => ({
      ...pipes, [it]: others
    }), {} as Pipes);
}

export const countGroups = (
  pipes: Pipes, startWith: number = 0, known: ReadonlyArray<ReadonlySet<number>> = []
): number => {
  if(known.find(it => it.has(startWith))) {
    throw new Error('can not start with key from existing group');
  }
  const group = getGroup(pipes, [startWith]);
  const nextKnown = [...known, group];
  //find the key that is not in any known group:
  const next = Object.keys(pipes).find(it => nextKnown.find(ks => ks.has(parseInt(it, 10))) === undefined);

  return next === undefined ? nextKnown.length : countGroups(pipes, parseInt(next, 10), nextKnown)
};

export const main = (input: string) => {
  const p = pipes(input);
  return [
    getGroup(p, [0]).size,
    countGroups(p)
  ];
};

if (require.main === module) runWithStdIn(main);
