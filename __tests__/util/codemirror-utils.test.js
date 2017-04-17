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

describe('util: codemirror-utils', () => {
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
      const line = 0;
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
        type: 'Blips and Chitz',
      };
      codemirrorUtils.highlightNode(codeMirror, node, {}, '');
      expect(codeMirror.markText).not.toBeCalled();
    });
    it('should not call styleRegion for a node if its type is ignored', () => {
      const node = {
        type: 'suite',
        children: [],
      };
      codemirrorUtils.highlightNode(codeMirror, node, {}, 'blue');
      expect(codeMirror.markText).not.toBeCalled();
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
});
