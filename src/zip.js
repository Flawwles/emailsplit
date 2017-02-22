(function() {
  'use strict';
  var fs = require('fs');
  var zipper = require('zip-local');
  module.exports = {
     zipFile: function(file, des) {
      console.log("file", file);
      var buff = zipper.sync.zip(file).memory();
      zipper.sync.zip(file).compress().save(des);
    }
  }
})();
