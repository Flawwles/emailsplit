var splitter = require('./src/splitter');
var clean = require('./src/clean');
var rednerer = require('./src/renderer');

clean.do('./export/blocks/*.html');
clean.do('./export/images/*.png');
splitter.do('live.html', function() {});
rednerer.do();


