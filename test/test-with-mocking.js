const td = require('testdouble');
const expect = require('expect');

const createSandbox = require('../lib/sandbox');

describe('Tests with mocking', function () {
  describe('Example', function () {
    var subject;
    var dependencyMock;

    before(function () {
      dependencyMock = td.object(['search']);
    });

    beforeEach(function (done) {
      var context = createSandbox({
        baseUrl: './src'
      }, {
        'dependency': dependencyMock
      });

      context(['example'], function (example) {
        subject = example;
        done();
      });
    });

    afterEach(function () {
      td.reset();
    });

    describe('#contains', function () {
      it('should return true if match found', function () {
        td.when(dependencyMock.search('searching for 1234', /\d+/)).thenReturn('1234');

        expect(subject.contains('searching for 1234', /\d+/)).toBe(true);
      });

      it('should return false if no match found', function () {
        td.when(dependencyMock.search('searching for numbers', /\d+/)).thenReturn('');

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
      var context = createSandbox({
        baseUrl: './src'
      });

      context(['dependency'], function (dependency) {
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
