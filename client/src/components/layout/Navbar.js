import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import AuthLinks from '../../containers/headernav/AuthLinks';
import GuestLinks from '../../containers/headernav/GuestLinks';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = <AuthLinks />;

  const guestLinks = <GuestLinks />;

  return (
    <nav className='navbar'>
      <h1>
        <Link to='/'>clazzbuddy</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
