import {hasAnagrams, isValid, occurrences} from './04';

describe('day 4', function () {
  describe('isValid(occurences, ...)', function () {
    [
      'aa bb cc dd ee',
      'aa bb cc dd aaa',
    ].forEach(passphrase => {
      it(`"${passphrase}" should be valid`, function () {
        expect(isValid(occurrences, passphrase)).toBe(true);
      });
    });
    [
      'aa bb cc dd aa',
    ].forEach(passphrase => {
      it(`"${passphrase}" should not be valid`, function () {
        expect(isValid(occurrences, passphrase)).toBe(false);
      });
    });
  });

  describe('isValid(hasAnagrams, ...)', function () {
    [
      'abcde fghij',
      'a ab abc abd abf abj',
      'iiii oiii ooii oooi oooo',
    ].forEach(passphrase => {
      it(`"${passphrase}" should be valid`, function () {
        expect(isValid(hasAnagrams, passphrase)).toBe(true);
      });
    });
    [
      'abcde xyz ecdab',
      'oiii ioii iioi iiio',
    ].forEach(passphrase => {
      it(`"${passphrase}" should not be valid`, function () {
        expect(isValid(hasAnagrams, passphrase)).toBe(false);
      });
    });
  });
});
