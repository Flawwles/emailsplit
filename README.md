# Emailsplit
HTML (email) file, split into chunks around the `table` with the class of `backgroundTable` each block saved as a new HTML file and a screenshot of each generated

![emailsplit](/split-script-low.gif)


## Development

1. First run `npm install` to install dependencies

2. Run `npm start` to start the server - Which opens on port `3000` by default (try removed `process.env.PORT` in app.listen if server doesn't run locally)


## Usage

1. Drag a HTML file onto the page

2. Make sure it has the class of `backgroundTable` on the outer block that you want to split at

3. Wait for the script to process then a zip file will download

## Notes

I'm not a dev, this is my first node project so I'm sure there are bugs.

The output folder gives you a file named `block-$` and `image-$`

Images are cropped to 600px as this is the size I needed them but you can change this in the `src/renderer.js` file
