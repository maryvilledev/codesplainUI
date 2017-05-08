import { PropTypes } from 'react';

const annotation = PropTypes.shape({
  annotation: PropTypes.string.isRequired,
  lineNumber: PropTypes.number.isRequired,
  lineText: PropTypes.string.isRequired,
});

const annotations = PropTypes.objectOf(annotation);

const filters = PropTypes.shape({
  color: PropTypes.string,
  count: PropTypes.number,
  prettyTokenName: PropTypes.string,
  selected: PropTypes.bool,
});

const lineAnnotated = PropTypes.shape({
  lineNumber: PropTypes.number,
  lineText: PropTypes.string,
});

const permissions = PropTypes.shape({
  canEdit: PropTypes.bool.isRequired,
  canRead: PropTypes.bool.isRequired,
});

const snippetData = PropTypes.shape({
  language: PropTypes.string,
  lastEdited: PropTypes.string,
  snippetTitle: PropTypes.string,
});

const errors = PropTypes.arrayOf(
  PropTypes.shape({
    type: PropTypes.string,
    begin: PropTypes.number,
    end: PropTypes.NaN,
    msg: PropTypes.string,
  }),
);

const snippets = PropTypes.objectOf(snippetData);

const orgSnippets = PropTypes.objectOf(snippets);

const orgs = PropTypes.arrayOf(PropTypes.string);

export default {
  annotations,
  errors,
  filters,
  lineAnnotated,
  orgs,
  orgSnippets,
  permissions,
  snippets,
};
