import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { CardText } from 'material-ui'

import RulesSelector from '../components/RulesSelector'
import ResetFiltersButton from '../components/buttons/ResetFiltersButton';
import SelectAllFiltersButton from '../components/buttons/SelectAllFiltersButton';

import {
  resetFilters,
  selectAllFilters,
  setRuleFilters
} from '../actions/app';

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
        <ResetFiltersButton resetCallback={this.handleResetFilters} />
        <SelectAllFiltersButton selectCallback={this.handleSelectAllFilters} />
        <RulesSelector
          filters={filters}
          onRuleSelected={this.handleRuleSelected}
        />
      </CardText>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.app.filters,
});

export default connect(mapStateToProps)(FilterArea);
