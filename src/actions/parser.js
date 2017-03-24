export const SET_PARSER_STATE = 'SET_PARSER_STATE';
export const LOAD_PARSER = 'LOAD_PARSER'
export const LOADING = 'LOADING'
export const LOADED = 'LOADED'

export const setParserState = (state) => ({
  type: SET_PARSER_STATE,
  payload: state
})

export const loadParser = (parser) => ({
  type: LOAD_PARSER,
  payload: parser
})
