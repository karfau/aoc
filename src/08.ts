import {runWithStdIn, splitLines} from './tools';
import {values} from 'lodash'

export type Data = { [key: string]: number };

export function instruction(
  input: Data, register:string, direction: 'inc' | 'dec', value: number
): Data {
  return {
    ...input,
    [register]: (register in input ? input[register] : 0) + (direction === 'dec' ? -value : value)
  };
}

export const condition = (data: Data, expr: string): boolean => {
  const [reg] = expr.split(/\s+/);
  const input = {[reg]: 0, ...data};
  return eval(`input.${expr}`);
};

export const iteration = (data: Data, line:string): Data => {
  const [start, cond] = line.split(/\s+if\s+/);
  if( !condition(data, cond) ) {
    return data;
  }
  const [reg, dir, val] = start.split(/\s+/);
  return instruction(data, reg, dir as any, parseInt(val, 10));
};

export const findMax = (start: number, data: Data) => Math.max(0, ...values(data));

export const main = (input: string) => {
  return findMax(0, splitLines(input).reduce(iteration, {} as Data));
};

if (require.main === module) runWithStdIn(main);
