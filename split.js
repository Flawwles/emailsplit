var cheerio = require('cheerio'),
    fs = require('fs');

fs.readFile('live.html', 'utf8', dataLoaded);

function dataLoaded(err, data) {
    $ = cheerio.load(' ' + data + ' ');
    $('.backgroundTable').each(function(i, elem) {
        var id = $(elem).attr('class'),
            filename = "./export/blocks/" + id + i + '.html',
            content = $.html(elem);
        fs.writeFile(filename, content, function(err) {
            console.log('Written html to ' + filename);
        });
    });
}

