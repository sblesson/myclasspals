import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import { createProfile, getCurrentProfile } from '../../actions/profile';

import {
  Input,
  Grid,
  Select,
  Radio,
  Form,
  Button,
  Checkbox,
  Search
} from 'semantic-ui-react';
import './AddChildForm.scss';

const AddChildForm = ({ community }) => {
  const yourInfo = (
    <Form>
      <Form.Field
        control={Input}
        placeholder='Child Name'
        name='childName'
        defaultValue={childData.childName}
        onChange={e => onChange(e)}
        required
      />
      <Form.Field>
        {' '}
        <Search
          fluid
          /*      //loading={isLoading}
          //onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          {...this.props} */
        />
      </Form.Field>

      {/*       <Form.Field widths='equal'>
        <Form.Select
          fluid
          //options={userData.address.state}
          placeholder='Gender'
        />
      </Form.Field> */}
      <Form.Field
        control={Input}
        placeholder='Grade'
        name='grade'
        defaultValue={childData.grade}
        onChange={e => onChange(e)}
      />
      <Form.Field
        control={Input}
        placeholder='Class Room'
        name='classroom'
        defaultValue={childData.classroom}
        onChange={e => onChange(e)}
      />
      <Form.Field
        control={Button}
        color='pink'
        onClick={e => {
          e.preventDefault();
          //addSchool(formData, history);
        }}
      >
        Add + child
      </Form.Field>
    </Form>
  );

  const onChange = e => {
    user[e.target.name] = e.target.value;
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  return <Fragment>{yourInfo}</Fragment>;
};

AddChildForm.propTypes = {
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  isLoading: state.school.isLoading
});
export default connect(mapStateToProps, {
  getCurrentProfile
})(withRouter(AddChildForm));
