import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  CardText,
  Divider,
  RaisedButton,
} from 'material-ui';

import RulesSelector from '../components/RulesSelector';

import {
  resetFilters,
  selectAllFilters,
  setRuleFilters
} from '../actions/app';

const labelStyle = {
  fontSize: '12px',
};

const toggleFilter = (filters, filterName) => {
  filters[filterName].selected = !filters[filterName].selected
}

export class FilterArea extends React.Component {
  constructor(props) {
    super(props)
    this.handleRuleSelected = this.handleRuleSelected.bind(this);
    this.handleResetFilters = this.handleResetFilters.bind(this);;
    this.handleSelectAllFilters = this.handleSelectAllFilters.bind(this);
  }
  handleRuleSelected(filterName) {
    const { dispatch, filters } = this.props
    const newFilters = _.cloneDeep(filters)
    toggleFilter(newFilters, filterName)
    dispatch(setRuleFilters(newFilters))
  }
  handleResetFilters() {
    const { dispatch } = this.props;
    dispatch(resetFilters());
  }
  handleSelectAllFilters() {
    const { dispatch } = this.props;
    dispatch(selectAllFilters());
  }
  render() {
    const { filters } = this.props;
    return (
      <CardText>
        <RulesSelector
          filters={filters}
          onRuleSelected={this.handleRuleSelected}
        />
        <br /><Divider /><br />
        <RaisedButton
          fullWidth
          label="Select All"
          labelStyle={labelStyle}
          onTouchTap={this.handleSelectAllFilters}
          primary
        />
        <RaisedButton
          fullWidth
          label="Reset"
          labelStyle={labelStyle}
          onTouchTap={this.handleResetFilters}
          secondary
        />
      </CardText>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.app.filters,
});

export default connect(mapStateToProps)(FilterArea);
