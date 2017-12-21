import {runWithStdIn, splitLines} from './tools';
import {range, uniq} from 'lodash';

export type Rules = {[key: string]: string[]};
export type Lines = ReadonlyArray<string>;

export const expandRule = (input: string, rule: string): Rules => {
  const repl = rule.split('/');
  const [a,b,c,d,e,f,g,h,i] = input.replace(/\//g, '').split('');
  const transformations = uniq(
    e === undefined ?
    [
      `${a}${b}${c}${d}`, `${a}${c}${b}${d}`,
      `${b}${a}${d}${c}`, `${b}${d}${a}${c}`,
      `${c}${d}${a}${b}`, `${c}${a}${d}${b}`,
      `${d}${c}${b}${a}`, `${d}${b}${c}${a}`,
    ] :
    [
      `${a}${b}${c}${d}${e}${f}${g}${h}${i}`, `${a}${d}${g}${b}${e}${h}${c}${f}${i}`,
      `${c}${b}${a}${f}${e}${d}${i}${h}${g}`, `${c}${f}${i}${b}${e}${h}${a}${d}${g}`,
      `${g}${d}${a}${h}${e}${b}${i}${f}${c}`, `${g}${h}${i}${d}${e}${f}${a}${b}${c}`,
      `${i}${h}${g}${f}${e}${d}${c}${b}${a}`, `${i}${f}${c}${h}${e}${b}${g}${d}${a}`,
    ]
  );
  return transformations.reduce((res, it) => ({...res, [it]: repl}), {});
};

export const readRules = (lines: Lines): Rules => {
  return lines.reduce(
    (rules, line) => {
      const [rule, repl] = line.split(' => ');
      return {...rules, ...expandRule(rule, repl)}
    },
    {}
  )
};

export const enhanceBlocks = (blocks: Lines, rules: Rules): ReadonlyArray<Lines> => blocks.map(block => rules[block]);

export const splitBlocks = (input: Lines): Lines => {
  const blockSize = input.length % 2 === 0 ? 2 : 3;
  const blockIter = input.length / blockSize;
  const result: string[] = [];
  range(0, blockIter).forEach(
    bloclLineIndex => {
      const lineIndex = bloclLineIndex * blockSize;
      let blockIndex = 0;
      while (blockIndex < input.length) {
        result.push(
          input[lineIndex].substr(blockIndex, blockSize) +
          input[lineIndex + 1].substr(blockIndex, blockSize) +
          (blockSize === 3 ? input[lineIndex + 2].substr(blockIndex, blockSize) : '')
        );
        blockIndex += blockSize;
      }
    }
  );
  return result;
};

export const enhance = (drawing: Lines, rules: Rules)/*: Lines*/ => {
  const blocks = splitBlocks(drawing);
  const enhanced = enhanceBlocks(blocks, rules);
  if (enhanced.length === 1) {
    return enhanced[0];
  }
  const blocksPerLine = Math.sqrt(enhanced.length);
  const result: string[] = [];
  let lineIndex = 0;
  while (lineIndex < enhanced.length) {
    const lineParts = enhanced.slice(lineIndex, lineIndex + blocksPerLine);
    lineParts[0].forEach((a,i) => result.push(lineParts.map(block => block[i]).join('')));
    lineIndex += blocksPerLine;
  }
  return result;
};

export const START: Lines = ['.#.', '..#', '###'];

export const countOn = (drawing: Lines): number => drawing.join('').split('#').length - 1;

export const main = (input: string) => {
  const lines = splitLines(input);
  const rules = readRules(lines);
  const enhancer = (prev: Lines) => {
    const enhanced = enhance(prev, rules);
    // console.log(enhanced.join('\n'), '\n---\n');
    return enhanced;
  };

  const fifth = range(0,5).reduce(enhancer, START);
  const eighteenth = range(5,18).reduce(enhancer, fifth);

  return [countOn(fifth), countOn(eighteenth)];
};

if (require.main === module) runWithStdIn(main);
