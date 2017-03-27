import { getRuleCount, rules } from '../util/rules.js';
import { LOAD_PARSER } from '../actions/parser'
import { PARSE_SNIPPET } from '../actions/app'

let parser = null;

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
      const parserURL  = action.payload;
      importScripts(parserURL);
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
