/*
* Example Node CLI Usage
* node apply-to-json.mjs --input=data.json --key="scripts.wave" --value="echo 'hello world'" --output=new-data.json
*/
import fs from 'fs/promises';

const args = process.argv.slice(2);

const options = Object.fromEntries(args.map((arg) => {
  const [key, value] = arg.split('=');
  return [key, value];
}));

// read and parse the input file
const inputFile = await fs.readFile(options['--input'], 'utf-8');
const data = JSON.parse(inputFile);

// apply the value to the key, using dot notation
const [key, ...rest] = options['--key'].split('.');
const value = options['--value'];
const result = rest.reduce((acc, key) => {
  if (!acc[key]) {
    acc[key] = {};
  }
  return acc[key]
}, data);
result[key] = value;

// write the file to disk as JSON at the path specified by the --output option
const outputFile = options['--output'];
await fs.writeFile(outputFile, JSON.stringify(data, null, 2));
