export const LOAD_PARSER = 'LOAD_PARSER'

export const loadParser = (parserURL) => ({
  type: LOAD_PARSER,
  meta: {
    WebWorker: true,
  },
  payload: parserURL,
})
