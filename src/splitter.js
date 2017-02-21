(function() {
  'use strict';
  var fs = require('fs');
  var cheerio = require('cheerio');
  module.exports = {
    do : function(fileName, className) {
      var content = fs.readFileSync(fileName);
      this.split(content, className);
    },
    split: function(content, className /*, callback*/ ) {
      var self = this;
      var $ = cheerio.load(content);
      $(className).each(function(index, el) {
        var indexPlus = index + 1;
        var fileName = './export/blocks/block-' + indexPlus + '.html';
        var content = $.html(el);
        self.saveToFile(fileName, content);
      });
    },
    saveToFile: function(dest, content) {
      fs.writeFileSync(dest, content);
    }
  }
})();
