export const lines = (s: string) => s.split(/[\n\r]/).map(line => line.trim()).filter(line => line.length > 0);

export const numbers = (s: string, delim: string | RegExp = '') => s.split(delim).map(c => parseInt(c, 10));

export const run = (fun: (input: string) => any) => {
  require('get-stdin')().then(fun).then(console.log);
};
