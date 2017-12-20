import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {countBy} from 'lodash';

export type Vector = [number, number, number];
export type Particle = {
  t: (t: number) => Vector;
  toString: () => string;
}

export const calc = (t: number, p: number, v: number, a: number) =>
  t === 0 ? p : p + v * t + a * (t * (t + 1)) / 2;

export const particle = (...values: number[]): Particle => {
  const [px, py, pz, vx, vy, vz, ax, ay, az] = values;
  return {
    t: t => [
      calc(t, px, vx, ax),
      calc(t, py, vy, ay),
      calc(t, pz, vz, az)
    ],
    toString: () => `(p:${[px, py, pz]}; v:${[vx, vy, vz]}; a:${[ax, ay, az]})`
  };
};

export function tick(input: ReadonlyArray<Particle>, t: number): ReadonlyArray<Particle> {
  const pos = input.map(p => p.t(t));
  const grouped = countBy(pos.map(p => p.join(',')));
  return input.filter((it, i) => grouped[pos[i].join(',')] === 1);
}

export const parseParticles = (input: string): ReadonlyArray<Particle> =>
  splitLines(input).map(
    line => particle(...lineToNumbers(line.replace(/[pva=<>\s]/g, ''), ','))
  );

const TESTS = 100;
export const main = (input: string) => {
  let current = parseParticles(input);
  let amount = current.length;
  let t = 0, i = TESTS;
  while (i > 0) {
    current = tick(current, t++);
    i = amount > current.length ? TESTS : i - 1;
    amount = current.length;
  }
  return amount;
};

if (require.main === module) runWithStdIn(main);
