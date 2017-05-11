import React from 'react';
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

const filterCount = filters => _.keys(filters).length;

export class FilterArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: filterCount(props.filters) !== 0,
    };
    this.handleRuleSelected = this.handleRuleSelected.bind(this);
    this.handleClearAllFilters = this.handleClearAllFilters.bind(this);
    this.handleSelectAllFilters = this.handleSelectAllFilters.bind(this);
    this.handleExpandChange = this.handleExpandChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const numberOfFilters = filterCount(this.props.filters);
    const numberOfNextFilters = filterCount(nextProps.filters);
    // Do nothing if the number of filters hasn't changed
    if (numberOfFilters === numberOfNextFilters) {
      return;
    }
    // This component's isExpanded property is based on whether there are filters
    // to display or not. If there aren't filters to display, close the panel;
    // if there are, it should be expanded.
    this.setState({
      isExpanded: Boolean(numberOfNextFilters),
    });
  }

  handleRuleSelected(filterName) {
    const { dispatch, filters } = this.props;
    const newFilters = _.cloneDeep(filters);
    newFilters[filterName].selected = !newFilters[filterName].selected;
    dispatch(setRuleFilters(newFilters));
  }

  handleExpandChange(isExpanded) {
    this.setState({ isExpanded });
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
    const { isExpanded } = this.state;
    const doesHaveFilters = Boolean(filterCount(filters));
    const filterAreaActions = doesHaveFilters && isExpanded ?
      (<FilterAreaActions
        clearAll={this.handleClearAllFilters}
        selectAll={this.handleSelectAllFilters}
      />) : null;
    return (
      <Card
        expanded={isExpanded}
        onExpandChange={this.handleExpandChange}
      >
        <CardTitle
          actAsExpander={doesHaveFilters}
          title={<h2>Filters</h2>}
          showExpandableButton={doesHaveFilters}
        />
        <CardText
          expandable
        >
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
};

const mapStateToProps = state => ({
  filters: state.app.filters,
});

export default connect(mapStateToProps)(FilterArea);
