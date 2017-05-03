import * as codemirrorUtils from '../../src/util/codemirror-utils';

const lineText = 'Wubba lubba dub dub!';

const mockPosFromIndexReturnVals = [
  { line: 0, ch: 0 },
  { line: 0, ch: 20 },
];

// Mock posFromIndex to be used by codemirrorUtils.styleRegion()
const posFromIndex = jest.fn()
  .mockImplementationOnce(() => mockPosFromIndexReturnVals[0])
  .mockImplementationOnce(() => mockPosFromIndexReturnVals[1]);

const codeMirror = {
  markText: jest.fn(),
  getLine: jest.fn(() => lineText),
  getValue: jest.fn(() => lineText),
  posFromIndex,
};

const mockAllRules = {
  rules: {
    str: { prettyName: 'String', color: '#FFFFFF' },
    number: { prettyName: 'Number', color: '#FFFFFF' },
  },
  ignoredRules: [
    'atom',
    'arglist',
    'file_input',
  ],
};

describe('util: codemirror-utils', () => {
  beforeEach(() => {
    const { rules, ignoredRules } = mockAllRules;
    codemirrorUtils.setRules(rules);
    codemirrorUtils.setIgnoredRules(ignoredRules);
  });

  afterEach(() => {
    codeMirror.markText.mockClear();
    codeMirror.getLine.mockClear();
    codeMirror.getValue.mockClear();
    codeMirror.posFromIndex.mockClear();
  });

  describe('styleRegion()', () => {
    it('throws an error if end < start', () => {
      const start = 1;
      const end = 0;
      expect(() => codemirrorUtils.styleRegion(codeMirror, start, end)).toThrow();
    });
  });

  describe('styleLine()', () => {
    it('should call codeMirror\'s markText method with the correct args', () => {
      const line = 0;
      const css = 'background-color: blue';
      const expectedArgs = [
        { line, ch: 0 },
        { line, ch: lineText.length },
        { css },
      ];
      codemirrorUtils.styleLine(codeMirror, line, css);
      expect(codeMirror.markText).toBeCalledWith(...expectedArgs);
    });
  });

  describe('styleAll()', () => {
    it('should call styleRegion with the correct args', () => {
      const css = 'background-color: blue';
      const expectedArgs = [
        mockPosFromIndexReturnVals[0],
        mockPosFromIndexReturnVals[1],
        { css },
      ];
      codemirrorUtils.styleAll(codeMirror, css);
      expect(codeMirror.markText).toBeCalledWith(...expectedArgs);
    });
  });

  describe('highlightNode()', () => {
    it('should not call styleRegion if a rule is not ignored or valid', () => {
      const node = {
        tags: ['Blips and Chitz'],
      };
      codemirrorUtils.highlightNode(codeMirror, node, {}, '');
      expect(codeMirror.markText).not.toBeCalled();
    });

    it('should not call styleRegion for a node if its type is ignored', () => {
      const node = {
        tags: ['suite'],
        children: [],
      };
      codemirrorUtils.highlightNode(codeMirror, node, {}, 'blue');
      expect(codeMirror.markText).not.toBeCalled();
    });

    it('should call styleRegion for a node if its type is not ignored', () => {
      const node = {
        tags: ['suite'],
        children: [],
      };
      codemirrorUtils.setRules({
        'suite': {
          color: '#ffffff',
          prettyName: 'Suite',
        },
      });
      codemirrorUtils.highlightNode(codeMirror, node, {}, 'blue');
      expect(codeMirror.markText).toBeCalled();
    });
  });

  describe('getCodeMirrorMode', () => {
    it('should return the input if not in the data object', () => {
      const parser = 'NOT A REAL PARSER';
      expect(codemirrorUtils.getCodeMirrorMode(parser)).toEqual(parser);
    });

    it('should return the CodeMirror mode for a parser if it exists', () => {
      const parser = 'python3';
      const expected = 'python';
      expect(codemirrorUtils.getCodeMirrorMode(parser)).toEqual(expected);
    });
  });
  describe('generateFilters()', () => {
    it('should return {} is ruleCounts is undefined', () => {
      const prevFilters = {};
      const ruleCounts = undefined;
      expect(codemirrorUtils.generateFilters(prevFilters, ruleCounts)).toEqual({});
    });

    it('should return {} is ruleCounts is empty', () => {
      const prevFilters = {};
      const ruleCounts = {};
      expect(codemirrorUtils.generateFilters(prevFilters, ruleCounts)).toEqual({});
    });

    it('does not contain rules that are not in the rules data object', () => {
      const prevFilters = {};
      const ruleCounts = {
        'Rick Sanchez': 1,
        'Morty Smith': 2,
        'Summer Smith': 3,
        'Beth Smith': 4,
        'Jerry Smith': 5,
      };
      expect(codemirrorUtils.generateFilters(prevFilters, ruleCounts)).toEqual({});
    });

    it('sets selected property to false if filter not in prevFilters', () => {
      const prevFilters = {};
      const ruleCounts = {
        str: 1,
      };
      const newFilters = codemirrorUtils.generateFilters(prevFilters, ruleCounts);
      expect(newFilters.str.selected).toEqual(false);
    });

    it('sets selected property to filter\'s value in prevFilters', () => {
      const prevFilters = {
        str: { selected: true },
        number: { selected: false },
      };
      const ruleCounts = {
        str: 1,
        number: 2,
      };
      const newFilters = codemirrorUtils.generateFilters(prevFilters, ruleCounts);
      expect(newFilters.str.selected).toEqual(true);
      expect(newFilters.number.selected).toEqual(false);
    });

    it('sets the filter\'s count property from ruleCounts', () => {
      const prevFilters = {
        str: { selected: true },
        number: { selected: false },
      };
      const ruleCounts = {
        str: 1,
        number: 2,
      };
      const newFilters = codemirrorUtils.generateFilters(prevFilters, ruleCounts);
      expect(newFilters.str.count).toEqual(1);
      expect(newFilters.number.count).toEqual(2);
    });
  });
  describe('removeDeprecatedFilters', () => {
    it('removes filters that are in ignoredRules', () => {
      const filters = {
        and_expr: {},
        atom: {},
        file_input: {},
        comp_op: {},
        classdef: {},
        try_stmt: {},
        arglist: {},
      };
      const expected = {
        and_expr: {},
        comp_op: {},
        classdef: {},
        try_stmt: {},
      };
      expect(codemirrorUtils.removeDeprecatedFilters(filters)).toEqual(expected);
    });
  });
  describe('removeDeprecatedFiltersFromState', () => {
    it('returns the updated state object', () => {
      const filters = {
        and_expr: {},
        atom: {},
        file_input: {},
        comp_op: {},
        classdef: {},
        try_stmt: {},
        arglist: {},
      };
      const state = {
        snippetTitle: '',
        filters,
      };
      const expected = {
        ...state,
        filters: {
          and_expr: {},
          comp_op: {},
          classdef: {},
          try_stmt: {},
        },
      };
      expect(codemirrorUtils.removeDeprecatedFiltersFromState(state)).toEqual(expected);
    });
  });
});
