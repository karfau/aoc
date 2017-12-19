import {lineToNumbers, Pair, runWithStdIn, splitLines} from './tools';
import {values} from 'lodash';

export enum Direction {up = '-1,0', left = '0,-1', down = '1,0', right = '0,1'}

export enum Tubes {CORNER = '+', UP_DOWN = '|', LEFT_RIGHT = '-'}
export const TUBES: ReadonlyArray<string> = values(Tubes);

export function walkToNextCorner(
  tubes: ReadonlyArray<string>, [line, col]: Pair<number>, dir: Direction, letters: string[]
): Pair<number> {
  const [moveLine, moveCol] = lineToNumbers(dir, ',');
  do {
    const current = tubes[line][col];
    if (current === undefined || current === ' ') {
      // somehow we lost contact, let's not move forward but return the current position
      break;
    }
    if (TUBES.indexOf(current) === -1) {
      letters.push(current);
    }
    line += moveLine;
    col += moveCol;
  } while (tubes[line][col] !== Tubes.CORNER);
  return [line, col];
}

export const turn = (
  tubes: ReadonlyArray<string>, [line, col]: Pair<number>, from: Direction
): Direction | undefined => {
  const fromLine = Math.abs(lineToNumbers(from, ',')[0]);

  return values<Direction>(Direction as any).find(candidate => {
    const [moveLine, moveCol] = lineToNumbers(candidate, ',');
    if (Math.abs(moveLine) === fromLine) {
      return false;
    }
    return line + moveLine >= 0 && tubes[line + moveLine][col + moveCol] !== ' ';
  });
};

export const main = (input: string) => {
  const tubes = splitLines(input);
  const letters: string[] = [];
  let steps = 0;
  let pos: Pair<number> = [0, tubes[0].indexOf(Tubes.UP_DOWN)];
  let dir: Direction | undefined = Direction.down;

  do {
    const [lineBefore, colBefore] = pos;
    const nextCorner = walkToNextCorner(tubes, pos, dir, letters);
    const [line, col] = nextCorner;
    steps += Math.abs(line - lineBefore) + Math.abs(col - colBefore);
    dir = turn(tubes, nextCorner, dir);
    pos = nextCorner;
  } while (dir !== undefined);
  return [letters.join(''), steps];
};

if (require.main === module) runWithStdIn(main);
