var cheerio = require('cheerio'),
  fs = require('fs'),
  glob = require("glob"),
  phantom = require("phantom");
var RenderUrlsToFile, arrayOfUrls, system;
fs.readFile('live.html', 'utf8', htmlToSplit);

function htmlToSplit(err, data) {
    $ = cheerio.load(' ' + data + ' ');
    $('.backgroundTable').each(function(i, elem) {
      var fileNumber = i + 1, // Start saving from 1 rather than 0
        fileName = "./export/blocks/block-" + fileNumber + '.html',
        content = $.html(elem);
      // Save files
      fs.writeFile(fileName, content, function(err) {
        console.log('Written html to ' + fileName);
      });
    });
  }
  // Count files
glob("./export/blocks/*.html", {}, function(er, files) {
  //console.log(files.length)
  for (i = 0; i < files.length; i++) {
    phantom.create(function(ph) {
      ph.createPage(function(page) {
        page.open("./export/blocks/block-" + i + ".html", function(status) {
          //Set viewport size
          page.viewportSize = {
            width: 1920,
            height: 1080
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
  }
});
//Phantom
//Get files name
getFilename = function() {
  return "image-" + ".png";
}; // Add numbers later
