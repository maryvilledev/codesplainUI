import React, { PropTypes } from 'react';

const styles = {
  label: {
    padding: '5px',
    fontSize: '10pt',
    lineHeight: 1,
    marginTop: '5px',
    width: '100%',
    maxWidth: '200px',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    cursor: 'pointer',
  },
  countSpan: {
    float: 'right',
    color: '#666666',
  },
}

class RuleLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { color, rule, count, onClick, isActive } = this.props;
    const backgroundColor = isActive ? color : 'transparent';
    const borderColor = isActive ? 'transparent' : '#e6e6e6' // light grey
    return (
      <div
        style={{...styles.label, backgroundColor, borderColor }}
        onClick={() => { 
          onClick();
        }}
      >
        {rule}
        <span style={styles.countSpan}>{`(${count})`}</span>
      </div>
    );
  }
}

export default RuleLabel

RuleLabel.propTypes = {
  color: PropTypes.string.isRequired,
  rule: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}