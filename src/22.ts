import {Lines} from './21';
import {lineToNumbers, Pair, runWithStdIn, splitLines} from './tools';
import {values} from 'lodash';

export enum Direction {up = '-1,0', left = '0,-1', down = '1,0', right = '0,1'}

export type DirectionKey = keyof typeof Direction;
export const TURN_LEFT: ReadonlyArray<Direction> = [Direction.up, Direction.left, Direction.down, Direction.right];

export type Grid = Readonly<{ [key: string]: boolean }>;

export const doStep = (dir: Direction, line: number, col: number): Pair<number> => {
  const [ml, mc] = lineToNumbers(dir, ',');
  return [line + ml, col + mc];
};

export const parseGrid = (lines: Lines): Grid => {
  const translate = Math.floor(lines.length/2);
  return lines
    .reduce((infected, line, li) => {
      line.split('').forEach((c, ci) => {
        if (c === '#') {
          infected.push(`${ci - translate},${li - translate}`);
        }
      });
      return infected;
    }, [] as string[])
    .reduce((grid, infected) => ({...grid, [infected]: true}), {});
};

// export const get = (tubes: ReadonlyArray<string>, [line, col]: Pair<number>) =>
//   line >= 0 && line < tubes.length && col >= 0 && col < tubes[line].length ? tubes[line][col] : VOID;

export const turn = (from: Direction, left: boolean): Direction => {
  const current = TURN_LEFT.indexOf(from);
  const next = left ?
    (current + 1) % TURN_LEFT.length :
    current === 0 ? TURN_LEFT.length - 1 : current - 1;
  return TURN_LEFT[next];
};

export const main = (input: string) => {
  // const tubes = splitLines(input);
  // const letters: string[] = [];
  // let steps = 1; // > (including the first line at the top of the diagram)
  // let pos: Pair<number> = [0, tubes[0].indexOf(Tubes.UP_DOWN)];
  // let dir: Direction | undefined = Direction.down;
  //
  // do {
  //   const nextCorner = walkToNextCorner(tubes, pos, dir, letters);
  //   dir = turn(tubes, nextCorner, dir);
  //
  //   const [lineBefore, colBefore] = pos; // keep old values before overwriting
  //   const [line, col] = nextCorner;
  //   steps += Math.abs(line - lineBefore) + Math.abs(col - colBefore);
  //
  //   pos = nextCorner;
  // } while (dir);
  return;// [letters.join(''), steps];
};

if (require.main === module) runWithStdIn(main);
