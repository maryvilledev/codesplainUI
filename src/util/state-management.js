import _ from 'lodash';

export const defaultStateValues = {
  // Default values for state should go here. If a value was already set
  // by state, it won't be overriden by this object
  snippetLanguage: 'python3',
};

export const setDefaults = (state) => {
  return _.defaults(
    {...state},
    defaultStateValues,
  );
};
