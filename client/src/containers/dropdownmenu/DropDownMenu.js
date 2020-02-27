import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './DropDownMenu.scss';

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const DropDownMenu = ({ logout }) => (
  <Dropdown icon='user' className='header-icon'>
    <Dropdown.Menu>
      <Dropdown.Item text='My Profile' as={Link} to='/view-profile' />

      <Dropdown.Divider />
      <Dropdown.Item icon='setting' text='Account' as={Link} to='/account' />
      <Dropdown.Divider />
      <Dropdown.Item icon='sign-out' text='Log Out' onClick={logout} />
    </Dropdown.Menu>
  </Dropdown>
);

DropDownMenu.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(DropDownMenu);
