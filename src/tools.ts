export const lines = (s: string) => s.split(/[\n\r]/).map(line => line.trim()).filter(line => line.length > 0);

export const numbers = (s: string, delim: string | RegExp = '') => s.split(delim).map(c => parseInt(c, 10));