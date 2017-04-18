import React, { PropTypes } from 'react'
import { DropDownMenu, MenuItem } from 'material-ui'

class OrgSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.orgs[0]};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(ev, tgt, value) {
    const { onChange } = this.props
    this.setState({value});
    onChange(value)
  }
  render() {
    const { value } = this.state;
    const { orgs } = this.props;
    return (
      <div>
        <DropDownMenu value={value} onChange={this.handleChange}>
          {orgs.map((org) => (
            <MenuItem
              key={org}
              value={org}
              primaryText={org}
            />
          ))}
        </DropDownMenu>
      </div>
    );
  }
}

OrgSelector.propTypes = {
  orgs: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default OrgSelector;
