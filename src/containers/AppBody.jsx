import React, { Component, PropTypes } from 'react';
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
import { switchOrg } from '../actions/user';
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
      username,
    } = this.props;
    const {
      params: {
        id: snippetKey,
        username: snippetOwner,
      },
      location: { pathname },
    } = router;

    this.setState({ pathname });
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

        // If the user is a member of the org in question, make the org the
        // current org
        const isMember = cookie.load('orgs').split(' ').includes(snippetOwner);
        if (isMember) {
          dispatch(switchOrg(snippetOwner));
        }

        const permissions = {
          canRead: true,
          // User can edit a snippet if he/she owns the snippet, or they belong
          // to the organization that owns the snippet
          canEdit: snippetOwner === username || isMember,
        };
        dispatch(setPermissions(permissions));

        // Reroute if using legacy url
        // So /:username/snippets/:id -> /:username/:id
        const nextRoute = `/${snippetOwner}/${sanitizeKey(snippetKey)}`;
        if (pathname !== nextRoute) {
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

AppBody.propTypes = {
  username: PropTypes.string,
};

AppBody.defaultProps = {
  username: '',
};

const mapStateToProps = (state) => {
  const {
    user: {
      username,
    },
  } = state;
  return {
    username,
  };
};

export default withRouter(connect(mapStateToProps)(AppBody));
