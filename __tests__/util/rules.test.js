import * as rules from '../../src/util/rules';

describe('util: rules', () => {
  describe('rules', () => {
    it('should match snapshot', () => {
      expect(rules.rules).toMatchSnapshot();
    });
  });
  describe('ignored rules', () => {
    it('should match snapshot', () => {
      expect(rules.ignoredRules).toMatchSnapshot();
    });
  });

  describe('getRuleCount()', () => {
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
          { type: nodeType, children: [] },
          { type: nodeType, children: [] },
        ],
      };
      const ruleCounts = {};
      rules.getRuleCount(node, ruleCounts);
      expect(ruleCounts[nodeType]).toEqual(3);
    });
  });
  describe('generateFilters()', () => {
    it('should return {} is ruleCounts is undefined', () => {
      const prevFilters = {};
      const ruleCounts = undefined;
      expect(rules.generateFilters(prevFilters, ruleCounts)).toEqual({});
    });
    it('should return {} is ruleCounts is empty', () => {
      const prevFilters = {};
      const ruleCounts = {};
      expect(rules.generateFilters(prevFilters, ruleCounts)).toEqual({});
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
      expect(rules.generateFilters(prevFilters, ruleCounts)).toEqual({});
    });
    it('sets selected property to false if filter not in prevFilters', () => {
      const prevFilters = {};
      const ruleCounts = {
        str: 1,
      };
      const newFilters = rules.generateFilters(prevFilters, ruleCounts);
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
      const newFilters = rules.generateFilters(prevFilters, ruleCounts);
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
      const newFilters = rules.generateFilters(prevFilters, ruleCounts);
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
      expect(rules.removeDeprecatedFilters(filters)).toEqual(expected);
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
      expect(rules.removeDeprecatedFiltersFromState(state)).toEqual(expected);
    });
  });
});
