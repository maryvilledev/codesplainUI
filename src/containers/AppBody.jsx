import React, { Component } from 'react';
import { Card } from 'material-ui';
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
import { restoreUserCredentials, addOrg, switchOrg } from '../actions/user';
import NotFound from '../components/NotFound';
import { removeDeprecatedFiltersFromState } from '../util/codemirror-utils';
import { sanitizeKey } from '../util/requests';
import { setDefaults } from '../util/state-management';

const styles = {
  snippetAreaSection: {
    height: '90vh',
  },
  snippetAreaSectionCard: {
    height: '100%',
  },
  snippetAreaSectionCardContainer: {
    height: 'inherit',
  },
};

export class AppBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidSnippet: true,
    };
    this.loadSnippet = this.loadSnippet.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // If the user is authenticated, add their Github to the orgs, and make it
    // the selected value
    if (cookie.load('token') && cookie.load('username')) {
      const savedUsername = cookie.load('username');
      dispatch(addOrg(savedUsername));
      dispatch(switchOrg(savedUsername));

      // If they are a member of any organizations, add to list as well
      cookie.load('orgs').split(' ').forEach(org => dispatch(addOrg(org)));
    }

    this.loadSnippet();
  }

  componentWillReceiveProps(nextProps) {
    // Reload snippet if URL changes. Assume it is valid, and
    // if it is not, the call to loadSnippet will handle it.
    if (this.state.pathname !== nextProps.router.location.pathname) {
      this.setState({ isValidSnippet: true });
      this.loadSnippet();
    }
  }

  loadSnippet() {
    const {
      dispatch,
      router,
    } = this.props;
    const {
      id: snippetKey,
      username,
    } = router.params;

    this.setState({ pathname: router.location.pathname });
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
          canEdit: (username === cookie.load('username') ||
           cookie.load('orgs').split(' ').includes(username)),
        };
        dispatch(setPermissions(permissions));

        // Reroute if using legacy url
        // So /:username/snippets/:id -> /:username/:id
        const nextRoute = `/${username}/${sanitizeKey(snippetKey)}`;
        if (router.location.pathname !== nextRoute) {
          router.push(nextRoute);
        }
      }, () => {
        // Failed to get the snippet, either bad URL or unauthorized
        this.setState({
          isValidSnippet: false,
        });
      });
  }

  render() {
    const { isValidSnippet } = this.state;
    if (!isValidSnippet) {
      return <NotFound />;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <FilterArea />
          </div>
          <div
            className="col-lg-5 col-md-7"
            style={styles.snippetAreaSection}
          >
            <Card
              containerStyle={styles.snippetAreaSectionCardContainer}
              style={styles.snippetAreaSectionCard}
            >
              <SnippetArea />
            </Card>
          </div>
          <div className="col-lg-5 col-md-5">
            <Card>
              <Annotations />
            </Card>
          </div>
        </div>
        <div className="row">
          <ReferenceArea />
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(AppBody));
