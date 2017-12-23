import {Lines} from './21';
import {lineToNumbers, Pair, runWithStdIn, splitLines} from './tools';

export enum Direction {up = '0,-1', left = '-1,0', down = '0,1', right = '1,0'}

export type DirectionKey = keyof typeof Direction;
export const TURN_LEFT: ReadonlyArray<Direction> = [Direction.up, Direction.left, Direction.down, Direction.right];
export const INFECTED = '#';
export const CLEAN = '.';
export const V1 = [CLEAN, INFECTED];
export const WEAK = 'weak';
export const FLAGGED = 'flagged';
export const V2 = [CLEAN, WEAK, INFECTED, FLAGGED];

export const turn = (from: Direction, mode: string): Direction => {
  const current = TURN_LEFT.indexOf(from);
  let next: number = 0;
  switch (mode) {
    case CLEAN:
      next = (current + 1) % TURN_LEFT.length;
      break;
    case WEAK:
      next = current;
      break;
    case INFECTED:
      next = current > 0 ? current - 1 : TURN_LEFT.length - 1;
      break;
    case FLAGGED:
      next = (current + 2) % TURN_LEFT.length;
      break;
  }
  return TURN_LEFT[next];
};

export const doStep = (dir: Direction, line: number, col: number): Pair<number> => {
  const [ml, mc] = lineToNumbers(dir, ',');
  return [line + ml, col + mc];
};


export type Grid = {
  [key: string]: string;
};

export type Infection = {
  grid: Grid;
  direction: Direction;
  position: Pair<number>;
}

export const burst = ({position, direction, grid}: Infection, modes: ReadonlyArray<string>): Infection => {
  const [x, y] = position;
  const pos$ = position.join(',');
  const mode = grid[pos$] || CLEAN;
  const nextDirection = turn(direction, mode);
  const nextPosition = doStep(nextDirection, x, y);
  grid[pos$] = modes[(modes.indexOf(mode) + 1) % modes.length];
  return {
    direction: nextDirection,
    position: nextPosition,
    grid
  };
};

export const parseGrid = (lines: Lines): Grid => {
  const translate = Math.floor(lines.length/2);
  const result: any = {};
  lines.forEach((line, li) => {
    line.split('').forEach((c, ci) => {
      if (c === '#') {
        result[`${ci - translate},${li - translate}`] = INFECTED;
      }
      if (c === '=') {
        result[`${ci - translate},${li - translate}`] = CLEAN;
      }
      if (c === 'W') {
        result[`${ci - translate},${li - translate}`] = WEAK;
      }
    });
  });
  return result;
};

export const countInfectingBursts = (initial: Grid, modes: Lines, iterations: number): number => {
  let i = 0;
  let infection: Infection = {
    grid: JSON.parse(JSON.stringify(initial)), direction: Direction.up, position: [0,0]
  };
  let infecting = 0;
  while (i < iterations) {
    const currentPos = infection.position.join(',');
    infection = burst(infection, modes);
    if (infection.grid[currentPos] === INFECTED) {
      infecting++;
    }
    i++;
  }
  return infecting;
};

export const main = (input: string) => {
  const initial = parseGrid(splitLines(input));

  return countInfectingBursts(initial, V2, 10000000);
};

if (require.main === module) runWithStdIn(main);
