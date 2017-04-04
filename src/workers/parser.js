import { getRuleCount, rules } from '../util/rules.js';
import { LOAD_PARSER } from '../actions/parser'
import { PARSE_SNIPPET } from '../actions/app'

let parser = null;
let parserCache = {};

const onError = (err) => {console.error(err);}

self.onmessage = ({ data : action }) => {
  switch (action.type) {
    case PARSE_SNIPPET: {
      if (!parser) break;
      const { snippet } = action.payload;
      const AST = parser(snippet, onError);
      const ruleCounts = {}; getRuleCount(AST, ruleCounts);
      self.postMessage({
        type: action.type,
        payload: {
          AST,
          ruleCounts,
        },
      })
      break;
    }
    case LOAD_PARSER: {
      const parserURL = action.payload;
      //Check to see if we already have the parser loaded.
      if (parserURL in parserCache) {
        parser = parserCache[parserURL];
      } else {
        // Load and execute script from the URL
        self.importScripts(parserURL);
        // Script exports the parser as a global var, set the local ref to point
        // at it
        parser = Codesplain_parse_python3;
        //parser = CodesplainParser;
        // Add the parser to the cache so we don't have to load it again
        parserCache[parserURL] = parser;
      }
      self.postMessage({
        type: action.type,
        payload: action.payload
      })
      break;
    }
    default: {
      console.log(action.type)
    }
  }
}
