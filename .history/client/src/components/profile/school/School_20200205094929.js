import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSchool } from '../../../actions/profile';
import ProfileModal from './modal/AddSchoolModal';
import EditSchoolModal from './modal/EditSchoolModal';
import DeleteSchoolModal from './modal/DeleteSchoolModal';

import './School.scss';
const School = ({ school, deleteSchool }) => {
  const schools = school.map(schoolItem => (
    <div className='profile-content-details' key={schoolItem._id}>
      {/*    <div>
        <span onClick={() => deleteSchool(schoolItem._id)} className=''>
          Delete
        </span>
        <EditProfileModal />
      </div> */}
      <EditSchoolModal />
      <DeleteSchoolModal />
      <div className='school-info-item'>
        <div className='school-info-content school'>
          <i class='fas fa-school'></i>
           {schoolItem.schoolName}
        </div>
      </div>
      <div className='school-info-item'>
        <div className='school-info-content'>
          <i class='fas fa-chalkboard'></i>
          <span className='grade'>{schoolItem.grade}</span>
          <span className='class-room'>{schoolItem.classRoom}</span>
        </div>
      </div>
      <div className='school-info-item'>
        <div className='school-info-content'>
          <i class='far fa-id-badge'></i>
          {schoolItem.childName}
        </div>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <div className='profile-component-container'>
        <div className='profile-component-header'>
          <ProfileModal />

          <h4 className='profile-component-title'>School Community</h4>
        </div>
        <div className='profile-component-content'>{schools}</div>
      </div>
    </Fragment>
  );
};

School.propTypes = {
  school: PropTypes.array.isRequired,
  deleteSchool: PropTypes.func.isRequired
};

export default connect(null, { deleteSchool })(School);
