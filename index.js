#! /usr/bin/env node

(function() {
	'use strict';
	var exec = require('child_process').exec;
	var async = require('async');
	var express = require("express");
	var multer = require('multer');
	var mime = require('mime');
	var jade = require('jade');
	var errors = false;
	var className = '.backgroundTable';
	var app = express();
	var storage = multer.diskStorage({
		destination: function(req, file, callback) {
			callback(null, './import');
		},
		filename: function(req, file, callback) {
			callback(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
		}
	});
	var upload = multer({
		storage: storage
	}).single('userHTML');
	app.set('view engine', 'jade');
	app.get('/', function(req, res) {
		res.render('index', {
			status: 'waiting for file'
		});
	});
	app.use(express.static(__dirname + '/public'));
	app.post('/api/upload', function(req, res) {
		upload(req, res, function(err) {
			if (err) {
				return res.end("Error uploading file");
			}
			var clean = require('./src/clean');
			var splitter = require('./src/splitter');
			var renderer = require('./src/renderer');
			var validate = require('./src/validate');
			var zip = require('./src/zip');
			var fileName = req.file.path;
			var fileNameShort = req.file.originalname;
      clean.do('./download/*.zip');
			clean.do('./export/images/*.png');
			clean.do('./export/blocks/*.html');
			validate.checkFile(fileName);
			validate.checkClass(fileName, className);
			splitter.do(fileName, className);
			renderer.do(function() {
        var uploadStatus = {
          message: '',
          uploadID: ''
        }
        uploadStatus.message = fileNameShort;
        uploadStatus.uploadID = Date.now() / 1000 | 0;

        res.send(uploadStatus);
        zip.zipFile('./export', './download/' + fileNameShort + '.zip');
        app.use('/api/download/'+ uploadStatus.uploadID, function(req, res) {
          res.download('./download/' + fileNameShort + '.zip');
          clean.do('./import/*.html');
        });

				res.end("File ready to download");
				console.log('finished');
			});
		});
	});

	app.listen(3000, function() {
		console.log("Working on port 3000");
	});
})();
