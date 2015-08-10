(function() {
  'use strict';

  var fs = require('fs'),
    glob = require('glob'),
    phantom = require("phantom");

  module.exports = {
    do : function() {
      console.log("Runing")
      glob("./export/blocks/*.html", {}, function(er, files) {
        //console.log(files.length)

          phantom.create(function(ph) {
            ph.createPage(function(page) {
              page.open("./export/blocks/block-1.html", function(status) {
                page.viewportSize = {
                  width: 480,
                  height: 800
                };
                page.render("./export/images/block-1.png", {
                  format: 'png',
                  quality: '100'
                });

                console.log("File saved as block-1")
                ph.exit();
              });

            });
          });



      });
    }
  };
})();
