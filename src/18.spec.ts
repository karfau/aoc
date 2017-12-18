import {duet, firstRecover, instruction} from './18';

const INITIAL = (init?: any): any => ({
  z: 0, // zero
  p: 1, // positive
  n: -1, // negative
  ...init
});

describe('day 6', () => {
  describe('instruction()', () => {
    [
      [{}, 'set a 1', {a: 1, _move: 1}],
      [{}, 'set a z', {a: 0, _move: 1}],
      [{}, 'set b x', {b: 0, _move: 1}],
      [{}, 'set b -50', {b: -50, _move: 1}],

      [{}, 'snd 5', {_snd: 5, _move: 1}],
      [{}, 'snd p', {_snd: 1, _move: 1}],
      [{}, 'snd x', {_snd: 0, _move: 1}],

      [{_snd: 4}, 'rcv 5', {_snd: 4, _rcv: 4, _move: 1}],
      [{_snd: 3}, 'rcv p', {_snd: 3, _rcv: 3, _move: 1}],
      [{}, 'rcv z', {_move: 1}],
      [{}, 'rcv x', {_move: 1}],

      [{}, 'add p 1', {p: 2, _move: 1}],
      [{}, 'add z z', {z: 0, _move: 1}],
      [{}, 'add n p', {n: 0, _move: 1}],
      [{}, 'add p n', {p: 0, _move: 1}],
      [{}, 'add x 5', {x: 5, _move: 1}],
      [{}, 'add x -5', {x: -5, _move: 1}],

      [{}, 'mul p 4', {p: 4, _move: 1}],
      [{}, 'mul z z', {z: 0, _move: 1}],
      [{}, 'mul n p', {n: -1, _move: 1}],
      [{}, 'mul p n', {p: -1, _move: 1}],
      [{}, 'mul x 5', {x: 0, _move: 1}],
      [{}, 'mul x -5', {x: -0, _move: 1}],

      [{}, 'mod p 4', {/* p: 1,*/ _move: 1}],
      [{}, 'mod p p', {p: 0, _move: 1}],
      [{}, 'mod p 1', {p: 0, _move: 1}],
      [{}, 'mod x 5', {x: 0, _move: 1}],

      [{}, 'jgz p 4', {_move: 4}],
      [{f: 5}, 'jgz p f', {f: 5, _move: 5}],
      [{}, 'jgz z x', {_move: 1}],
      [{}, 'jgz n p', {_move: 1}],
      [{}, 'jgz p n', {_move: -1}],
      [{}, 'jgz x 5', {_move: 1}],
      [{}, 'jgz x -5', {_move: 1}],

    ].forEach(([initial, cmd, result]: [any, string, any]) => {
      const start: any = INITIAL(initial), out: any = INITIAL(result);
      it(`for star 1 ${JSON.stringify(start)} with instruction "${cmd}" should result in ${JSON.stringify(out)}`, () => {
        expect(instruction(start, cmd)).toEqual(out);
      });
    });

    [
      [{_send: []}, 'snd 5', {_send: [5], _move: 1}],
      [{_send: [7]}, 'snd z', {_send: [7, 0], _move: 1}],
      [{_send: []}, 'snd x', {_send: [0], _move: 1}],

      [{_get: []}, 'rcv a', {_get: [], _move: 0}],
      [{_get: [7], _rcv: 0}, 'rcv b', {_get: [7], _rcv: 1, b: 7, _move: 1}],
      [{_get: [0, 1, 2, 3], _rcv: 2}, 'rcv c', {_get: [0, 1, 2, 3], _rcv: 3, c: 2, _move: 1}],
      [{_get: [0, 1, 2], _rcv: 2}, 'rcv x', {_get: [0, 1, 2], _rcv: 3, x: 2, _move: 1}],
      [{_get: [0, 1, 2], _rcv: 3}, 'rcv y', {_get: [0, 1, 2], _rcv: 3, _move: 0}],
    ].forEach(([initial, cmd, result]: [any, string, any]) => {
      const start: any = INITIAL(initial), out: any = INITIAL(result);
      it(`for star 2 ${JSON.stringify(start)} with instruction "${cmd}" should result in ${JSON.stringify(out)}`, () => {
        expect(instruction(start, cmd)).toEqual(out);
      });
    });
  });

  describe('firstRecover()', () => {
    it('should work for test case', () => {
      expect(firstRecover([
                            'set a 1',
                            'add a 2',
                            'mul a a',
                            'mod a 5',
                            'snd a',
                            'set a 0',
                            'rcv a',
                            'jgz a -1',
                            'set a 1',
                            'jgz a -2'
                          ])).toBe(4);
    });
  });

  describe('duet()', () => {
    it('should work for test case', () => {
      expect(duet([
                    'snd 1',
                    'snd 2',
                    'snd p',
                    'rcv a',
                    'rcv b',
                    'rcv c',
                    'rcv d'
                  ])).toBe(3);
    });
  });
});
