(function() {
  'use strict';

  var fs = require('fs'),
    glob = require('glob'),
    phantom = require("phantom");


  module.exports = {
    do : function() {
      console.log("Loading PhantomJS || Please wait || ...      ");
      glob("./export/blocks/*.html", {}, function(er, files) {
         var pace = require('pace')(files.length);
         files.forEach(function(file, i){
          phantom.create().then(function(ph) {
              ph.createPage().then(function(page) {
                var fileNumber = i + 1;
                page.open("./export/blocks/block-" + fileNumber + ".html").then(function(status) {
                  page.property('viewportSize', { width: 600, height: 20 });
                  page.render("./export/images/image-" + fileNumber + ".png", {
                    format: 'png',
                    quality: '100'
                  });
                  // process.stdout.write("Capturing file " + file + "\r");
                  // console.log("file", files.length)
                  pace.op();
                  ph.exit();
                });
              });
            });
        });
      });
    }
  };
})();
