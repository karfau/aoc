export const splitLines = (s: string) => s.split(/[\n\r]/).map(line => line.trim()).filter(line => line.length > 0);

export const lineToNumbers = (s: string, delim: string | RegExp = '') => s.split(delim).map(c => parseInt(c, 10));

export const runWithStdIn = (fun: (input: string) => any) => {
  require('get-stdin')().then(fun).then(console.log);
};
