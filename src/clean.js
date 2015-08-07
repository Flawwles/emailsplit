var fs = require('fs'),
  glob = require("glob");

module.exports = {
  do : function(path, callback) {
    glob(path, {}, function(er, files) {
      for (i = 0; i < files.length; i++) {
        fs.unlink(files[i], function(err) {
          if (err) throw err;
          console.log('Deleted file  ' + files[i]);
        });
      }
    });
  }
};
