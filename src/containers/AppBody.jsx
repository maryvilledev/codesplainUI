import axios from 'axios';
import { Card } from 'material-ui';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import { restoreState } from '../actions/app';
import { setPermissions } from '../actions/permissions'

import Annotations from './Annotations';
import FilterArea from './FilterArea';
import SnippetArea from './SnippetArea';

const API_URL = process.env.REACT_APP_API_URL;

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

export class AppBody extends React.Component {
  componentDidMount() {
    const {
      dispatch,
      params: {
        id,
        username,
      },
    } = this.props;

    if (!username && !id) {

      // This is a new snippet for the current user, enable all permissions
      const permissions = {
        canRead: true,
        canEdit: true
      }
      dispatch(setPermissions(permissions));

      // Reload the state if returning from login.
      const signInState = cookie.load('signInState');
      if (signInState) {
        cookie.remove('signInState', { path: '/' });
        cookie.remove('signInRedirect', { path: '/' });
        dispatch(restoreState(signInState));
      }
      return null;
    }

    const token = cookie.load('token');
    const config = {
      headers: {
        'Authorization': token,
      }
    }

    axios.get(`${API_URL}/users/${username}/snippets/${id}`, config)
      .then(res => {
        const permissions = {
          canRead: true,
          //Currently, users may only edit a file they own
          canEdit: (username === cookie.load('username'))
        }
        dispatch(setPermissions(permissions))
        dispatch(restoreState(res.data));
      }, err => {
        // Failed to get the snippet, either bad URL or unauthorized
        browserHistory.push('/');
      });
  }

  render() {
    const { id } = this.props.params;
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2'>
            <FilterArea />
          </div>
          <div
            className='col-lg-5 col-md-7'
            style={styles.snippetAreaSection}
          >
            <Card
              containerStyle={styles.snippetAreaSectionCardContainer}
              style={styles.snippetAreaSectionCard}
            >
              <SnippetArea
                id={id}
              />
            </Card>
          </div>
          <div className='col-lg-5 col-md-5'>
            <Card>
              <Annotations
                id={id}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AppBody);
