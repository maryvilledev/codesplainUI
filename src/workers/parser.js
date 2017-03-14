import parser from '../parsers/python3.min.js';
import { getRuleCount, rules } from '../util/rules.js';

const onError = (err) => {console.error(err);}

self.onmessage = ({ data : action }) => {
  const {snippet} = action.payload;
  console.log(snippet);

  const AST = parser(snippet, onError);
  console.log(AST);
  const ruleCounts = {}; getRuleCount(AST, ruleCounts);
  console.log(ruleCounts);
  self.postMessage({
    type: action.type,
    payload: {
      AST,
      ruleCounts,
    },
  })
}
