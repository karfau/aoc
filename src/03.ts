import {Pair, runWithStdIn} from './tools';

export const dimension = (num: number): number => {
  let result = 1;
  while (result * result < num) {
    result += 2;
  }
  return result;
};

export const position = (num: number): Pair<number> => {
  const dim = dimension(num);
  let i, x, y,
    halfDim = (dim-1)/2,
    max = dim * dim;
  x = halfDim;
  y = halfDim;
  i = max;
  let step = -1;
  let horizontal = true;
  let turn = max - halfDim * 2;
  while (num !== i) {
    if(i === turn){
      horizontal = !horizontal;
      if (horizontal) {
        step = 1;
      }
      turn -= halfDim * 2
    }
    i--;
    if(horizontal){
      x += step
    } else {
      y += step
    }
  }
  return [x, y];
};

export const main = (input: string) => {
  return position(parseInt(input)).reduce(
      (sum, pos) => sum + Math.abs(pos),
      0
    );
};

if (require.main === module) runWithStdIn(main);
