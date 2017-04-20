import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
/* eslint-disable */
import {
  createHistory,
  useBeforeUnload,
} from 'history';
/* eslint-enable */
import {
  Router,
  Route,
  useRouterHistory,
} from 'react-router';

import App from './containers/App';
import Auth from './components/Auth';
import NotFound from './components/NotFound';
import configureStore from './store/configureStore';
import { initRules } from './util/rules';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();
initRules(store);
const history = useRouterHistory(useBeforeUnload(createHistory))();
history.listenBeforeUnload(() => {
  if (store.getState().app.hasUnsavedChanges) {
    return 'Are you sure you want to leave this page?';
  }
  return undefined;
});

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/auth" component={Auth} />
        <Route path="/404" component={NotFound} />
        <Route path="/" component={App} />
        {/* Leave this for legacy support */}
        <Route path="/(:username)/snippets/(:id)" component={App} />
        <Route path="/(:username)/(:id)" component={App} />
        <Route path="*" component={NotFound} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
