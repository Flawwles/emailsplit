(function() {
  'use strict';

var fs = require('fs'),
  glob = require('glob');

module.exports = {
  do : function(path, callback) {

    var files = glob.sync(path);

    files.forEach(function(file){
      console.log('delete', file);
      fs.unlinkSync(file);
    });

  }
};
})();
