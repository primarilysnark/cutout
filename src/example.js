define(['./dependency'], function (dependency) {
  return {
    contains: function (string, search) {
      return dependency.search(string, search).length !== 0;
    }
  };
});
