define(function () {
  return {
    search: function (string, search) {
      var match = string.match(search);

      if (!match) {
        return '';
      }

      return match[0];
    }
  }
});
