const requirejs = require('requirejs');
require('should');

requirejs.config({
  baseUrl: './src'
});

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
      subject.contains('searching for 1234', /\d+/).should.equal(true);
    });

    it('should return false if no match found', function () {
      subject.contains('searching for numbers', /\d+/).should.equal(false);
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
      subject.search('searching for 1234', /\d+/).should.equal('1234');
    });

    it('should return an empty string if no text found', function () {
      subject.search('searching for numbers', /\d+/).should.equal('');
    });
  });
});
