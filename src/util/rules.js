/* Object mapping token types to pretty names and colors for display */
export const rules = {
  'arith_expr': { prettyName: 'Arithmetic Expression', color: '#FFA500' },
  'and_expr': { prettyName: 'And', color: '#F0E68C' },
  'argument': { prettyName: 'Arguments', color: '#EAF7AB' },
  'atom':     { prettyName: 'Atoms', color: '#ABDBF7' },
  'augassign':   { prettyName: 'Augmented Assignment', color: '#00ffff' },
  'classdef': { prettyName: 'Class Definitions', color: '#03C03C' },
  'comp_op':  { prettyName: 'Comparison Operator', color: '#DAA520' },
  'dictorsetmaker': { prettyName: 'Dictionary', color: '#00FF7F' },
  'except_clause':  { prettyName: 'Except Clauses', color: '#779ECB' },
  'expr':     { prettyName: 'Expressions', color: '#F0ABF7' },
  'for_stmt': { prettyName: 'For Loops', color: '#F7ABAB' },
  'funcdef':  { prettyName: 'Function Definitions', color: '#AEC6CF' },
  'if_stmt':  { prettyName: 'If Statements', color: '#FFFF00' },
  'import_name': { prettyName: 'Import Statement', color: '#FF6666' },
  'integer':  { prettyName: 'Integers', color: '#ABF7C6' },
  'number':   { prettyName: 'Numbers', color: '#DEA5A4' },
  'parameters':  { prettyName: 'Parameters', color: '#FFB347' },
  'pass_stmt':   { prettyName: 'Pass Statements', color: '#FDFD96' },
  'return_stmt': { prettyName: 'Return Statement', color: '#966FD6' },
  'str':      { prettyName: 'Strings', color: '#CAABF7' },
  'try_stmt': { prettyName: 'Try Statements', color: '#966FD6' },
  'while_stmt':  { prettyName: 'While Loops', color: '#F0E68C' },
  '.TRUE': { prettyName: 'Boolean (True)', color: '#ff9933' },
  '.FALSE': { prettyName: 'Boolean (False)', color: '#e67300' },
}

/* Array of rules produced by parser, but ignored by the UI layer */
export const ignoredRules = [
  'suite',
  'file_input',
  'simple_stmt',
  'trailed_atom',
  'trailer',
  'comparison', // Don't ignore after outlines are added to highlighting
  'testlist_comp',
  'arglist',
  'expr_stmt',
]

/*
Given an AST getRuleCount() recursively populates the specified map with
each token type's occurence count in the AST.
*/
export function getRuleCount(node, map) {
  if (node.type === undefined) return;
  if (map[node.type] === undefined)
    map[node.type] = 1;
  else
    map[node.type] += 1;
  node.children.forEach(child => getRuleCount(child, map));
}

export const generateFilters = (prevFilters, ruleCounts) => {
  const newFilters = {};
  if (!ruleCounts || Object.keys(ruleCounts) === 0) {
    return {};
  }
  Object.keys(ruleCounts)
    .filter(r => rules[r] !== undefined)
    .forEach(r => {
      const selected = prevFilters[r] ? prevFilters[r].selected : false;
      newFilters[r] = {
        prettyTokenName: rules[r].prettyName,
        count:           ruleCounts[r],
        selected:        selected,
      }
    });
  return newFilters;
}
