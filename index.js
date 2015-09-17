#! /usr/bin/env node

(function() {
  'use strict';
  var exec = require('child_process').exec;
  var async = require('async');
  var args = [].concat(process.argv);
  var program = args.splice(0, 1)[0];
  var directory = args.splice(0, 1)[0];
  var fileName = args.splice(0, 1)[0] || '';
  var className = '.'.concat(args.splice(0, 1)[0] || '');
  if (!fileName || className === '.') {
    console.log('\n  Usage: emailsplit <fileName> <className>\n');
  } else {
    var clean = require('./src/clean');
    var splitter = require('./src/splitter');
    var renderer = require('./src/renderer');
    async.series([

      function(callback) {
        clean.do('./export/blocks/*.html');
        clean.do('./export/images/*.png');
        callback(null, 1);
      },
      function(callback) {
        splitter.do(fileName, className, function() {});
        callback(null, 2);
      },
      function(callback) {
        renderer.do();
        callback(null, 3);
      }
    ], function(error, results) {
      console.log(results);
    });
  }
})();
