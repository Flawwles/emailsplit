var fs = require('fs')
  , cheerio = require('cheerio');

var BACKGROUND_TABLE_CLASS = '.backgroundTable';

module.exports = {
  do: function(src, callback) {
    fs.readFile(src, function(err, content) {
      if (!err) return this.split(content, callback);
    }.bind(this));
  },

  split: function(content, callback) {
    //console.log(content, callback);
    $ = cheerio.load(content)
    , elements = $(BACKGROUND_TABLE_CLASS);

    $(BACKGROUND_TABLE_CLASS).each(function(index, el) {
      var fileSeq = index++
        , fileName = './export/blocks/block-' + fileSeq + '.html'
        , content = $.html(el);

      fs.writeFile(fileName, content, function(err) {
        console.log('Written html to ' + fileName);
      });
    });
  },
//
  saveToFile: function(dest, content, callback) {
    fs.writeFile(dest, content, callback);
  }
};
