#! /usr/bin/env node

(function() {
  'use strict';
  var exec = require('child_process').exec;
  var async = require('async');
  var express	=	require("express");
  var multer	=	require('multer');
  var mime	=	require('mime');
  var jade	=	require('jade');
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

  // app.get('/',function(req,res){
  //       res.sendFile(__dirname + "/public/html/index.html");
  // });

  // app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.get('/', function(req,res){
    res.render('index', {
        status: 'waiting for file'
      });

      
  });



  app.use(express.static(__dirname + '/public'));

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
          // res.end("File is uploaded");
          // res.download('import/userHTML-1487693187873.html');
          app.get('/', function(req,res){
            res.send('index', {
                status: 'All done'
              });
          });
        });



  	});
  });

  app.listen(3000,function(){
      console.log("Working on port 3000");
  });


})();
