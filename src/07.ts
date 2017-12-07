import {runWithStdIn, splitLines} from './tools';
import {difference} from 'lodash'

export function findRoot(lines: ReadonlyArray<string>): string {
  const children: string[] = [];
  return difference(lines.map(line => {
    const [head, ...below] = line.split(/[ (\d)->,]+/);
    children.push(...below);
    return head;
  }), children)[0];
}

export const main = (input: string) => {
  const lines = splitLines(input);
  return findRoot(lines);
};

if (require.main === module) runWithStdIn(main);
