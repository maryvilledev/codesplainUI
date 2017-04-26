import { combineReducers } from 'redux';
import app from './app';
import annotation from './annotation';
import notifications from './notifications';
import parser from './parser';
import permissions from './permissions';
import user from './user';

const reducer = combineReducers({
  app,
  annotation,
  notifications,
  parser,
  permissions,
  user,
});

export default reducer;
