(function() {
  'use strict';
  var fs = require('fs');
  var cheerio = require('cheerio');
  module.exports = {
     checkFile: function(file, className) {
      fs.readFileSync(file);
      console.log('checkFile');
    },
    checkClass : function(fileName, className) {
      fs.readFileSync(fileName);
      console.log('checkClass');
    }
  }
})();
