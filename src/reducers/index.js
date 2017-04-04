import { combineReducers } from 'redux'
import app from './app'
import annotation from './annotation'
import parser from './parser'
import permissions from './permissions'

const reducer = combineReducers({
  app,
  annotation,
  parser,
  permissions
})

export default reducer
