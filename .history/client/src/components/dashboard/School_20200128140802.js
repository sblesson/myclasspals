import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSchool } from '../../actions/profile';
import SelectSearch from 'react-select-search';
import './School.scss';
const School = ({ school, deleteSchool }) => {
  const schools = school.map(schoolItem => (
    <div key={schoolItem._id}>
      <div>{schoolItem.schoolName}</div>
      <span>{schoolItem.grade}</span>
      <span>{schoolItem.classRoom}</span>
      <div>{schoolItem.childName}</div>

      <span>
        <button
          onClick={() => deleteSchool(schoolItem._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </span>
    </div>
  ));

  return (
    <Fragment>
      <div className='profile-component-container'>
        <div className='profile-component-header'>
          <button className='profile-edit-button'>Edit</button>
          <h4 className='profile-component-title'>Schools</h4>
        </div>
        <div className='profile-component-content'>
          <div className='profile-content-item'>{schools}</div>
        </div>
      </div>
    </Fragment>
  );
};

School.propTypes = {
  school: PropTypes.array.isRequired,
  deleteSchool: PropTypes.func.isRequired
};

export default connect(null, { deleteSchool })(School);
