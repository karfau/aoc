import {lineToNumbers, Pair, runWithStdIn, splitLines} from './tools';
import {values} from 'lodash';

export enum Direction {up = '-1,0', left = '0,-1', down = '1,0', right = '0,1'}

export enum Tubes {CORNER = '+', UP_DOWN = '|', LEFT_RIGHT = '-'}

export function walkToNextCorner(
  input: ReadonlyArray<string>,
  [line, col]: Pair<number>,
  dir: Direction,
  letters: string[]
): Pair<number> {
  const [moveLine, moveCol] = lineToNumbers(dir, ',');
  while (input[line][col] != Tubes.CORNER) {
    const current = input[line][col];
    if (current === undefined || current === ' ') {
      break;
    }
    if (current !== Tubes.LEFT_RIGHT && current !== Tubes.UP_DOWN) {
      letters.push(current);
    }
    line += moveLine;
    col += moveCol;
  }
  return [line, col];
}

export const turn = (tubes: ReadonlyArray<string>, [line, col]: Pair<number>, from: Direction) => {
  const [fromLine] = lineToNumbers(from, ',').map(Math.abs);

  return values(Direction).find(candidate => {
    const [moveLine, moveCol] = lineToNumbers(candidate, ',');
    if (Math.abs(moveLine) === fromLine) {
      return false;
    }
    return line + moveLine >= 0 && tubes[line + moveLine][col + moveCol] !== ' ';
  }) as Direction | undefined;
};

export const main = (input: string) => {
  const lines = splitLines(input);
  const letters: string[] = [];
  let pos: Pair<number> = [0, 0], dir: Direction | undefined = Direction.right;

  do {
    const [line, col] = walkToNextCorner(lines, pos, dir, letters);
    const nextDir = turn(lines, [line, col], dir);
    if (nextDir) {
      const [moveLine, moveCol] = lineToNumbers(nextDir, ',');
      pos = [line + moveLine, col + moveCol];
    }
    dir = nextDir
  } while (dir !== undefined);
  return letters.join('');
};

if (require.main === module) runWithStdIn(main);
