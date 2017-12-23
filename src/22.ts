import {Lines} from './21';
import {lineToNumbers, Pair, runWithStdIn, splitLines} from './tools';

export enum Direction {up = '0,-1', left = '-1,0', down = '0,1', right = '1,0'}

export type DirectionKey = keyof typeof Direction;
export const TURN_LEFT: ReadonlyArray<Direction> = [Direction.up, Direction.left, Direction.down, Direction.right];

export const turn = (from: Direction, left: boolean): Direction => {
  const current = TURN_LEFT.indexOf(from);
  const next = left ?
    (current + 1) % TURN_LEFT.length :
    current > 0 ? current - 1 : TURN_LEFT.length - 1;
  return TURN_LEFT[next];
};

export const doStep = (dir: Direction, line: number, col: number): Pair<number> => {
  const [ml, mc] = lineToNumbers(dir, ',');
  return [line + ml, col + mc];
};

export type Grid = Readonly<{ [key: string]: boolean }>;

export type Infection = {
  grid: Grid;
  direction: Direction;
  position: Pair<number>;
}

export const burst = ({position, direction, grid}: Infection): Infection => {
  const [x, y] = position;
  const pos$ = position.join(',');
  const isInfected = grid[pos$];
  const nextDirection = turn(direction, !isInfected);
  const nextPosition = doStep(nextDirection, x, y);
  return {
    direction: nextDirection,
    position: nextPosition,
    grid: {
      ...grid,
      [pos$]: !isInfected
    }
  };
};

export const parseGrid = (lines: Lines): Grid => {
  const translate = Math.floor(lines.length/2);
  const result: any = {};
  lines.forEach((line, li) => {
    line.split('').forEach((c, ci) => {
      if (c === '#') {
        result[`${ci - translate},${li - translate}`] = true;
      }
      if (c === '=') {
        result[`${ci - translate},${li - translate}`] = false;
      }
    });
  });
  return result;
};

// export const get = (tubes: ReadonlyArray<string>, [line, col]: Pair<number>) =>
//   line >= 0 && line < tubes.length && col >= 0 && col < tubes[line].length ? tubes[line][col] : VOID;


export const countInfectingBursts = (initial: Grid, iterations: number): number => {
  let i = 0;
  let infection: Infection = {
    grid: initial, direction: Direction.up, position: [0,0]
  };
  let infecting = 0;
  while (i < iterations) {
    const currentPos = infection.position.join(',');
    const wasInfected = infection.grid[currentPos];
    infection = burst(infection);
    if (!wasInfected && infection.grid[currentPos]) {
      infecting++;
    }
    i++;
  }
  return infecting;
};

export const main = (input: string) => {
  const initial = parseGrid(splitLines(input));

  return countInfectingBursts(initial, 10000);
};

if (require.main === module) runWithStdIn(main);
