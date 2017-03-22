import * as codemirrorUtils from '../../src/util/codemirror-utils';

const lineText = "Wubba lubba dub dub!";
const mockPosFromIndex = [
  { line: 0, ch: 0, },
  { line: 0, ch: 20, },
]
const posFromIndex = jest.fn()
  .mockImplementationOnce(() => mockPosFromIndex[0])
  .mockImplementationOnce(() => mockPosFromIndex[1]);

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
      codemirrorUtils.styleLine(codeMirror, line, css)
      expect(codeMirror.markText).toBeCalledWith(...expectedArgs);
    });
  });
  describe('styleAll()', () => {
    it('should call styleRegion with the correct args', () => {
      const line = 0;
      const css = 'background-color: blue';
      const expectedArgs = [
        mockPosFromIndex[0],
        mockPosFromIndex[1],
        { css },
      ];
      codemirrorUtils.styleAll(codeMirror, css);
      expect(codeMirror.markText).toBeCalledWith(...expectedArgs);
    });
  });
});
