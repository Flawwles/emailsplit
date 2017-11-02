(function() {
	'use strict';
	const puppeteer = require('puppeteer');
	var fs = require('fs'),
		glob = require('glob'),
		// phantom = require("phantom"),
		getJSON = require('./getJSON'),
		logFile = {};
	module.exports = {
		do: function(callback) {
			glob("./export/blocks/*.html", {}, function(er, files) {
				(async () => {
					const browser = await puppeteer.launch({headless: true});

					const page = await browser.newPage();
          page._emulationManager._client.send(
            'Emulation.setDefaultBackgroundColorOverride',
            { color: { r: 0, g: 0, b: 0, a: 0 } }
          );




          var customSort = function (a, b) {
            return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])));
          }

          const sortedFiles = files.sort(customSort);
          for (let i=0; i < sortedFiles.length; i++) {
            let file = sortedFiles[i];
            var fullPath = __dirname;
  					const customPath = fullPath.substring(0, fullPath.length - 3);
  					const customFile = file.substring(2);
            let customNumber = i + 1;
  					let fileToOpen = "file://" + customPath + customFile;
            console.log(fileToOpen);
            await page.goto(fileToOpen);

            async function screenshotDOMElement(selector, padding = 0) {
            const rect = await page.evaluate(selector => {
              const element = document.querySelector(selector);
              const {x, y, width, height} = element.getBoundingClientRect();
              return {left: x, top: y, width, height, id: element.id};
            }, selector);

            return await page.screenshot({
              path: "./export/images/image-" + customNumber + ".png",
              clip: {
                x: rect.left - padding,
                y: rect.top - padding,
                width: rect.width + padding * 2,
                height: rect.height + padding * 2
              }
            });
          }

          await screenshotDOMElement('.backgroundTable', 16);

            // await page.screenshot(
            //   {path: "./export/images/image-" + customNumber + ".png"},
            //   {omitBackground: true}
            // );
          }

					await browser.close();
          await logData(files.length)
          await callback();
				})();

				function logData(data) {
					logFile = getJSON.get();
					logFile.data.push(data)
					getJSON.set(logFile);
					callback();
				}
			});
		}
	}
})();
