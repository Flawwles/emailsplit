(function() {
  'use strict';

  var fs = require('fs'),
    glob = require('glob'),
    phantom = require("phantom");

  module.exports = {
    do : function() {
      console.log("Runing")
      glob("./export/blocks/*.html", {}, function(er, files) {
        (function myLoop(i) {
          setTimeout(function() {
            //
            phantom.create(function(ph) {
              ph.createPage(function(page) {
                page.open("./export/blocks/block-" + i + ".html", function(status) {
                  page.viewportSize = {
                    width: 480,
                    height: 800
                  };
                  page.render("./export/images/block-" + i + ".png", {
                    format: 'png',
                    quality: '100'
                  });
                  console.log("File saved as block-" + i)
                  ph.exit();
                });
              });
            });
            //
            if (--i) myLoop(i); //  decrement i and call myLoop again if i > 0
          }, 1000)
        })(files.length); //  pass the number of iterations as an argument
      });
    }
  };
})();
