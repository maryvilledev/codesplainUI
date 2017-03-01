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
  return (index) => {
    let row, col, lenPrevRows;
    row = lenPrevRows = 0;
    while (index > lines[row] + lenPrevRows)
      lenPrevRows += lines[row++];
    col = index - lenPrevRows;
    return { line: row, ch: col }
  }
}
