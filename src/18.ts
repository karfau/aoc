import {runWithStdIn, splitLines} from './tools';

export const valueFor = (state: any, keyOrValue: string): number => {
  if (/\d+/.test(keyOrValue)) {
    return parseInt(keyOrValue, 10);
  }
  return keyOrValue in state ? state[keyOrValue] : 0;
};

export function instruction(state: any, input: string): any {
  const val = (kv: string) => valueFor(state, kv);
  const [cmd, first, second] = input.split(/\s+/);
  const updated: any = {_move: 1};
  switch (cmd) {
    case 'snd':
      if ('_send' in state) {
        state._send.push(val(first));
      } else {
        updated._snd = val(first);
      }
      break;
    case 'rcv':
      if ('_get' in state) {
        const index = val('_rcv');
        if (state._get.length > index) {
          updated[first] = state._get[index];
          updated._rcv = index + 1;
        } else {
          updated._move = 0;
        }
      } else {
        if (val(first) != 0)
          updated._rcv = state._snd;
      }
      break;
    case 'set':
      updated[first] = val(second);
      break;
    case 'add':
      updated[first] = val(first) + val(second);
      break;
    case 'mul':
      updated[first] = val(first) * val(second);
      break;
    case 'mod':
      updated[first] = val(first) % val(second);
      break;
    case 'jgz':
      if (val(first) > 0)
        updated._move = val(second);
      break;
  }

  return {...state, ...updated};
}

export const firstRecover = (input: string[]): number => {
  let registers: any = {}, pos = 0;
  while (!('_rcv' in registers) && pos < input.length) {
    registers = instruction(registers, input[pos]);
    pos += registers._move;
  }
  return registers._rcv;
};

export const duet = (input: string[]): number => {
  let qa: number[] = [], qb: number[] = [];
  let A: any = {p:0, _send: qa, _get: qb};
  let B: any = {p:1, _send: qb, _get: qa};
  let posA = 0, posB = 0;
  while (posA < input.length && posB < input.length && (A._move != 0 || B._move != 0)) {
    A = instruction(A, input[posA]);
    posA += A._move;
    B = instruction(B, input[posB]);
    posB += B._move;
  }
  return qb.length;
};

export const main = (input: string) => {
  const lines = splitLines(input);
  return [
    firstRecover(lines),
    duet(lines)
  ];
};

if (require.main === module) runWithStdIn(main);
