(function () {
  'use strict';

  var fs = require('fs');
  var cheerio = require('cheerio');

  module.exports = {
    do: function(fileName, className, callback) {
      fs.readFile(fileName, function(err, content) {
        if (!err) {
          return this.split(content, className, callback);
        }
      }.bind(this));
    },

    split: function(content, className/*, callback*/) {
      var self = this;
      //console.log(content, callback);
      var $ = cheerio.load(content);

      $(className).each(function(index, el) {
        var fileSeq = index++;
        var fileName = './export/blocks/block-' + fileSeq + '.html';
        var content = $.html(el);

        self.saveToFile(fileName, content, function(/*err*/) {
          console.log('Written html to ' + fileName);
        });
      });
    },
  //
    saveToFile: function(dest, content, callback) {
      fs.writeFile(dest, content, callback);
    }
  };
})();
