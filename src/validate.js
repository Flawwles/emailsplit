(function() {
  'use strict';
  var fs = require('fs');
  var cheerio = require('cheerio');
  module.exports = {
     checkFile: function(file, className) {
      fs.readFile(file, function(err, file) {
        if (err) {
          console.log("\n File not found or can't be open \n");
          process.exit();
        }
      });
    },
    checkClass : function(fileName, className) {
      fs.readFile(fileName, function(err, content) {
        if (!err) {
          return this.openFile(content, className);
        } else {
          throw (err);
        }
      }.bind(this));
    },
    openFile: function(content, className) {
      var $ = cheerio.load(content);
      if (! $(className).length) {
        console.log("\n Error: Class " + className + " not found in file  \n");
        process.exit();
      }
    }
  }
})();
