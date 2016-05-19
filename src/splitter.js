(function() {
  'use strict';
  var fs = require('fs');
  var cheerio = require('cheerio');
  module.exports = {
    do : function(fileName, className, callback) {
      fs.readFile(fileName, function(err, content) {
        if (!err) {
          return this.split(content, className, callback);
        }
      }.bind(this));
    },
    split: function(content, className /*, callback*/ ) {
      var self = this;
      var $ = cheerio.load(content);
      $(className).each(function(index, el) {
        var indexPlus = index + 1;
        var fileName = './export/blocks/block-' + indexPlus + '.html';
        var content = $.html(el);
        self.saveToFile(fileName, content, function( /*err*/ ) {
          process.stdout.write('Written html to ' + fileName + '\r');
        });
      });
    },
    saveToFile: function(dest, content, callback) {
      fs.writeFile(dest, content, callback);
    }
  }
})();
