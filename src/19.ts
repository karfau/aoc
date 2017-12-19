import {lineToNumbers, Pair, runWithStdIn, splitLines} from './tools';
import {values} from 'lodash';

export enum Direction {up = '-1,0', left = '0,-1', down = '1,0', right = '0,1'}
export const doStep = (dir: Direction, line: number, col: number): Pair<number> => {
  const [ml, mc] = lineToNumbers(dir, ',');
  return [line + ml, col + mc];
};

export enum Tubes {CORNER = '+', UP_DOWN = '|', LEFT_RIGHT = '-'}
export const TUBES: ReadonlyArray<string> = values(Tubes);
export const VOID = ' ';

const SameDirection = {
  [Direction.up]: Tubes.UP_DOWN,
  [Direction.down]: Tubes.UP_DOWN,
  [Direction.right]: Tubes.LEFT_RIGHT,
  [Direction.left]: Tubes.LEFT_RIGHT
};

export const get = (tubes: ReadonlyArray<string>, [line, col]: Pair<number>) =>
  line >= 0 && line < tubes.length && col >= 0 && col < tubes[line].length ? tubes[line][col] : VOID;

export const walkToNextCorner = (
  tubes: ReadonlyArray<string>, [line, col]: Pair<number>, dir: Direction, letters: string[]
): Pair<number> => {
  const next = doStep(dir, line, col);
  const value = get(tubes, next);
  if (value === VOID) {
    // next step would leave tubes
    // return last position instead
    return [line, col];
  }
  if (value === Tubes.CORNER) {
    // can not do this check with current position (or in next invocation.
    // since the function can also be called starting from a corner position
    return next;
  }
  if (TUBES.indexOf(value) === -1) {
    // not one of the tube symbols, so we assume it is a letter
    letters.push(value);
  }
  return walkToNextCorner(tubes, next, dir, letters);
};

export const turn = (
  tubes: ReadonlyArray<string>, [line, col]: Pair<number>, from: Direction
): Direction | undefined =>
  values<Direction>(Direction as any)
    .filter(it => SameDirection[it] !== SameDirection[from])
    .find(candidate => get(tubes, doStep(candidate, line, col)) !== VOID);

export const main = (input: string) => {
  const tubes = splitLines(input);
  const letters: string[] = [];
  let steps = 1; // > (including the first line at the top of the diagram)
  let pos: Pair<number> = [0, tubes[0].indexOf(Tubes.UP_DOWN)];
  let dir: Direction | undefined = Direction.down;

  do {
    const nextCorner = walkToNextCorner(tubes, pos, dir, letters);
    dir = turn(tubes, nextCorner, dir);
    
    const [lineBefore, colBefore] = pos; // keep old values before overwriting
    const [line, col] = nextCorner;
    steps += Math.abs(line - lineBefore) + Math.abs(col - colBefore);
    
    pos = nextCorner;
  } while (dir);
  return [letters.join(''), steps];
};

if (require.main === module) runWithStdIn(main);
