import * as actions from '../../src/actions/annotation';

describe('Actions: Annotation', () => {
  describe('OPEN_ANNOTATION_PANEL', () => {
    it('creates an action to open the annotation panel', () => {
      const snippetInformation = {
        lineNumber: 1,
        lineText: 'Wubba lubba dub dub!',
      };
      expect(actions.openAnnotationPanel(snippetInformation)).toMatchSnapshot();
    });
  });

  describe('CLOSE_ANNOTATION_PANEL', () => {
    it('creates an action to close the annotation panel', () => {
      expect(actions.closeAnnotationPanel()).toMatchSnapshot();
    });
  });
});
