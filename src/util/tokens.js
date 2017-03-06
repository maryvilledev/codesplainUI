/* Object mapping token types to pretty names and colors for display */
export const tokens = {
  'for_stmt': { prettyName: 'For Loops',     color: '#F7ABAB' },      
  'if_stmt':  { prettyName: 'If Statements', color: '#FFFF00' },
  'number':   { prettyName: 'Numbers',       color: '#DEA5A4' },
  'expr':     { prettyName: 'Expressions',   color: '#F0ABF7' },
  'str':      { prettyName: 'Strings',       color: '#CAABF7' },
  'atom':     { prettyName: 'Atoms',         color: '#ABDBF7' },
  'argument': { prettyName: 'Arguments',     color: '#EAF7AB' },
  'integer':  { prettyName: 'Integers',      color: '#ABF7C6' },
  'and_expr': { prettyName: 'And',           color: '#F0E68C' },
  'try_stmt': { prettyName: 'Try Statements',       color: '#966FD6' },
  'arglist':  { prettyName: 'Argument Lists',       color: '#F7CDAB' },
  'funcdef':  { prettyName: 'Function Definitions', color: '#AEC6CF' },
  'classdef': { prettyName: 'Class Definitions',    color: '#03C03C' },
  'comp_op':  { prettyName: 'Comparison Operator',  color: '#DAA520' },
  'augassign':   { prettyName: 'Augmented Assignment',  color: '#00ffff' },
  'import_name': { prettyName: 'Import Statement',      color: '#FF6666' },
  'return_stmt': { prettyName: 'Return Statement',      color: '#966FD6' },
  'while_stmt':  { prettyName: 'While Loops',           color: '#F0E68C' },
  'pass_stmt':   { prettyName: 'Pass Statements',       color: '#FDFD96' },
  'expr_stmt':   { prettyName: 'Expression Statements', color: '#BEDA0B' },
  'aith_expr':   { prettyName: 'Arithmetic Expression', color: '#FFA500' },
  'parameters':  { prettyName: 'Parameters',            color: '#FFB347' },
  'dictorsetmaker': { prettyName: 'Dictionary',     color: '#00FF7F' },
  'except_clause':  { prettyName: 'Except Clauses', color: '#779ECB' },
}

/* Array of tokens produced by parser, but ignored by the UI layer */
export const ignoredTokens = [
  'suite',
  'file_input',
  'simple_stmt',
  'trailed_atom',
  'trailer',
  'comparison', // Don't ignore after outlines are added to highlighting
  'testlist_comp',
]

/* 
Given an AST getTokenCount() recursively populates the specified map with 
each token type's occurence count in the AST.
*/
export function getTokenCount(node, map) {
  if (node.type === undefined) return;
  if (map[node.type] === undefined)
    map[node.type] = 1;
  else
    map[node.type] += 1;
  node.children.forEach(child => getTokenCount(child, map));
}
