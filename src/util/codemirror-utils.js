import { rules, ignoredRules } from './rules.js';
import _ from 'lodash'

/*
Recursive function for highlighting code in a CodeMirror. highlight() is an
exported wrapper func for this, and starts the recursion.
*/
function highlightNode(codeMirror, node, filters, parentColor) {
  let color = parentColor;

  // If we aren't ignoring this token...
  if (ignoredRules.indexOf(node.type) === -1  && rules[node.type]) {
    color = rules[node.type].color; // Get the color for this token's type

    // If this token has no color
    if (!color) {
      color = 'inherit';
      console.warn(`token "${node.type}" has no color specified!`);
    }

    // If this token's filter is not selected
    if (!filters[node.type] || !filters[node.type].selected) {
      color = parentColor;
    }

    // Apply the background color CSS to this token
    styleRegion(
      codeMirror,
      node.begin,
      node.end,
      `background-color: ${color};`
    );
  }

  // Highlight all children of this token
  node.children.forEach(child => {
    if (child === Object(child))
      highlightNode(codeMirror, child, filters, color);
  });
}

/*
Given a CodeMirror instance, styleRegion() will apply the specified css style to
the given region of code. The code is treated as a single string, and characters
in that string must be identified by their index (as opposed to row/col). Both
start and end are inclusive.
*/
export function styleRegion(codeMirror, start, end, css) {
  if (end < start) throw new Error('end must be greater than start');
  const snippet = codeMirror.getValue();
  const convert = getIndexToRowColConverter(snippet);
  codeMirror.markText(convert(start), convert(end), {css: css});
}
/*
Given a CodeMirror instance styleLine() will apply the specified css style to the
specified line of code in the editor. The first line is considered line 0, not 1.
*/
export function styleLine(codeMirror, line, css) {
    const lineStart = { line: line, ch: 0 };
    const lineEnd = { line: line, ch: codeMirror.getLine(line).length };
    codeMirror.markText(lineStart, lineEnd, {css: css});
}

/*
Given a CodeMirror instance, styleAll() will apply the specified css style to all
code in the editor.
*/
export function styleAll(codeMirror, css) {
  styleRegion(codeMirror, 0, codeMirror.getValue().length, css);
}

/*
Returns a function that will convert a character index to an object
of its row and column in the context of the passed-in snippet.

The returned object is of the following form: { line: <int>, ch: <int> }

Regards the first row in a snippet as row 0, and the first column of each
row as column 0.
*/
export function getIndexToRowColConverter(snippet) {
  // Make array containing the length of each lines of code in snippet
  const lines = snippet.split('\n').map(l => l.length + 1); // +1 to accomodate '\n' that was lost when we split the snippet
  const converter = (index) => {
    let row, col, lenPrevRows;
    row = lenPrevRows = 0;
    while (index > lines[row] + lenPrevRows)
      lenPrevRows += lines[row++];
    col = index - lenPrevRows;
    return { line: row, ch: col }
  }
  return _.memoize(converter)
}

/*
Given a CodeMirror instance, highlight() will use the specified AST and filters
objects to apply highlighting to the code in the CodeMirror editor.
*/
export async function highlight(codeMirror, AST, filters) {
  highlightNode(codeMirror, AST, filters, 'transparent');
}
