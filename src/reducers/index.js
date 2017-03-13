import { combineReducers } from 'redux'
import app from './app'
import annotation from './annotation'

const reducer = combineReducers({
  app,
  annotation,
})

export default reducer
