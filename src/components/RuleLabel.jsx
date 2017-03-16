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
  },
}

class RuleLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    }
  }

  render() {
    const { color, text, onClick } = this.props;
    const { isActive } = this.state;
    const backgroundColor = isActive ? color : 'transparent';
    const borderColor = isActive ? 'transparent' : '#e6e6e6' // light grey
    return (
      <div
        style={{...styles.label, backgroundColor, borderColor }}
        onClick={() => { 
          this.setState({ isActive: !isActive });
          onClick();
        }}
        children={text}
      />
    );
  }
}

export default RuleLabel

RuleLabel.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}