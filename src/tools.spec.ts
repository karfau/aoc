import {splitLines, lineToNumbers} from './tools';

describe('lines()', () => {
  it('should return empty array for empty string', () => {
    expect(splitLines('')).toEqual([]);
  });

  it('should return the first line', function () {
    let s = 'single line';
    expect(splitLines(s)).toEqual([s]);
  });

  it('should return two lines for \\n', function () {
    let s = ['1st line', '2nd line'];
    expect(splitLines(s.join('\n'))).toEqual(s);
  });

  it('should return two lines for \\r', function () {
    let s = ['1st line', '2nd line'];
    expect(splitLines(s.join('\r'))).toEqual(s);
  });

  it('should return lines for combined line breaks', function () {
    let s = ['1st line\n\r2nd line\n\r3rd line'];
    expect(splitLines(s.join('\r'))).toEqual(['1st line','2nd line', '3rd line']);
  });

  it('should return trim lines', function () {
    let s = ['   1st line\t', '   ', '\t2nd line   '];
    expect(splitLines(s.join('\n'))).toEqual(['1st line','2nd line']);
  });
});

describe('numbers', function () {
  it('should return empty array for empty string', function () {
    expect(lineToNumbers('')).toEqual([])
  });

  it('should return digits with single parameter', function () {
    expect(lineToNumbers('123')).toEqual([1,2,3])
  });

  it('should return numbers with second parameter not in input', function () {
    expect(lineToNumbers('123', 'x')).toEqual([123])
  });

  it('should return numbers with second parameter in input', function () {
    expect(lineToNumbers('123 456\t789', /\s+/)).toEqual([123, 456, 789])
  });
});