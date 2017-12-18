import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {curry} from 'lodash';

export const valueFor = (state: any, keyOrValue: string): number =>
  keyOrValue in state ? state[keyOrValue] : parseInt(keyOrValue, 10);

export function instruction(state: any, input: string): any {
  const val = (kv: string) => valueFor(state, kv);
  const [cmd, first, second] = input.split(/\s+/);
  const updated: any = {_move: 1};
  switch (cmd) {
    case 'snd':
      updated._snd = val(first);
      break;
    case 'set':
      updated[first] = val(second);
      break;
  }

  return {...state, ...updated};
}

export const main = (input: string) => {
  const lines = splitLines(input);
  return;
};

if (require.main === module) runWithStdIn(main);
