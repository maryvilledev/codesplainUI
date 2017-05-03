import { addError } from '../actions/parser';

const {
  NODE_ENV,
  REACT_APP_ENABLE_PARSER_DEBUGGING,
} = process.env;

const debuggingIsEnabled =
  NODE_ENV === 'development' && REACT_APP_ENABLE_PARSER_DEBUGGING === 'true';

const errorFn = (err, dispatch) => {
  /* eslint-disable no-console */
  if (debuggingIsEnabled) console.log(err);

  // Cause red underlining of the error's range
  dispatch(addError(err));
};

export default errorFn;
