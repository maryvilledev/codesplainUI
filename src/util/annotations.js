import _ from 'lodash';

export const hasPreviousAnnotation = (annotatedLines, lineNumber) =>
  _.head(annotatedLines) === lineNumber;

export const hasNextAnnotation = (annotatedLines, lineNumber) =>
  _.last(annotatedLines) === lineNumber;

export const getAnnotatedLines = annotations => _.sortBy(_.keys(annotations).map(key => Number(key)));

export const getPreviousAnnotation = (annotations, displayedLineNumber) => {
  const annotatedLines = getAnnotatedLines(annotations);
  if (hasPreviousAnnotation(annotatedLines, displayedLineNumber)) {
    // First annotation is the one being displayed so there isn't another
    // annotation before this one; return undefined
    return undefined;
  }
  // Get the index of the currently displayed annotation in the annotatedLines
  // array and subtract one to get index of the previous annotation
  const index = _.sortedIndexOf(annotatedLines, displayedLineNumber) - 1;
  return annotations[annotatedLines[index]];
};

export const getNextAnnotation = (annotations, displayedLineNumber) => {
  const annotatedLines = getAnnotatedLines(annotations);
  if (hasNextAnnotation(annotatedLines, displayedLineNumber)) {
    // Last annotation is the one being displayed so there isn't another
    // annotation after this one; return undefined
    return undefined;
  }
  // Get the index of the currently displayed annotation in the annotatedLines
  // array and add one to get index of the next annotation
  const index = _.sortedIndexOf(annotatedLines, displayedLineNumber) + 1;
  return annotations[annotatedLines[index]];
};
