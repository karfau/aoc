import {main, parseParticles, particle, Particle, tick, Vector} from './20';

const EXAMPLE = `
p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>
`;

describe('day 20', () => {
  describe('particle()', () => {
    [
      [particle(0,0,0, 1,1,1, 1,1,1), 0 , [0,0,0]],
      [particle(0,0,0, 1,1,1, 2,2,2), 1 , [3,3,3]],
      [particle(0,0,0, 1,1,1, 2,2,2), 2 , [8,8,8]],
      [particle(-10,-10,-10, 1,1,1, 2,2,2), 2 , [-2,-2,-2]],
    ].forEach(([p, t, result]: [Particle, number, Vector]) => {
      it(`${p}(${t}) should return [${result}]`, () => {
        expect(p.t(t)).toEqual(result);
      });
    });
  });
  
  describe('tick()', () => {
    it(`should work for example`, () => {
      const particles = parseParticles(EXAMPLE);
      console.log(particles.map(p => p.toString()));
      expect(tick(particles, 0).length).toEqual(4);
      expect(tick(particles, 2).length).toEqual(1);
    });
  });
  describe('main()', () => {
    it(`should work for example`, () => {
      expect(main(EXAMPLE)).toEqual(1);
    });
  });
});
