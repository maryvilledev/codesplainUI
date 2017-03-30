import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui';

import FilterAreaActions from '../components/FilterAreaActions';
import RulesSelector from '../components/RulesSelector';

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
    this.handleClearAllFilters = this.handleClearAllFilters.bind(this);;
    this.handleSelectAllFilters = this.handleSelectAllFilters.bind(this);
  }
  handleRuleSelected(filterName) {
    const { dispatch, filters } = this.props
    const newFilters = _.cloneDeep(filters)
    toggleFilter(newFilters, filterName)
    dispatch(setRuleFilters(newFilters))
  }
  handleClearAllFilters() {
    const { dispatch } = this.props;
    dispatch(resetFilters());
  }
  handleSelectAllFilters() {
    const { dispatch } = this.props;
    dispatch(selectAllFilters());
  }
  render() {
    const { filters } = this.props;
    const filterAreaActions = Object.keys(filters).length ?
      <FilterAreaActions
        clearAll={this.handleClearAllFilters}
        selectAll={this.handleSelectAllFilters}
      /> : null;
    return (
      <Card>
        <CardTitle title="Filters" />
        <CardText>
          <RulesSelector
            filters={filters}
            onRuleSelected={this.handleRuleSelected}
          />
        </CardText>
        { filterAreaActions }
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.app.filters,
});

export default connect(mapStateToProps)(FilterArea);
