import axios from 'axios';
import _ from 'lodash';
import { setRules, setIgnoredRules } from './codemirror-utils';

const API_URL = process.env.REACT_APP_API_URL;

const setAllRules = (allRules) => {
  const { rules, ignoredRules } = allRules;
  setRules(rules);
  setIgnoredRules(ignoredRules);
};
let store;
let currentLanguage = '';
const mappingCache = {};

// This will parse a csv into rows of columns
export const parseCSV = csv => csv.split('\n')
    .slice(1, -1)
    .map(row => row.split(','));

// Load csv and parse to rules and ignoredRules objects
const loadRules = async (language) => {
  const allRules = await axios.get(`${API_URL}/mappings/${language}`)
    .then((res) => {
      const csv = res.data;
      const rows = parseCSV(csv);
      const reducer = (map, row) => {
        map[row[0]] = {
          prettyName: row[2],
          color: row[3],
        };
        return map;
      };
      const rules = rows.filter(row => row[1] === '1')
        .reduce(reducer, {});
      const ignoredRules = rows.filter(row => row[1] === '0')
        .map(row => row[0]);
      return { rules, ignoredRules };
    });
  return allRules;
};


// Listen for new parser languages
const onStateChange = async () => {
  const newLanguage = store.getState().parser.language;
  let allRules;
  if (currentLanguage === newLanguage) {
    // No need to see this through, we already have the rules
    return;
  } else if (newLanguage in mappingCache) {
    // We've seen this language before, load the rules from cache
    allRules = mappingCache[newLanguage];
  } else {
    // This is a new language, get the mappings from the API and cache them
    allRules = await loadRules(newLanguage);
    mappingCache[newLanguage] = allRules;
  }
  currentLanguage = newLanguage;
  setAllRules(allRules);
};

// Subscribe to store
export const initRules = (newStore) => {
  store = newStore;
  store.subscribe(onStateChange); // This will be our listener
};

/*
Given an AST getRuleCount() recursively populates the specified map with
each token type's occurence count in the AST.
*/
export function getRuleCount(node, map) {
  // Node's type is the last element of the node's tags property,
  // if AST was made with tagging parser. Otherwise, if it was made with
  // the legacy parser, it is the type property.
  const type = node.type ? node.type : _.last(node.tags);

  if (type === undefined) return;
  if (map[type] === undefined) {
    map[type] = 1;
  } else {
    map[type] += 1;
  }
  node.children.forEach(child => getRuleCount(child, map));
}
