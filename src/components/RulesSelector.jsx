import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';

const styles = {
  subheader: {
    lineHeight: 1,
    padding: 0,
  },
  label: {
    padding: '5px',
    fontSize: '10pt',
    lineHeight: 1,
    marginTop: '5px',
    width: '100%',
    maxWidth: '200px',
    borderRadius: '5px',
  },
  innerLabel: {
    marginTop: '7px', //To match margin on checkbox
    paddingLeft: '5px',
  },
}

const makeLabelStyle = (color) => ({ backgroundColor: color });

const makeListItems = (filters, onRuleSelected) => {
  return Object.keys(filters)
    .map((filterName) => {
      // Extract the filter information
      const {
        color,
        count,
        prettyTokenName,
        selected,
      } = filters[filterName];
      return (
        <RuleLabel
          color={color}
          prettyTokenName={prettyTokenName}
          count={count}
          onClick={() => { onRuleSelected(filterName) }}
        />
      );
    });
};

const RulesSelector = ({ filters, onRuleSelected }) => {
  const listItems = makeListItems(filters, onRuleSelected);
  return (
    <div>
      <Subheader style={styles.subheader}>
        Select a token type to highlight all occurences
      </Subheader>
      <div>
        {listItems}
      </div>
    </div>
  );
};

RulesSelector.propTypes = {
  filters: PropTypes.shape({
    color: PropTypes.string,
    count: PropTypes.number,
    prettyTokenName: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  onRuleSelected: PropTypes.func.isRequired,
};

export default RulesSelector;

class RuleLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    }
  }

  render() {
    const backgroundColor = this.state.isActive ? this.props.color : 'transparent';
    const border = this.state.isActive ? '1px solid transparent' : '1px solid #e6e6e6' // Light grey
    return (
      <div
        style={{...styles.label, backgroundColor, border }}
        onClick={() => { 
          this.setState({ isActive: !this.state.isActive });
          this.props.onClick();
        }}
      >
        {`${this.props.prettyTokenName} (${this.props.count})`}
      </div>
    );
  }
}