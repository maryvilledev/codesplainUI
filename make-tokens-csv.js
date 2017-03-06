import * as fs from 'fs';
import { tokens } from './src/util/tokens.js';
import * as Python3 from './src/parsers/python3.js';

let csvBody = 'Token Types, AST, Pretty Name, Color\n';
Python3.tokens
  .forEach(token => {
    const prettyName = tokens[token] ? tokens[token].prettyName : 'X';
    const color      = tokens[token] ? tokens[token].color : 'X';
    csvBody += `${token},,${prettyName},${color}\n`;
  });

console.log('Writing token.csv file...');
fs.writeFile('tokens.csv', csvBody, err => {
  if (err) return console.log(err);
  console.log('Done writing file!');
});
