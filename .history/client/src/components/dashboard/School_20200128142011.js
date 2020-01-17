import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSchool } from '../../actions/profile';
import SelectSearch from 'react-select-search';
import './School.scss';
const School = ({ school, deleteSchool }) => {
  const schools = school.map(schoolItem => (
    <div className='profile-content-details' key={schoolItem._id}>
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
          <button className='profile-edit-button'>Edit</button>
          <h4 className='profile-component-title'>Schools</h4>
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
