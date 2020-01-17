import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { profile, deleteAccount } from '../../actions/profile';
import ProfileModal from '../modal/profilemodal/ProfileModal';
import './School.scss';
const Account = ({ profile }) => {
  const schools = school.map(schoolItem => (
    <div className='profile-content-details' key={schoolItem._id}>
      <div>
        <span onClick={() => deleteSchool(schoolItem._id)} className=''>
          Delete
        </span>
      </div>
      <div className='school'>{schoolItem.schoolName}</div>
      <div>
        <span className='grade'>{schoolItem.grade}</span>
        <span className='class-room'>{schoolItem.classRoom}</span>
      </div>

      <div className='child-name'>{schoolItem.childName}</div>
    </div>
  ));

  return (
    <Fragment>
      <div className='profile-component-container'>
        <div className='profile-component-header'>
          <ProfileModal />

          <h4 className='profile-component-title'>My Account</h4>
        </div>
        <div className='profile-component-content'>{profile}</div>
      </div>
    </Fragment>
  );
};

Account.propTypes = {
  profile: PropTypes.array.isRequired,
  deleteSchool: PropTypes.func.isRequired
};

export default connect(null, {} })(Account);
