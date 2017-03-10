import React from 'react'
import ReactTestUtils from 'react-addons-test-utils';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AnnotationPanel from '../../src/components/AnnotationPanel';

describe('<AnnotationPanel />', () => {
  describe('snapshot tests', () => {
    it('matches the snapshot of when no annotation is being created or displayed ', () => {
      const renderer = ReactTestUtils.createRenderer();
      const tree = renderer.render(
        <MuiThemeProvider>
          <AnnotationPanel
            displayStatus={'none'}
            displayProps={{}}
            prompt={''}
          />
        </MuiThemeProvider>
      );
      expect(tree).toMatchSnapshot();
    });
    it('matches the snapshot of when a user is creating an annotation', () => {
      const renderer = ReactTestUtils.createRenderer();
      const tree = renderer.render(
        <MuiThemeProvider>
          <AnnotationPanel
            displayStatus={'create'}
            displayProps={{
              closeAnnotation: jest.fn(),
              lineNumber: 0,
              lineText: 'line text',
              saveAnnotation: jest.fn(),
            }}
            prompt={''}
          />
        </MuiThemeProvider>
      );
      expect(tree).toMatchSnapshot();
    });
    it('matches the snapshot of when it displays an annotation', () => {
      const renderer = ReactTestUtils.createRenderer();
      const tree = renderer.render(
        <MuiThemeProvider>
          <AnnotationPanel
            displayStatus={'display'}
            displayProps={{
              closeAnnotation: jest.fn(),
              lineNumber: 0,
              lineText: 'line text',
              text: 'annotation text',
            }}
            prompt={''}
          />
        </MuiThemeProvider>
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
