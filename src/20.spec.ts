import {findClosest, parseParticles, Particle, removeCollisions, tick, Vector} from './20';

const EXAMPLE_1 = parseParticles(`
p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>
`);

const EXAMPLE_2 = parseParticles(`
p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>
`);

const EXAMPLE_STILL_DIST = parseParticles(`
p=<-6,0,0>, v=<0,0,0>, a=< 0,0,0>
p=<-4,0,0>, v=<0,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=<0,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<0,0,0>, a=< 0,0,0>
`);

const EXAMPLE_SAME = parseParticles(`
p=<4,0,0>, v=<1,0,0>, a=< 0,0,0>
p=<0,4,0>, v=<0,1,0>, a=< 0,0,0>
p=<0,0,4>, v=<0,0,1>, a=< 0,0,0>
`);

const EXAMPLE_STILL = parseParticles(`
p=<4,0,0>, v=<0,0,0>, a=< 0,0,0>
p=<0,4,0>, v=<0,0,0>, a=< 0,0,0>
p=<0,0,4>, v=<0,0,0>, a=< 0,0,0>
`);

describe('day 20', () => {
  describe('particle()', () => {
    [
      [new Particle(0,0,0, 1,1,1, 1,1,1), 0 , [0,0,0]],
      [new Particle(0,0,0, 1,1,1, 2,2,2), 1 , [3,3,3]],
      [new Particle(0,0,0, 1,1,1, 2,2,2), 2 , [8,8,8]],
      [new Particle(-10,-10,-10, 1,1,1, 2,2,2), 2 , [-2,-2,-2]],
    ].forEach(([p, t, result]: [Particle, number, Vector]) => {
      it(`${p}(${t}) should return [${result}]`, () => {
        expect(p.pos(t)).toEqual(result);
      });
    });
  });
  
  describe('tick()', () => {
    it(`should work for example`, () => {
      expect(tick(EXAMPLE_2, 0).length).toEqual(4);
      expect(tick(EXAMPLE_2, 2).length).toEqual(1);
    });
  });

  describe('removeCollisions()', () => {
    it(`should work for example 1`, () => {
      expect(removeCollisions(EXAMPLE_1)).toBe(2);
    });
    it(`should work for example 2`, () => {
      expect(removeCollisions(EXAMPLE_2)).toBe(1);
    });
  });

  describe('findClosest()', () => {

    [
      ['example 1', EXAMPLE_1, 0],
      ['example 2', EXAMPLE_2, 3],
      ['no movement but different distances', EXAMPLE_STILL_DIST, 2],
      ['same movement and distances all the time', EXAMPLE_SAME, -1],
      ['no movement same distances', EXAMPLE_STILL, -1],
    ].forEach(([what, particles, result]: [string, ReadonlyArray<Particle>, number]) => {
      it(`${what} should return ${result}`, () => {
        expect(findClosest(particles)).toBe(result);
      });
    });
  });
});
