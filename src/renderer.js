(function() {
  'use strict';

  var fs = require('fs'),
    glob = require('glob'),
    phantom = require("phantom");

  module.exports = {
    do : function(callback) {
      console.log("Loading PhantomJS || Please wait || ...      ");
      glob("./export/blocks/*.html", {}, function(er, files) {
        //  var pace = require('awesome-progress')({total: files.length, finishMessage: "Message split"});
         var promises = files.map(function(file, i) {
          return phantom.create().then(function(ph) {
            return ph.createPage().then(function(page) {
              var fileNumber = i + 1;
              return page.open("./export/blocks/block-" + fileNumber + ".html").then(function(status) {
                page.property('viewportSize', { width: 600, height: 20 });
                page.render("./export/images/image-" + fileNumber + ".png", {
                  format: 'png',
                  quality: '100'
                });
                // pace.op();
                page.close();
                ph.exit();
              });
            });
          });
        });

        console.log('promises', promises);

        Promise.all(promises).then(function (results) {
          console.log('results', results);
          setTimeout(function(){ callback(); }, 3000);

        });
      });
    }

  }
})();
