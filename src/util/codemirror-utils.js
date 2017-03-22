import { rules, ignoredRules } from './rules.js';
import _ from 'lodash'

/*
Recursive function for highlighting code in a CodeMirror. highlight() is an
exported wrapper func for this, and starts the recursion.
*/
export function highlightNode(codeMirror, node, filters, parentColor) {
  let color = parentColor;

  // If we aren't ignoring this token...
  if (ignoredRules.indexOf(node.type) === -1) {
    const rule = rules[node.type]; // Get the rule obj for this rule
    if (!rule) {
      return; // Remove this return and the highlighting will sometimes fail
    }
    // Use this node's color if it has one
    if (rule.color) {
      color = rule.color;
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
  codeMirror.markText(codeMirror.posFromIndex(start), codeMirror.posFromIndex(end), {css});
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
Given a CodeMirror instance, highlight() will use the specified AST and filters
objects to apply highlighting to the code in the CodeMirror editor.
*/
export async function highlight(codeMirror, AST, filters) {
  //Make this a first-class function
  const func = () => highlightNode(codeMirror, AST, filters, 'transparent');
  //Codemirror buffers its calls ahead of time, then performs them atomically
  codeMirror.operation(func)
}
