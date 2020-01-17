import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '../../../actions/auth';
import AccountModal from '../../modal/account/AccountModal';
import './Account.scss';
const Account = ({ auth, isOpen }) => {
  let isOpen =  false;
  const userDetails = (
    <div className='profile-content-details' key={auth.user._id}>
      <div>
        {/*         <span onClick={() => deleteSchool(userItem._id)} className=''>
          Delete
        </span> */}
        <span onClick={() => deleteSchool(userItem._id)} className=''>
          Edit
        </span>
      </div>
      <div className='username'>{auth.user.name}</div>
      <div>
        <span className='email'>{auth.user.email}</span>
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className='profile-component-container'>
        <div className='profile-component-header'>
          <AccountModal isOpen={isOpen} />

          <h4 className='profile-component-title'>My Account</h4>
        </div>
        <div className='profile-component-content'>{userDetails}</div>
      </div>
    </Fragment>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Account);
