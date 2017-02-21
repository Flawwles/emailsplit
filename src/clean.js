(function() {
  'use strict';

var fs = require('fs'),
  glob = require('glob');

module.exports = {
  do : function(path, callback) {
    glob(path, {}, function(er, files) {
      files.forEach(function(file){
        console.log('delete', file);
        fs.unlinkSync(file);
      });
    });
  }
};
})();
