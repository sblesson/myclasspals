import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSchool } from '../../actions/profile';
import SelectSearch from 'react-select-search';

const School = ({ school, deleteSchool }) => {
  const schools = school.map(schoolItem => (
    <tr key={schoolItem._id}>
      <td>{schoolItem.childName}</td>
      <td>{schoolItem.schoolName}</td>
      <td>{schoolItem.grade}</td>
      <td>{schoolItem.classRoom}</td>
      <td>
        <button
          onClick={() => deleteSchool(schoolItem._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
<div class="profile-component-container"><div class="profile-component-header"><button class="profile-edit-button">Edit</button><h4 class="profile-component-title">Skills</h4></div><div class="profile-component-content"><button type="button" class="tag-button">Hair stylist</button></div></div>

      <h2 className='my-2'>School Details</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Child Name</th>
            <th className='hide-sm'>School Name</th>
            <th className='hide-sm'>Grade</th>
            <th className='hide-sm'>Class Room</th>

            <th />
          </tr>
        </thead>
        <tbody>{schools}</tbody>
      </table>
    </Fragment>
  );
};

School.propTypes = {
  school: PropTypes.array.isRequired,
  deleteSchool: PropTypes.func.isRequired
};

export default connect(null, { deleteSchool })(School);
