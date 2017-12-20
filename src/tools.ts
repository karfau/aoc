export const splitLines = (s: string) => s.split(/[\n\r]/).filter(line => line.trim().length > 0);

export const lineToNumbers = (s: string, delim: string | RegExp = '') => s.split(delim).map(c => parseInt(c, 10));

export const runWithStdIn = (fun: (input: string) => any) => {
  require('get-stdin')().then(fun).then(console.log);
};

export type Pair<T> = [T, T]
export type Numbers = ReadonlyArray<number>;

