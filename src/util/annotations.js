import head from 'lodash/head';
import last from 'lodash/last';
import sortBy from 'lodash/sortBy';
import keys from 'lodash/keys';
import sortedIndexOf from 'lodash/sortedIndexOf';

export const hasPreviousAnnotation = (annotatedLines, lineNumber) =>
  annotatedLines.includes(lineNumber) && head(annotatedLines) !== lineNumber;

export const hasNextAnnotation = (annotatedLines, lineNumber) =>
  annotatedLines.includes(lineNumber) && last(annotatedLines) !== lineNumber;

export const getAnnotatedLines = annotations =>
  sortBy(keys(annotations).map(Number));

export const getPreviousAnnotation = (annotations, displayedLineNumber) => {
  const annotatedLines = getAnnotatedLines(annotations);
  if (!hasPreviousAnnotation(annotatedLines, displayedLineNumber)) {
    // First annotation is the one being displayed so there isn't another
    // annotation before this one; return undefined
    return undefined;
  }
  // Get the index of the currently displayed annotation in the annotatedLines
  // array and subtract one to get index of the previous annotation
  const index = sortedIndexOf(annotatedLines, displayedLineNumber) - 1;
  return annotations[annotatedLines[index]];
};

export const getNextAnnotation = (annotations, displayedLineNumber) => {
  const annotatedLines = getAnnotatedLines(annotations);
  if (!hasNextAnnotation(annotatedLines, displayedLineNumber)) {
    // Last annotation is the one being displayed so there isn't another
    // annotation after this one; return undefined
    return undefined;
  }
  // Get the index of the currently displayed annotation in the annotatedLines
  // array and add one to get index of the next annotation
  const index = sortedIndexOf(annotatedLines, displayedLineNumber) + 1;
  return annotations[annotatedLines[index]];
};
