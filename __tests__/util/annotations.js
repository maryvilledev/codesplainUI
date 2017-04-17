import * as utils from '../../src/util/annotations';

const annotations = {
  '1': 'Rick Sanchez',
  '2': 'Morty Smith',
  '3': 'Beth Smith',
  '4': 'Summer Smith',
  // No Jerry
};

describe('util: annotations:', () => {
  describe('getAnnotatedLines', () => {
    it('should return a sorted array of the keys', () => {
      const expected = [1, 2, 3, 4];
      expect(utils.getAnnotatedLines(annotations)).toEqual(expected);
    });
  });
  describe('getNextAnnotation', () => {
    it('returns the annotation after the currently displayed one', () => {
      const lineNumber = 1;
      const expected = annotations[lineNumber + 1];
      const nextAnnotation = utils.getNextAnnotation(annotations, lineNumber);
      expect(nextAnnotation).toEqual(expected);
    });
    it('returns undefined if there are no annotations after the currently displayed one', () => {
      const lineNumber = 4;
      const nextAnnotation = utils.getNextAnnotation(annotations, lineNumber);
      expect(nextAnnotation).not.toBeDefined();
    });
  });
  describe('getPreviousAnnotation', () => {
    it('returns the annotation before the currently displayed one', () => {
      const lineNumber = 3;
      const expected = annotations[lineNumber - 1];
      const prevAnnotation = utils.getPreviousAnnotation(annotations, lineNumber);
      expect(prevAnnotation).toEqual(expected);
    });
    it('returns undefined if there are no annotations before the currently displayed one', () => {
      const lineNumber = 1;
      const prevAnnotation = utils.getPreviousAnnotation(annotations, lineNumber);
      expect(prevAnnotation).not.toBeDefined();
    });
  });
});
