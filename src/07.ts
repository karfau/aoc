import {runWithStdIn, splitLines} from './tools';
import {difference, flatten, sum, uniq} from 'lodash';

export type Program = {
  w: number;
  c: string[];
  s?: number;
}

export type Tower = {
  [name: string]: Program
}

export function findRoot(lines: ReadonlyArray<string>): string {
  const children: string[] = [];
  return difference(lines.map(line => {
    const [head, ...below] = line.split(/[ (\d)\->,]+/);
    children.push(...below);
    return head;
  }), children)[0];
}

export const tower = (lines: ReadonlyArray<string>): Tower => {
  return lines.reduce((tower, line) => {
    const [head, w, ...c] = line.split(/[\s()\->,]+/);
    tower[head as string] = {w: parseInt(w), c: c.length === 1 && c[0] === '' ? [] : c};
    return tower;
  }, {} as Tower);
};

export const tasks = (t: Tower, root: string): string[][] => {
  const result: string[][] = [];
  let current: string[] = [root];
  do {
    const next = flatten(current.map(c => c in t ? t[c].c : []));
    result.push(current);
    current = next;
  } while (current.length > 0);
  return result;
};

export type Sums = {[key: string]: [number, number[]]}

export const sums = (t:Tower, tasks: string[][]): Sums => {
  return [...tasks].reverse().reduce((result, tasklevel, lvl) => {
    tasklevel.reduce((r, task) => {
      const cw = t[task].c.map(c => r[c][0]);
      r[task] = [sum(cw) + t[task].w, cw];
      if (uniq(cw).length>1){
        console.log(tasks.length - lvl, cw, t[task].c.map(c => [c, t[c].w, ...r[c]]));
      }
      return r
    }, result);
    return result;
  }, {} as Sums)
};

export const main = (input: string) => {
  const lines = splitLines(input);
  const root = findRoot(lines);
  const t = tower(lines);
  sums(t, tasks(t, root))
};

if (require.main === module) runWithStdIn(main);
