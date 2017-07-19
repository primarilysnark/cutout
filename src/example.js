define(['./dependency', './query'], function (dependency, query) {
  return {
    contains: function (string, search) {
      return dependency.search(string, search).length !== 0;
    },
    query: function (string, search) {
      return query.search(string, search).length;
    }
  };
});
