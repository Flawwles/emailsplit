# emailsplit
Take a full email template split and screenshot it



## Development

1. Run `npm install` to install dependencies

2. You need PhantomJS installed `npm install -g phantomjs`

3. Run `npm link` to add `emailsplit` as a global command


## Usage

1. CD into the folder container the HTML file you wish to split

2. Run the command `emailsplit <HTML FILENAME> <CLASSNAME>`

3. A new folder called export will be created containing the HTML and PNG files
with the contents of each element with the class inputted

