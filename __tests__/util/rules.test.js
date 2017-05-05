import * as rules from '../../src/util/rules';

describe('util: rules', () => {
  describe('getRuleCount() with parser v0.5 (and below) ASTs', () => {
    it('should return if node.type === undefined', () => {
      const node = {
        type: undefined,
      };
      const ruleCounts = {};
      rules.getRuleCount(node, ruleCounts);
      expect(ruleCounts).toEqual({});
    });

    it('sets uninitialized key values to 1', () => {
      const nodeType = 'gromflomite';
      const node = {
        type: nodeType,
        children: [],
      };
      const ruleCounts = {};
      expect(ruleCounts[nodeType]).toEqual(undefined);
      rules.getRuleCount(node, ruleCounts);
      expect(ruleCounts[nodeType]).toEqual(1);
    });

    it('adds 1 if key value has been initialized', () => {
      const nodeType = 'gromflomite';
      const node = {
        type: nodeType,
        children: [],
      };
      const ruleCounts = {
        [nodeType]: 1,
      };
      rules.getRuleCount(node, ruleCounts);
      expect(ruleCounts[nodeType]).toEqual(2);
    });

    it('recursively applied to the children', () => {
      const nodeType = 'gromflomite';
      const node = {
        type: nodeType,
        children: [
          { tags: [nodeType], children: [] },
          { tags: [nodeType], children: [] },
        ],
      };
      const ruleCounts = {};
      rules.getRuleCount(node, ruleCounts);
      expect(ruleCounts[nodeType]).toEqual(3);
    });
  });

  describe('getRuleCount() with parser v0.6.0 (and above) ASTs', () => {
    it('should return if node.type === undefined', () => {
      const node = {
        type: undefined,
      };
      const ruleCounts = {};
      rules.getRuleCount(node, ruleCounts);
      expect(ruleCounts).toEqual({});
    });

    it('sets uninitialized key values to 1', () => {
      const nodeType = 'gromflomite';
      const node = {
        tags: [nodeType],
        children: [],
      };
      const ruleCounts = {};
      expect(ruleCounts[nodeType]).toEqual(undefined);
      rules.getRuleCount(node, ruleCounts);
      expect(ruleCounts[nodeType]).toEqual(1);
    });

    it('adds 1 if key value has been initialized', () => {
      const nodeType = 'gromflomite';
      const node = {
        tags: [nodeType],
        children: [],
      };
      const ruleCounts = {
        [nodeType]: 1,
      };
      rules.getRuleCount(node, ruleCounts);
      expect(ruleCounts[nodeType]).toEqual(2);
    });

    it('recursively applied to the children', () => {
      const nodeType = 'gromflomite';
      const node = {
        tags: [nodeType],
        children: [
          { tags: [nodeType], children: [] },
          { tags: [nodeType], children: [] },
        ],
      };
      const ruleCounts = {};
      rules.getRuleCount(node, ruleCounts);
      expect(ruleCounts[nodeType]).toEqual(3);
    });
  });

  describe('parseCSV()', () => {
    it('parses CSV to rows and columns', () => {
      const csv = `NAME,ROLE,CATCHPHRASE,
Rick,Genius,Wubba Lubba Dub Dub
Morty,Teenager,Aw Geez Rick
`;
      const expected = [
        ['Rick', 'Genius', 'Wubba Lubba Dub Dub'],
        ['Morty', 'Teenager', 'Aw Geez Rick'],
      ];
      expect(rules.parseCSV(csv)).toEqual(expected);
    });
  });
});
