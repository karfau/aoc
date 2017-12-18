import {lineToNumbers, runWithStdIn, splitLines} from './tools';
import {uniq} from 'lodash';

export function instruction(state: any, input: string): any {
  const [cmd, first, second] = input.split(/\s+/);
  const updated: any = {_move: 1};
  switch (cmd) {
    case 'snd':
      updated._snd = first in state ? state[first] : parseInt(first, 10);
      break;
    case 'set':
      updated[first] = second in state ? state[second] : parseInt(second, 10);
      break;
  }

  return {...state, ...updated};
}

export const main = (input: string) => {
  const lines = splitLines(input);
  return;
};

if (require.main === module) runWithStdIn(main);
