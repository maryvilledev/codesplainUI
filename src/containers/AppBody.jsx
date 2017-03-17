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
      if (!id) {
        return;
      }
      axios.get(`/api/snippets/${id}`)
        .then(res => {
          const stateString = res.data.json;
          const obj = JSON.parse(stateString);
          dispatch(restoreState(obj));
        }, err => {
          // Bad URL, redirect
          browserHistory.push('/');
        });
  }

  render() {
    const { id } = this.props.params;
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2'>
            <Card><FilterArea /></Card>
          </div>
          <div className='col-lg-5 col-md-7'>
            <Card>
              <SnippetArea
                id={id}
              />
            </Card>
          </div>
          <div className='col-lg-5 col-md-5'>
            <Card><Annotations/></Card>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(AppBody)
