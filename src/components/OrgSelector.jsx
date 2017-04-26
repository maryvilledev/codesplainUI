import React, { PropTypes } from 'react';
import { SelectField, MenuItem } from 'material-ui';

import CustomPropTypes from '../util/custom-prop-types';

const isEmpty = arr => arr.length === 0;

class OrgSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(ev, tgt, value) {
    const { onChange } = this.props;
    onChange(value);
  }
  render() {
    const { value, orgs, style } = this.props;
    let menuItems;
    if (isEmpty(orgs)) {
      menuItems = (
        <MenuItem
          value={null}
          primaryText="Role"
        />
      );
    } else {
      menuItems = orgs.map(org => (
        <MenuItem
          key={org}
          value={org}
          primaryText={org}
        />
      ));
    }
    return (
      <div>
        <SelectField
          disabled={!value}
          floatingLabelText="Role"
          onChange={this.handleChange}
          style={style}
          value={value || null}
        >
          {menuItems}
        </SelectField>
      </div>
    );
  }
}

OrgSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  orgs: CustomPropTypes.orgs.isRequired,
  value: PropTypes.string,
};

OrgSelector.defaultProps = {
  value: '',
};

export default OrgSelector;
