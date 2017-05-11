import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cookie from 'react-cookie';

import Annotations from './Annotations';
import FilterArea from './FilterArea';
import SnippetArea from './SnippetArea';
import {
  loadSnippet,
  restoreState,
} from '../actions/app';
import {
  switchOrg,
} from '../actions/user';
import { setPermissions } from '../actions/permissions';
import NotFound from '../components/NotFound';
import { removeDeprecatedFiltersFromState } from '../util/codemirror-utils';
import { sanitizeKey } from '../util/requests';
import { setDefaults } from '../util/state-management';

const styles = {
  body: {
    display: 'flex',
    flexFlow: 'row wrap',
    height: '100%',
  },
  rightSection: {
    display: 'flex',
    flexFlow: 'column nowrap',
    height: '100%',
    flex: '2 1',
    overflowY: 'auto',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.12)',
  },
};

export class AppBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidSnippet: true,
    };
    this.loadSnippet = this.loadSnippet.bind(this);
    this.updatePermissions = this.updatePermissions.bind(this);
  }

  componentDidMount() {
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

  componentDidUpdate() {
    const { router } = this.props;
    const {
      id: snippetKey,
      username: snippetOwner,
    } = router.params;

    if (snippetOwner && snippetKey) {
      this.updatePermissions();
    }
  }

  loadSnippet() {
    const {
      dispatch,
      router,
    } = this.props;
    const {
      id: snippetKey,
      username: snippetOwner,
    } = router.params;

    this.setState({ pathname: router.location.pathname });
    if (!snippetOwner && !snippetKey) {
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

    dispatch(loadSnippet(snippetOwner, snippetKey))
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
        this.updatePermissions();

        // Reroute if using legacy url
        // So /:username/snippets/:id -> /:username/:id
        const nextRoute = `/${snippetOwner}/${sanitizeKey(snippetKey)}`;
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

  updatePermissions() {
    const {
      username,
      orgs,
      dispatch,
      router,
    } = this.props;
    const {
      username: snippetOwner,
    } = router.params;

    // If the user is a member of the org in question, make the org the
    // current org
    const isMember = orgs.includes(snippetOwner);
    if (isMember) {
      dispatch(switchOrg(snippetOwner));
    }

    const permissions = {
      canRead: true,
      // Users may only edit & save a file they (or one of their orgs) own
      canEdit: (username === snippetOwner || isMember),
    };
    dispatch(setPermissions(permissions));
  }

  render() {
    const { isValidSnippet } = this.state;
    if (!isValidSnippet) {
      return <NotFound />;
    }
    return (
      <div style={styles.body}>
        <SnippetArea />
        <div style={styles.rightSection}>
          <FilterArea />
          <Annotations />
        </div>
      </div>
    );
  }
}

AppBody.propTypes = {
  orgs: PropTypes.string,
  username: PropTypes.string,
};

AppBody.defaultProps = {
  orgs: [],
  username: '',
};

const mapStateToProps = (state) => {
  const {
    user: {
      username,
      orgs,
    },
  } = state;

  return {
    username,
    orgs,
  };
};

export default withRouter(connect(mapStateToProps)(AppBody));
