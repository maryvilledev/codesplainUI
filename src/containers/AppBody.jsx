import React from 'react';
import { Card } from 'material-ui';
import { connect } from 'react-redux';
import axios from 'axios';
import { browserHistory } from 'react-router';

import { restoreState } from '../actions/app';

import Annotations from './Annotations';
import FilterArea from './FilterArea';
import SnippetArea from './SnippetArea';

export class AppBody extends React.Component {
  componentDidMount() {
      const { id } = this.props.params;
      const { dispatch } = this.props;
      if (!id) return;
      axios.get(`/api/snippets/${id}`)
        .then(res => {
          const stateString = res.data.json;
          const obj = JSON.parse(stateString);
          dispatch(restoreState(obj));
        })
        .catch(err => {
          // Bad URL, redirect
          browserHistory.push('/');
        });
  }
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <Card><FilterArea /></Card>
          </div>
          <div className='col-md-5'>
            <Card><SnippetArea /></Card>
          </div>
          <div className='col-md-5'>
            <Card><Annotations /></Card>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(AppBody)
