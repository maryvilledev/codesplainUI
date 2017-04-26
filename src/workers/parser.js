import { LOAD_PARSER, setNoError } from '../actions/parser';
import { PARSE_SNIPPET } from '../actions/app';
import onError from '../util/parser-error-logger.js';
import { getRuleCount, rules } from '../util/rules.js';
import { makeParserEndpointUrl } from '../util/requests.js';

const API_URL = process.env.REACT_APP_API_URL;

let parser = null;
const parserCache = {};

self.onmessage = ({ data: action }) => {
  switch (action.type) {
  case PARSE_SNIPPET: {
    if (!parser) break;
    const { snippet } = action.payload;
    self.postMessage(setNoError());
    const AST = parser(snippet, (err) => onError(err, self.postMessage));
    const ruleCounts = {}; getRuleCount(AST, ruleCounts);
    self.postMessage({
      type: action.type,
      payload: {
        AST,
        ruleCounts,
      },
    });
    break;
  }
  case LOAD_PARSER: {
    const language = action.payload;
    // Check to see if we already have the parser loaded.
    if (language in parserCache) {
      parser = parserCache[language];
    } else {
      // Load and execute script from the URL
      self.importScripts(makeParserEndpointUrl(language));
      // Script exports the parser as a global var, set the local ref to point
      // at it
      parser = CodesplainParser;
      // Add the parser to the cache so we don't have to load it again
      parserCache[language] = parser;
    }
    self.postMessage({
      type: action.type,
      payload: action.payload,
    });
    break;
  }
  default: {
    console.log(action.type);
  }
  }
};
