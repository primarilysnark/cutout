const requirejs = require('requirejs');
const expect = require('expect');

requirejs.config({
  baseUrl: './src'
});

describe('Tests without mocking', function () {
  describe('Example', function () {
    var subject;

    beforeEach(function (done) {
      requirejs(['example'], function (example) {
        subject = example;
        done();
      });
    });

    describe('#contains', function () {
      it('should return true if match found', function () {
        expect(subject.contains('searching for 1234', /\d+/)).toBe(true);
      });

      it('should return false if no match found', function () {
        expect(subject.contains('searching for numbers', /\d+/)).toBe(false);
      });
    });

    describe('#query', function () {
      it('should return the matching text if found', function () {
        expect(subject.query('searching for 1234', /\d+/)).toBe(4);
      });

      it('should return an empty string if no text found', function () {
        expect(subject.query('searching for numbers', /\d+/)).toBe(0);
      });
    });
  });

  describe('Dependency', function () {
    var subject;

    beforeEach(function (done) {
      requirejs(['dependency'], function (dependency) {
        subject = dependency;
        done();
      });
    });

    describe('#search', function () {
      it('should return the matching text if found', function () {
        expect(subject.search('searching for 1234', /\d+/)).toBe('1234');
      });

      it('should return an empty string if no text found', function () {
        expect(subject.search('searching for numbers', /\d+/)).toBe('');
      });
    });
  });
});
