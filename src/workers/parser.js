import { getRuleCount, rules } from '../util/rules.js';
import { LOAD_PARSER } from '../actions/parser'
import { PARSE_SNIPPET } from '../actions/app'

let parser = null;

let onError = (err) => {console.error(err);}
if (process.env.NODE_ENV === "production") {
  onError = () => {};
}

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
      const parserURL  = action.payload;
      // Load and execute script from the URL
      self.importScripts(parserURL);
      // Script exports the parser as a global var, set the local ref to point
      // at it
      parser = Codesplain_parse_python3
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
