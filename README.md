# emailsplit
Input a HTML email that has multiple tables holding smaller sections - The script
will take each table and all the HTML within and create a new HTML file for each block.
Every block will then be processed to have a screenshot taken, making it easier to
add to a template sorter.

![emailsplit](http://matt-evans.co.uk/wp-content/uploads/2016/12/emailsplit.gif)

## Development

1. Run `npm install` to install dependencies

2. You need PhantomJS installed `npm install -g phantomjs` || Currently working with PhantomJS 2.1.1

3. Run `npm link` to add `emailsplit` as a global command


## Usage

1. CD into the folder container the HTML file you wish to split

2. Run the command `emailsplit <HTML FILENAME> <CLASSNAME>`

3. A new folder called export will be created containing the HTML and PNG files
with the contents of each element with the class inputted
