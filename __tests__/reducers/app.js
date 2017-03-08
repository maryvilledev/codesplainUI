import reducer from '../../src/reducers/app';

describe('Reducer: Snippets', () => {
  it('should have initial state', () => {
    const initialState = {
      snippet: '',
      snippetTitle: '',
      annotations: {},
      filters: {},
      AST: {},
      readOnly: false,
    };
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
