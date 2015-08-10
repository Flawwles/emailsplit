#! /usr/bin/env node

(function () {
  'use strict';

  var exec = require('child_process').exec;

  var args = [].concat(process.argv);
  var program = args.splice(0, 1)[0];
  var directory = args.splice(0, 1)[0];
  var fileName = args.splice(0, 1)[0] || '';
  var className = '.'.concat(args.splice(0, 1)[0] || '');

  if (!fileName || className === '.') {
    console.log('\n  Usage: emailsplit <fileName> <className>\n');
  } else {
    var splitter = require('./src/splitter');
    var clean = require('./src/clean');
    var renderer = require('./src/renderer');

    clean.do('./export/blocks/*.html');
    clean.do('./export/images/*.png');
    splitter.do(fileName, className, function() {});
    renderer.do();

    exec('open export');
  }

})();
