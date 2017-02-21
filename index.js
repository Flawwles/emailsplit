#! /usr/bin/env node

(function() {
  'use strict';
  var exec = require('child_process').exec;
  var async = require('async');
  var express	=	require("express");
  var multer	=	require('multer');
  var mime	=	require('mime');
  var errors = false;
  var args = [].concat(process.argv);
  var program = args.splice(0, 1)[0];
  var directory = args.splice(0, 1)[0];
  var fileName = "live.html";
  var className = '.backgroundTable';


  var app	=	express();

  var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './import');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
    }
  });
  var upload = multer({ storage : storage}).single('userHTML');

  app.get('/',function(req,res){
        res.sendFile(__dirname + "/public/html/index.html");
  });

  app.post('/api/upload',function(req, res){
  	upload(req,res,function(err) {
  		if(err) {
  			return res.end("Error uploading file");
  		}
        var clean = require('./src/clean');
        var splitter = require('./src/splitter');
        var renderer = require('./src/renderer');
        var validate = require('./src/validate');
        res.write("File is uploaded");
        fileName = req.file.path;

        clean.do('./export/images/*.png');
        clean.do('./export/blocks/*.html');

        validate.checkFile(fileName);
        validate.checkClass(fileName, className);
        splitter.do(fileName, className);

        renderer.do(function () {
          console.log('finished');
        });

        // async.series([
        //   function(callback) {
        //    validate.checkFile(fileName);
        //    validate.checkClass(fileName, className);
        //    console.log("1");
        //    callback();
        //
        //   },
        //   function(callback) {
        //     clean.do('./export/blocks/*.html');
        //     clean.do('./export/images/*.png');
        //     console.log("2");
        //     callback();
        //   },
        //   function(callback) {
        //     splitter.do(fileName, className, function() {});
        //     console.log("3");
        //     callback();
        //   },
        //   // function(callback) {
        //   //   setTimeout(function() {
        //   //      renderer.do();
        //   //
        //   //   }, 200);  //Add delay to stop phantomJS from running too early
        //   //
        //   // },
        // ], function(err, results) {
        //   console.log('err', err);
        //   console.log('results', results);
        // });


  	});
  });

  app.listen(3000,function(){
      console.log("Working on port 3000");
  });


})();
