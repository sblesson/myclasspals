import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSchool } from '../../actions/profile';
import SelectSearch from 'react-select-search';
import './School.scss';
const School = ({ school, deleteSchool }) => {
  const schools = school.map(schoolItem => (
    <div key={schoolItem._id}>
      <span>{schoolItem.childName}</span>
      <span>{schoolItem.schoolName}</span>
      <span>{schoolItem.grade}</span>
      <span>{schoolItem.classRoom}</span>
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
      <div class='profile-component-container'>
        <div class='profile-component-header'>
          <button class='profile-edit-button'>Edit</button>
          <h4 class='profile-component-title'>Schools</h4>
        </div>
        <div class='profile-component-content'>
          <class='tag-button'>
            {schools}
          </class='tag-button'>
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
