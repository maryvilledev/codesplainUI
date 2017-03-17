import * as fs from 'fs';
import { rules, ignoredRules } from './src/util/rules.js';
import { rules as parserRules, finalizers } from './src/parsers/python3.min.js';

// Determines if rules is collapsed in parser
const isCollapsed = (rule) => {
  if (!parserRules[rule].finalizers) 
    return false;
  else
    return parserRules[rule].finalizers[0] === finalizers.collapse;
}

// Determines if rule is ignored by UI
const isIgnored = (rule) => {
  return !(ignoredRules.indexOf(rule) === -1);
}

// Add CSV "header"
let csvBody = 'RULE, COLLAPSED IN AST?, IGNORED BY UI?, PRETTY NAME, COLOR\n';

// Add CSV rows for each rule in the parser's `rules` object
Object.keys(parserRules)
  .forEach(rule => {
    const collapsed  = isCollapsed(rule) ? 'YES' : 'NO';
    const ignored    = isIgnored(rule) ? 'YES' : 'NO';
    const prettyName = rules[rule] ? rules[rule].prettyName : 'X';
    const color      = rules[rule] ? rules[rule].color : 'X';
    csvBody += `${rule},${collapsed},${ignored},${prettyName},${color}\n`;
  });

// Write the CSV file
console.log('Writing rule-csv/python-rules.csv file...');
fs.writeFile('rule-csv/python-rules.csv', csvBody, err => {
  if (err) return console.log(err);
  console.log('Done writing file!');
});