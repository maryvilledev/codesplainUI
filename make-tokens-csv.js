import * as fs from 'fs';
import { tokens } from './src/util/tokens.js';

let csvBody = 'Token Types, AST, Pretty Name, Color\n';
Object.keys(tokens)
  .forEach(token => {
    csvBody += `,,${tokens[token].prettyName},${tokens[token].color}\n`;
  });

console.log('Writing token.csv file...');
fs.writeFile('tokens.csv', csvBody, err => {
  if (err) return console.log(err);
  console.log('Done writing file!');
});
