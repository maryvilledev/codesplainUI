import * as actions from '../../src/actions/annotation';

describe('Actions: Annotation', () => {

  describe('OPEN_ANNOTATION_PANEL', () => {
    it('creates an action to open the annotation panel', () => {
      const snippetInformation = {
        lineNumber: 1,
        lineText: 'Wubba lubba dub dub!',
      };
      const expected = {
        type: actions.OPEN_ANNOTATION_PANEL,
        payload: snippetInformation,
      };
      expect(actions.openAnnotationPanel(snippetInformation)).toEqual(expected);
    });
  });

  describe('CLOSE_ANNOTATION_PANEL', () => {
    it('creates an action to close the annotation panel', () => {
      const expected = {
        type: actions.CLOSE_ANNOTATION_PANEL,
      };
      expect(actions.closeAnnotationPanel()).toEqual(expected);
    });
  });
});
