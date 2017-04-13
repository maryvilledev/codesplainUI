const {
  NODE_ENV,
  REACT_APP_ENABLE_PARSER_DEBUGGING
} = process.env;

let errorFn;

if (NODE_ENV === 'development' && REACT_APP_ENABLE_PARSER_DEBUGGING === "true") {
  errorFn = (err) => { console.error(err); };
} else {
  errorFn = () => {};
}

export default errorFn;
