import React from 'react'
import { connect } from 'react-redux'
import RulesSelector from '../components/RulesSelector'
import { setRuleFilters } from '../actions/app'

const toggleFilter = (filters, filterName) => {
  filters[filterName].selected = !filters[filterName].selected
}

class FilterArea extends React.Component {
  constructor(props) {
    super(props)
    this.handleRuleSelected = this.handleRuleSelected.bind(this);
  }
  handleRuleSelected(filterName) {
    const { dispatch, filters } = this.props
    const newFilters = { ...filters }
    toggleFilter(newFilters, filterName)
    dispatch(setRuleFilters(newFilters))
  }
  render() {
    const { filters } = this.props
    return (
      <RulesSelector
        filters={filters}
        onRuleSelected={this.handleRuleSelected}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  filters: state.app.filters
})

export default connect(mapStateToProps)(FilterArea)
