import React, { PropTypes } from 'react'
import { SelectField, MenuItem } from 'material-ui'

const isEmpty = (arr) => arr.length === 0

class OrgSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(ev, tgt, value) {
    const { onChange } = this.props
    onChange(value)
  }
  render() {
    const { value, orgs, style } = this.props;
    return (
      <div>
        <SelectField
          value={value || 0}
          onChange={this.handleChange}
          style={style}
          disabled={!value}
          floatingLabelText='Role'
          >
          {isEmpty(orgs) //No option to set default, so I'll populate with one
                         //instead
            ?
            <MenuItem
              value={0}
              primaryText={"Role"}
            />
            :
            orgs.map((org) => (
            <MenuItem
              key={org}
              value={org}
              primaryText={org}
            />
          ))}
        </SelectField>
      </div>
    );
  }
}

OrgSelector.propTypes = {
  orgs: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object
}

export default OrgSelector;
