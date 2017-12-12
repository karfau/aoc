import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {isNumber} from 'lodash';

export type Pipes = {readonly [key: number]: ReadonlyArray<number>};

const getGroup = (
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

export function collect(input: string): ReadonlySet<number> {
  const pipes = splitLines(input)
    .map(line => lineToNumbers(line, /\D+/))
    .reduce((pipes, [it, ...others]) => ({
      ...pipes, [it]: others
    }), {} as Pipes);

  return getGroup(pipes, [0]);
}

export const main = (input: string) => {
  return collect(input).size;
};

if (require.main === module) runWithStdIn(main);
