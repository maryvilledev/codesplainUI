export const OPEN_ANNOTATION_PANEL = 'OPEN_ANNOTATION_PANEL';
export const CLOSE_ANNOTATION_PANEL = 'CLOSE_ANNOTATION_PANEL';

export const openAnnotationPanel = (annotatedLine) => ({
  type: OPEN_ANNOTATION_PANEL,
  payload: annotatedLine,
});

export const closeAnnotationPanel = () => ({
  type: CLOSE_ANNOTATION_PANEL,
});
