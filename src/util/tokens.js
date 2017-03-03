const prettyTokenNameMap = {
  'for_stmt' :    'For Loops',
  'if_stmt':      'If Statements',
  'number':       'Numbers',
  'expr':         'Expressions',
  'str':          'Strings',
  'atom':         'Atoms',
  'expr_stmt':    'Expression Statements',
  'arglist':      'Argument Lists',
  'argument':     'Arguments',
  'integer':      'Integers',
  'funcdef':      'Function Definitions',
  'parameters':   'Parameters',
  'classdef':     'Class Definitions',
  'try_stmt':     'Try Statements',
  'pass_stmt':    'Pass Statements',
  'except_clause':'Except Clauses',
}

/* Maps AST token types to pretty strings for displaying */
export function getPrettyTokenName(token) {
  return prettyTokenNameMap[token];
}

/* (Recursively) populates map with each token type's occurence count. */
export function getTokenCount(node, map) {
  if (node.type === undefined) return;
  if (map[node.type] === undefined)
    map[node.type] = 1;
  else 
    map[node.type] += 1;
  node.children.forEach(child => getTokenCount(child, map));
}
