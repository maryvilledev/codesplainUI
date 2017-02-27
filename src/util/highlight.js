import { styleRegion } from '../components/SnippetArea';

const ignoredTokens = [
  'suite',
  'file_input',
  'simple_stmt',
  'trailed_atom',
  'trailer',
]

const tokenColors = {
  'for_stmt' :    '#F7ABAB',
  'if_stmt':      '#C23B22',
  'number':       'DEA5A4',
  'exptr_stmt':   '#F7ABD4',
  'expr':         '#F0ABF7',
  'str':          '#CAABF7',
  'atom':         '#ABDBF7',
  'expr_stmt':    '#F7ABAB',
  'arglist':      '#F7CDAB',
  'argument':     '#EAF7AB',
  'integer':      '#ABF7C6',
  'funcdef':      '#AEC6CF',
  'parameters':   '#FFB347',
  'classdef':     '#03C03C',
  'try_stmt':     '#966FD6',
  'pass_stmt':    '#FDFD96',
  'except_clause':'#779ECB',
}

function getColor(type) {
  return tokenColors[type];
}

export function highlight(snippet, node, codeMirrorRef) {
  // If we aren't ignoring this token...
  if (ignoredTokens.indexOf(node.type) === -1) {
    let color = getColor(node.type);
    if (!color) {
      color = 'inherit';
      console.warn(`token "${node.type}" has no color specified!`);
    }
    styleRegion(
      codeMirrorRef, 
      node.begin, 
      node.end, 
      `background-color: ${color};`
    );
  }

  node.children.forEach(child => {
    if (child === Object(child)) highlight(snippet, child, codeMirrorRef);
  });
}
