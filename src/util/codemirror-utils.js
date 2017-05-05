import _ from 'lodash';

let rules;
let ignoredRules;

const parserCodeMirrorModes = {
  python3: 'python',
  java8: 'java',
};

export const setRules = (newRules) => {
  rules = newRules;
};

export const setIgnoredRules = (newIgnoredRules) => {
  ignoredRules = newIgnoredRules;
};

/*
Given a CodeMirror instance, styleRegion() will apply the specified css style to
the given region of code. The code is treated as a single string, and characters
in that string must be identified by their index (as opposed to row/col). Both
start and end are inclusive.
*/
export function styleRegion(codeMirror, start, end, css) {
  if (end < start) throw new Error('end must be greater than start');
  codeMirror.markText(codeMirror.posFromIndex(start), codeMirror.posFromIndex(end), { css });
}

/*
Recursive function for highlighting code in a CodeMirror. highlight() is an
exported wrapper func for this, and starts the recursion.
*/
export function highlightNode(codeMirror, node, filters, parentColor) {
  let color = parentColor;
  // Node's type is the last element of the node's tags property,
  // if AST was made with tagging parser. Otherwise, if it was made with
  // the legacy parser, it is the type property.
  const type = node.type ? node.type : _.last(node.tags);

  // If we aren't ignoring this token...
  if (ignoredRules.indexOf(type) === -1) {
    // Get the rule obj for this rule
    const rule = rules[type];
    if (!rule) {
      return; // Remove this return and the highlighting will sometimes fail
    }
    // Use this node's color if it has one
    if (rule.color) {
      color = rule.color;
    }

    // If this token's filter is not selected
    if (!filters[type] || !filters[type].selected) {
      color = parentColor;
    }

    // Apply the background color CSS to this token
    styleRegion(codeMirror, node.begin, node.end, `background-color: ${color};`);
  }

  // Highlight all children of this token
  node.children.forEach((child) => {
    if (_.isObject(child)) { highlightNode(codeMirror, child, filters, color); }
  });
}

/*
Given a CodeMirror instance styleLine() will apply the specified css style to the
specified line of code in the editor. The first line is considered line 0, not 1.
*/
export function styleLine(codeMirror, line, css) {
  const lineStart = { line, ch: 0 };
  const lineEnd = { line, ch: codeMirror.getLine(line).length };
  codeMirror.markText(lineStart, lineEnd, { css });
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
  if (!rules || !ignoredRules) {
    // Possibly not done loading these. Hooray, an asynchronous spin-lock!
    setTimeout(() => highlight(codeMirror, AST, filters), 100);
    return;
  }
  // Make this a first-class function
  const func = () => highlightNode(codeMirror, AST, filters, 'transparent');
  // Codemirror buffers its calls ahead of time, then performs them atomically
  codeMirror.operation(func);
}

/*
Return the parser's corresponding CodeMirror mode if it exists in
parserCodeMirrorModes; else return the parser
*/
export const getCodeMirrorMode = parserName =>
   parserCodeMirrorModes[parserName] || parserName;

export const generateFilters = (prevFilters, ruleCounts) => {
  const newFilters = {};
  if (!ruleCounts || Object.keys(ruleCounts) === 0) {
    return newFilters;
  }
  Object.keys(ruleCounts)
    .filter(r => rules[r] !== undefined)
    .forEach((r) => {
      const selected = prevFilters[r] ? prevFilters[r].selected : false;
      newFilters[r] = {
        prettyTokenName: rules[r].prettyName,
        count: ruleCounts[r],
        selected,
        color: rules[r].color,
      };
    });
  return newFilters;
};

export const removeDeprecatedFilters = filters => _.omit(filters, ignoredRules);

export const removeDeprecatedFiltersFromState = state => ({
  ...state,
  filters: removeDeprecatedFilters(state.filters),
});
