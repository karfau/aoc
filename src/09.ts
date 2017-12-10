import {runWithStdIn} from './tools';

const CANCELED_CHARS = /!./g;
const GARBAGE = /<.*?>/;
const ALL_GARBAGE = new RegExp(GARBAGE.source, 'g');
const START_AND_END = 2;

export function removeGarbage(input: string): string {
  return input.replace(CANCELED_CHARS, '').replace(ALL_GARBAGE, '');
}

const reduceAndMeasureGarbage = (amount: number, current: string): number => {
  if (!GARBAGE.test(current)) {
    return amount
  }
  const next = current.replace(GARBAGE, '');
  const currentAmount = (current.length - next.length - START_AND_END);
  return reduceAndMeasureGarbage(amount + currentAmount, next)
};

export function measureGarbage(input: string): number {
  return reduceAndMeasureGarbage(0, input.replace(CANCELED_CHARS, ''));
}

type GroupScore = {
  level: number;
  total: number;
};

export function scoreGroups(input: string): number {
  return input.split('').reduce<GroupScore>(
    ({level, total}, char) => {
      switch (char) {
        case '{': return {level: level+1, total: total+level};
        case '}': return {level: level-1, total};
        default: return {level, total};
      }
    },
    {level: 1, total: 0}
  ).total;
}

export const main = (input: string) => {
  return [
    scoreGroups(removeGarbage(input)),
    measureGarbage(input)
  ];
};

if (require.main === module) runWithStdIn(main);
