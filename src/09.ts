import {runWithStdIn} from './tools';

export function removeGarbage(input: string): string {
  return input.replace(/!./g, '').replace(/<.*?>/g, '');
}

export function countGroups(input: string): number {
  const match = input.match(new RegExp('{', 'g'));
  // console.log(JSON.stringify(match));
  return match ? match.length : 0;
}

type GroupScore = {
  // data: string;
  level: number;
  total: number;
};

export function scoreGroups(input: string): number {

  return input.split('').reduce<GroupScore>(
    ({level, total}, char) => {
      switch (char) {
        case '{':
          return {level: level+1, total: total+level};
        case '}':
          return {level: level-1, total};
        default:
          return {level, total};
      }
    },
    {level: 1, total: 0}
  ).total;
}

export const main = (input: string) => {
  return scoreGroups(removeGarbage(input));
};

if (require.main === module) runWithStdIn(main);
