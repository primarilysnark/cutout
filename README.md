# Cut-out
Cut-out is a JavaScript testing utility for [RequireJS](https://github.com/requirejs/requirejs) that makes it easier to mock and test your AMD modules. Cut-out's API is meant to be intuitive by mimicking RequireJS's API for configuration and module loading.

Cut-out is unopinionated regarding which test runner or mocking library you use, and should be compatible with all major test runners and mocking libraries out there. The documentation and examples for cutout use [mocha](https://mochajs.org/) and [testdouble.js](https://github.com/testdouble/testdouble.js), but you should be able to extrapolate to your framework of choice.

## Installation

To get started with cut-out, you can simply install it with npm:

```bash
npm i --save-dev cut-out
```

## Usage
Cut-out matches RequireJS's API for configuration and module loading and can be used as a drop-in replacement.

To configure cut-out, simply call `cutout.config` with a configuration object, i.e.

```JavaScript
cutout.config({
  baseUrl: './src',
  paths: {
    '_': 'lib/lodash'
  }
});
```

To load a module, call `cutout` with an array of modules and a callback function, i.e.

```JavaScript
cutout(['some/module'], function (module) {
  // Work with example module
});
```

Cut-out adds two new methods to RequireJS's API: `mock` and `reset`: `mock` is used to replace a module with a mocked version while `reset` clears all existing mocks.

To mock a dependency, simply call `cutout.mock` with a dictionary of modules to their mocks, i.e.

```JavaScript
const dependencyMock;

cutout.mock({
  'some/dependency': dependencyMock
});
```

To clear all existing mocks and return cut-out to an unmocked state, call `cutout.reset` with no arguments, i.e.

```JavaScript
cutout.reset();
```

## Example
```JavaScript
const cutout = require('cut-out');
const expect = require('expect');
const td = require('testdouble');

describe('Module', function () {
  let dependency;
  let subject;

  before(function () {
    dependency = td.function();
    
    cutout.mock({
      'some/dependency': dependency
    });
  });
  
  beforEach(function (done) {
    cutout(['some/module'], function (module) {
      subject = module;
      done();
    });
  });
  
  afterEach(function () {
    td.reset();
  });
  
  after(function () {
    cutout.reset();
  });
  
  it('should test the module', function () {
    td.when(dependency()).thenReturn(true);
    
    expect(subject).toBe(true);
  });
});