const {
  NODE_ENV,
  REACT_APP_ENABLE_PARSER_DEBUGGING,
} = process.env;

const isDebuggingEnabled =
  NODE_ENV === 'development' && REACT_APP_ENABLE_PARSER_DEBUGGING === 'true';

const errorFn =
  isDebuggingEnabled ? (err) => { console.error(err); } : () => {};

export default errorFn;
