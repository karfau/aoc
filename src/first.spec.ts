import {testable} from './first';

describe('suite', () => {
  it('should fail', () => {
    fail('expected');
  });

  it('should return input', () => {
    let input = {};
    expect(testable(input)).toBe(input);
  });
});
