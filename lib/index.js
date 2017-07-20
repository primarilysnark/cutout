const requirejs = require('requirejs');
const uuid = require('uuid/v4');

let context;
let storedOptions;

function cutout(dependencies, callback) {
  if (!context) {
    throw new Error('Cutout context must be defined');
  }

  context(dependencies, callback);
}

cutout.config = function generateContext(options) {
  const sandboxIdentifier = uuid();
  storedOptions = options;

  context = requirejs.config(Object.assign({}, options, {
    context: 'context_' + sandboxIdentifier
  }));
};

cutout.mock = function generateContextWithMocks(mocks) {
  const sandboxIdentifier = uuid();
  const map = {};

  context = requirejs.config(Object.assign({}, storedOptions, {
    context: 'context_' + sandboxIdentifier
  }, !mocks ? {} : {
    map: {
      '*': Object.keys(mocks).reduce((map, key) => {
        const mockName = `mock_${key}_${sandboxIdentifier}`;
        const value = mocks[key];

        requirejs.define(mockName, function () {
          return value;
        });

        return Object.assign({}, map, {
          [key]: mockName
        });
      }, [])
    }
  }));
}

cutout.reset = function () {
  this.config(storedOptions);
}

module.exports = cutout;
