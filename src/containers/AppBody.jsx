import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';

import Annotations from './Annotations';
import FilterArea from './FilterArea';
import SnippetArea from './SnippetArea';
import ReferenceArea from '../components/ReferenceArea';
import {
  loadSnippet,
  restoreState,
} from '../actions/app';
import { setPermissions } from '../actions/permissions';
import { restoreUserCredentials } from '../actions/user';
import { removeDeprecatedFiltersFromState } from '../util/codemirror-utils';
import { setDefaults } from '../util/state-management';

export class AppBody extends Component {
  componentDidMount() {
    const {
      dispatch,
      router,
    } = this.props;
    const {
      id: snippetKey,
      username,
    } = router.params;

    if (!username && !snippetKey) {
      // This is a new snippet for the current user, enable all permissions
      const permissions = {
        canRead: true,
        canEdit: true,
      };
      dispatch(setPermissions(permissions));

      // Reload the state if returning from login.
      const signInState = cookie.load('signInState');
      if (signInState) {
        cookie.remove('signInState', { path: '/' });
        cookie.remove('signInRedirect', { path: '/' });
        dispatch(restoreState(signInState));
      }
      return;
    }

    // Restore the user's credentials into state
    dispatch(restoreUserCredentials(cookie.load('token'), cookie.load('username')));

    dispatch(loadSnippet(username, snippetKey))
      .then((res) => {
        // Normalize the app state received from S3
        const appState = setDefaults(removeDeprecatedFiltersFromState(res.data));
        // Snippet may not have a S3 key value saved; set it to the URL's id
        // param if the state object is lacking it
        if (!appState.snippetKey) {
          appState.snippetKey = snippetKey;
        }
        // Restore the application's state
        dispatch(restoreState(appState));

        const permissions = {
          canRead: true,
          // Currently, users may only edit a file they own
          canEdit: (username === cookie.load('username')),
        };
        dispatch(setPermissions(permissions));

        // Reroute if not at the 'correct' location
        // So /:username/snippets/:id -> /:username/:id
        const nextRoute = `/${username}/${encodeURIComponent(snippetKey)}`;
        if (router.location.pathname !== nextRoute) {
          router.push(nextRoute);
        }
      }, () => {
        // Failed to get the snippet, either bad URL or unauthorized
        router.push('/');
      });
  }

  render() {
    return (
      <div style={{ height: '85%' }}>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            height: '100%',
          }}
        >
          <SnippetArea />
          <div
            style={{
              display: 'flex',
              flexFlow: 'column wrap',
              height: '100%',
              flex: '1 0',
              minWidth: '300px',
            }}
          >
            <FilterArea />
            <Annotations />
          </div>
        </div>
        <div>
          <ReferenceArea />
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(AppBody));
