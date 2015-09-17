(function() {
  'use strict';

  var fs = require('fs'),
    glob = require('glob'),
    phantom = require("phantom");

  module.exports = {
    do : function() {
      glob("./export/blocks/*.html", {}, function(er, files) {
        (function rednerLoop(i) {
          setTimeout(function() {
            phantom.create(function(ph) {
              ph.createPage(function(page) {
                var fileNumber = i + 1;
                page.open("./export/blocks/block-" + fileNumber + ".html", function(status) {
                  page.set('viewportSize', { width: 1000, height: 20 });
                  page.render("./export/images/image-" + fileNumber + ".png", {
                    format: 'png',
                    quality: '100'
                  });
                  console.log("File saved as image-" + fileNumber)
                  ph.exit();
                });
              });
            });
            if (--i) rednerLoop(i);
          }, 1000)
        })(files.length);
      });
    }
  };
})();
