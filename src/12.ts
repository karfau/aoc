import {lineToNumbers, runWithStdIn, splitLines} from './tools';

export function collect(input: string): ReadonlySet<number> {
  const pipes = splitLines(input)
    .map(line => lineToNumbers(line, /\D+/))
    .reduce((pipes, [it, ...others]) => ({
      ...pipes, [it]: others
    }), {} as {[key: number]: ReadonlyArray<number>});

  const result = new Set<number>();
  const queue: number[] = [...pipes[0]];
  while (queue.length > 0) {
    const current = queue.shift() as number;
    if (result.has(current)) {
      continue;
    }
    queue.push(...pipes[current]);
    result.add(current);
  }
  return result;
}

export const main = (input: string) => {
  return collect(input);
};

if (require.main === module) runWithStdIn(main);
