import { PropTypes } from 'react';

const filters = PropTypes.shape({
  color: PropTypes.string,
  count: PropTypes.number,
  prettyTokenName: PropTypes.string,
  selected: PropTypes.bool,
});

export default {
  filters,
};
