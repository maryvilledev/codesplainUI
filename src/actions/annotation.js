export const OPEN_ANNOTATION_PANEL = 'OPEN_ANNOTATION_PANEL';
export const CLOSE_ANNOTATION_PANEL = 'CLOSE_ANNOTATION_PANEL';

export const openAnnotationPanel = (snippetInformation) => ({
  type: OPEN_ANNOTATION_PANEL,
  payload: snippetInformation,
});

export const closeAnnotationPanel = () => ({
  type: CLOSE_ANNOTATION_PANEL,
});
