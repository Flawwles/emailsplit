(function() {
  'use strict';

var fs = require('fs'),
  glob = require('glob');

module.exports = {
  do : function(path, callback) {
    glob(path, {}, function(er, files) {
      files.forEach(function(file){
        fs.unlink(file, function(err){
          if(err) throw err;
          process.stdout.write('Deleting ' + file + '\r');
        });
      });
    });
  }
};
})();
