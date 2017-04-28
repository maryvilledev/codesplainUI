import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui';

import {
  resetFilters,
  selectAllFilters,
  setRuleFilters,
} from '../actions/app';
import FilterAreaActions from '../components/FilterAreaActions';
import RulesSelector from '../components/RulesSelector';
import CustomPropTypes from '../util/custom-prop-types';

export class FilterArea extends Component {
  constructor(props) {
    super(props);
    this.handleRuleSelected = this.handleRuleSelected.bind(this);
  }

  handleRuleSelected(filterName) {
    const { filters, setRuleFiltersState } = this.props;
    const newFilters = _.cloneDeep(filters);
    newFilters[filterName].selected = !newFilters[filterName].selected;
    setRuleFiltersState(newFilters);
  }

  render() {
    const {
      filters,
      dispatchSelectAllFilters,
      resetAllFilters,
    } = this.props;
    const filterAreaActions = Object.keys(filters).length ?
      (<FilterAreaActions
        clearAll={resetAllFilters}
        selectAll={dispatchSelectAllFilters}
      />) : null;
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

FilterArea.propTypes = {
  filters: CustomPropTypes.filters.isRequired,
  setRuleFiltersState: PropTypes.func.isRequired,
  resetAllFilters: PropTypes.func.isRequired,
  dispatchSelectAllFilters: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  filters: state.app.filters,
});

export const mapDispatchToProps = dispatch => ({
  dispatchSelectAllFilters: () => { dispatch(selectAllFilters()); },
  resetAllFilters: () => { dispatch(resetFilters()); },
  setRuleFiltersState: (filters) => { dispatch(setRuleFilters(filters)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterArea);
