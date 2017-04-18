export const LOAD_PARSER = 'LOAD_PARSER'

export const loadParser = (language) => ({
  type: LOAD_PARSER,
  meta: {
    WebWorker: true,
  },
  payload: language,
})
