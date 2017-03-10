import React from 'react';
import { Card } from 'material-ui';

import Annotations from '../containers/Annotations';
import FilterArea from '../containers/FilterArea';
import SnippetArea from '../containers/SnippetArea';

const AppBody = () => (
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

export default AppBody
