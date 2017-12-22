import {lineToNumbers, Numbers, runWithStdIn, splitLines} from './tools';
import {countBy, intersection} from 'lodash';

export type Vector = [number, number, number];

export const calc = (t: number, p: number, v: number, a: number) =>
  t === 0 ? p : p + v * t + a * (t * (t + 1)) / 2;

export class Particle {

  private readonly _pos: Vector;
  readonly acc: Vector;
  readonly vel: Vector;
  readonly pos: (t: number) => Vector;

  constructor(...values: number[]) {
    const [px, py, pz, vx, vy, vz, ax, ay, az] = values;
    this._pos = [px, py, pz];
    this.acc = [ax, ay, az];
    this.vel = [vx, vy, vz];
    this.pos = (t: number) => [
      calc(t, px, vx, ax),
      calc(t, py, vy, ay),
      calc(t, pz, vz, az)
    ];
  }

  toString() {
    return `(p:${this._pos}; v:${this.vel}; a:${this.acc})`;
  }
}

export function tick(input: ReadonlyArray<Particle>, t: number): ReadonlyArray<Particle> {
  const pos = input.map(p => p.pos(t));
  const grouped = countBy(pos.map(p => p.join(',')));
  return input.filter((it, i) => grouped[pos[i].join(',')] === 1);
}

const TESTS = 20;

const absolute = (pos: Vector) => pos.map(Math.abs).reduce((sum, v) => sum + v, 0);

type Min = [number, Numbers];

const min = (list: Numbers): Min => {
  const value = Math.min(...list);
  const indexes = list.map((v, i) => i).filter(i => list[i] === value);
  return [value, indexes];
};

const returnSingleOrCall = (test: Numbers, call: () => number): number =>
  test.length === 1 ? test[0] : call();

export const findClosest = (particles: ReadonlyArray<Particle>): number => {

  // find the particles with the lowest "absolute acceleration"
  const acc: Numbers = particles.map(p => absolute(p.acc));

  /** slowest contains indexes from particles */
  const slowest = min(acc)[1];

  if (slowest.length === 1) {
    return slowest[0];
  }

  const iteration = (
    lastDistances: Numbers = [], lastIntersection: Numbers = [], repIntersect: number = 0, t: number = 1
  ): number => {
    const distances = slowest.map(i => absolute(particles[i].pos(t)));
    const differences = distances.map(
      (distance, i) => i < lastDistances.length ? distance - lastDistances[i] : -1
    );
    const closest = min(distances)[1];
    const [minDiff, moved] = min(differences);
    const intersec = intersection(closest, moved).sort((a, b) => a - b);
    const repeated = intersec.length > 1 && intersec.join(',') === lastIntersection.join(',') ? repIntersect + 1 : 0;
    // console.log(t, distances, differences, lastIntersection);
    if (repeated >= TESTS){
      console.warn('intersections didn\'t change');
      return -1;
    }

    if (differences.every(d => d === 0)){
      return returnSingleOrCall(intersec, () => -1);
    }

    const next = () => iteration(distances, intersec, repeated, t+1);
    if (minDiff > 0) {// all particles move away from zero
      return returnSingleOrCall(intersec, next)
    }

    return next();
  };

  return returnSingleOrCall(slowest, iteration);
};

export const parseParticles = (input: string): ReadonlyArray<Particle> =>
  splitLines(input).map(
    line => new Particle(...lineToNumbers(line.replace(/[pva=<>\s]/g, ''), ','))
  );

export const removeCollisions = (particles: ReadonlyArray<Particle>): number => {
  let current = particles;
  let amount = current.length;
  let t = 0, i = TESTS;
  while (i > 0) {
    current = tick(current, t++);
    i = amount > current.length ? TESTS : i - 1;
    amount = current.length;
  }
  return amount;
};

export const main = (input: string) => {
  const particles = parseParticles(input);
  return [
    findClosest(particles),
    removeCollisions(particles)
  ];
};

if (require.main === module) runWithStdIn(main);
