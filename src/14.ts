import {knotHash} from './10';
import {runWithStdIn, splitLines} from './tools';
import {range, uniq, values} from 'lodash'

export type Disk = ReadonlyArray<string>;

export const createDisk = (input: string): Disk =>
  range(0,128).map(n => knotHash(`${input}-${n}`, 2));

export const calculateUsed = (disk: Disk): number =>
  disk.join('').split('').filter(it => it === '1').length;

export const countRegions = (disk: Disk) => {
  let next = 1;
  const regions: {[coord: string]: number} = {};
  disk.forEach((row, rowi) => {
    row.split('').forEach((bit, i) => {
      if (bit === '1') {
        const right = regions[`${rowi},${i-1}`], above = regions[`${rowi-1},${i}`];
        if (right > 0) {
          if (above > 0 && above !== right) {
            // const amount = Object.keys(regions).filter(key => regions[key] === above).length;
            // const rmount = Object.keys(regions).filter(key => regions[key] === right).length;
            // console.log(`merging region ${above} (${amount}) into ${right} (${rmount})`);
            Object.keys(regions).forEach(
              key => regions[key] = (regions[key] === above) ? regions[key] = right : regions[key]
            );
          }
          regions[`${rowi},${i}`] = right;
        } else if (above > 0) {
          regions[`${rowi},${i}`] = above;
        } else {
          regions[`${rowi},${i}`] = next++;
        }
      }
    });
  });
  return uniq(values(regions)).length
};


export const main = (input: string) => {
  const line = splitLines(input)[0];
  const disk = createDisk(line);
  return [
    calculateUsed(disk),
    countRegions(disk),
  ];
};

if (require.main === module) runWithStdIn(main);
