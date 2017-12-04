import {isValid, occurrences} from './04';

describe.only('day 4', function () {
  describe('isValid()', function () {
    [
      'aa bb cc dd ee',
      'aa bb cc dd aaa',
    ].forEach(passphrase => {
      it(`${passphrase} should be valid`, function () {
        expect(isValid(occurrences, passphrase)).toBe(true);
      });
    });
    [
      'aa bb cc dd aa',
    ].forEach(passphrase => {
      it(`${passphrase} should not be valid`, function () {
        expect(isValid(occurrences, passphrase)).toBe(false);
      });
    });
  });

});
