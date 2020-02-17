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
<<<<<<< HEAD
  <Dropdown icon='user circle big' className='header-icon big '>
    <Dropdown.Menu>
      <Dropdown.Item text='My Profile' as={Link} to='/view-profile' />

      <Dropdown.Divider />
      <Dropdown.Item icon='setting' text='Account' as={Link} to='/account' />
=======
  <Dropdown icon='header-icon big far fa-user-circle'>
    <Dropdown.Menu>
      <Dropdown.Item text='Profile' as={Link} to='/my-profile' />

      <Dropdown.Divider />
      <Dropdown.Item
        icon='far fa-cog'
        text='Settings'
        as={Link}
        to='/my-profile'
      />
      <Dropdown.Item icon='bookmark' text='Bookmarks' />
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00
      <Dropdown.Divider />
      <Dropdown.Item icon='sign-out' text='Log Out' onClick={logout} />
    </Dropdown.Menu>
  </Dropdown>
);

DropDownMenu.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(DropDownMenu);
