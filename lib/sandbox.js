const requirejs = require('requirejs');
const uuid = require('uuid/v4');

module.exports = function createSandbox(config, mocks) {
  var sandboxIdentifier = uuid();
  var map = {};

  if (!mocks) {
    return requirejs.config(config);
  }

  return requirejs.config(Object.assign({}, config, {
    context: 'context_' + sandboxIdentifier,
    map: {
      '*': Object.keys(mocks).reduce((map, key) => {
        var mockName = `mock_${key}_${sandboxIdentifier}`;
        var value = mocks[key];

        requirejs.define(mockName, function () {
          return value;
        });

        return Object.assign({}, map, {
          [key]: mockName
        });
      }, [])
    }
  }));
};
