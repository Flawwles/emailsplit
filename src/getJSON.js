(function() {
  'use strict';
  var fs = require('fs');

  module.exports = {
     get: function() {
     return JSON.parse(fs.readFileSync('./public/logs/log.json', 'utf8'));
    },
    set: function(content) {
      fs.writeFileSync('./public/logs/log.json', JSON.stringify(content));
      console.log("SET");
    }
  }
})();
