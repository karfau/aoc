import {Lines} from './21';
import {lineToNumbers, Pair, runWithStdIn, splitLines} from './tools';

export enum Direction {up = '0,-1', left = '-1,0', down = '0,1', right = '1,0'}

export type DirectionKey = keyof typeof Direction;
export const TURN_LEFT: ReadonlyArray<Direction> = [Direction.up, Direction.left, Direction.down, Direction.right];
export const INFECTED = '#';
export const CLEAN = '';
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
  readonly [key: string]: string ;
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
  const nextMode = modes[(modes.indexOf(mode) + 1) % modes.length];
  return {
    direction: nextDirection,
    position: nextPosition,
    grid: {
      ...grid,
      [pos$]: nextMode
    }
  };
};

export const parseGrid = (lines: Lines, modes: ReadonlyArray<string>): Grid => {
  const translate = Math.floor(lines.length/2);
  const result: any = {};
  lines.forEach((line, li) => {
    line.split('').forEach((c, ci) => {
      if (modes === V1) {
        if (c === '#') {
          result[`${ci - translate},${li - translate}`] = INFECTED;
        }
        if (c === '=') {
          result[`${ci - translate},${li - translate}`] = CLEAN;
        }
      }
    });
  });
  return result;
};

// export const get = (tubes: ReadonlyArray<string>, [line, col]: Pair<number>) =>
//   line >= 0 && line < tubes.length && col >= 0 && col < tubes[line].length ? tubes[line][col] : VOID;


export const countInfectingBursts = (initial: Grid, modes: Lines, iterations: number): number => {
  let i = 0;
  let infection: Infection = {
    grid: initial, direction: Direction.up, position: [0,0]
  };
  let infecting = 0;
  while (i < iterations) {
    const currentPos = infection.position.join(',');
    const wasInfected = infection.grid[currentPos] === INFECTED;
    infection = burst(infection, modes);
    if (!wasInfected && infection.grid[currentPos] === INFECTED) {
      infecting++;
    }
    i++;
  }
  return infecting;
};

export const main = (input: string) => {
  const initial = parseGrid(splitLines(input), V1);

  return countInfectingBursts(initial, V1, 10000);
};

if (require.main === module) runWithStdIn(main);
