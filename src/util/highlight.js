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
}

function getColor(type) {
  return tokenColors[type];
}

export function highlight(snippet, node, codeMirrorRef) {
  const color = getColor(node.type);
  if (color) {
    styleRegion(
      codeMirrorRef, 
      node.begin, 
      node.end, 
      `background-color: ${color};`
    );
  }
  // If we aren't ignoring this token, warn that it has no color
  else if (ignoredTokens.indexOf(node.type) === -1) {
    console.warn(node.type + ' has no color!')
  }

  node.children.forEach(child => {
    if (child === Object(child)) highlight(snippet, child, codeMirrorRef);
  });
}
