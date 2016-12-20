#! /usr/bin/env node

(function() {
  'use strict';
  var exec = require('child_process').exec;
  var async = require('async');
  var errors = false;
  var args = [].concat(process.argv);
  var program = args.splice(0, 1)[0];
  var directory = args.splice(0, 1)[0];
  var fileName = args.splice(0, 1)[0] || '';
  var className = '.'.concat(args.splice(0, 1)[0] || '');

  if (!fileName || className === '.') {
    console.log('\n  Usage: emailsplit <fileName> <className>\n');
  } else {
    //var validate =  require('./src/validate');
    var clean = require('./src/clean');
    var splitter = require('./src/splitter');
    var renderer = require('./src/renderer');
    var validate = require('./src/validate');

    // validate.do(fileName, className);

    async.series([

      function(callback) {
       validate.checkFile(fileName);
       validate.checkClass(fileName, className);
       callback(null, 1);
      },
      function(callback) {
        clean.do('./export/blocks/*.html');
        clean.do('./export/images/*.png');
        callback(null, 2);
      },
      function(callback) {
        splitter.do(fileName, className, function() {});
        callback(null, 3);
      },
      function(callback) {
        setTimeout(function() { renderer.do(); }, 200);
        //Add delay to stop phantomJS from running too early
        callback(null, 4);
      }
    ]);
  }
})();
