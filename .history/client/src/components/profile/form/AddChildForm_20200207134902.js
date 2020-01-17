import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import { createProfile, getCurrentProfile } from '../../../actions/profile';

import {
  Input,
  Grid,
  Select,
  Radio,
  Form,
  Button,
  Checkbox
} from 'semantic-ui-react';

const AddChildForm = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history,
  addSchool,
  isLoading
}) => {
  const [formData, setFormData] = useState({});
  const childData = {
    id: 2,
    childName: 'Leanne Graham',
    grade: 'Apt. 556',
    classroom: 'Gwenborough',
    school: {
      name: 'Kulas Light',
      street: 'Apt. 556',
      suite: 'Apt. 556',
      city: 'Apt. 556',
      state: 'California',
      zipcode: '92998-3874'
    }
  };
  const childData = {
    id: 2,
    childName: '',
    grade: '',
    classroom: '',
    school: {
      name: '',
      street: '',
      suite: '',
      city: '',
      state: '',
      zipcode: ''
    }
  };

  const yourInfo = (
    <Form>
      <Form.Field
        control={Input}
        label='Your Child\s name'
        placeholder='Your Child\s name'
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
        label='Street'
        placeholder='Grade'
        name='grade'
        defaultValue={childData.grade}
        onChange={e => onChange(e)}
      />
      <Form.Field
        control={Input}
        label='Apt/Suite'
        placeholder='Apt/Suite'
        name='suite'
        defaultValue={userData.address.suite}
        onChange={e => onChange(e)}
      />
      <Form.Field
        control={Input}
        label='City'
        placeholder='City'
        name='city'
        defaultValue={userData.address.city}
        onChange={e => onChange(e)}
      />
      <Form.Field
        control={Input}
        label='City'
        placeholder='City'
        name='city'
        defaultValue={userData.address.city}
        onChange={e => onChange(e)}
      />

      {/*       <Form.Field widths='equal'>
        <Form.Select
          fluid
          //options={userData.address.state}
          placeholder='Gender'
        />
      </Form.Field> */}
      <Form.Field
        control={Input}
        label='Zip'
        placeholder='Zip'
        name='zip'
        defaultValue={userData.address.zip}
        onChange={e => onChange(e)}
      />
      <Form.Field
        control={Checkbox}
        label='I agree to the Terms and Conditions'
      />
      <Form.Field
        control={Button}
        className='float-right'
        color='pink'
        onClick={e => {
          e.preventDefault();
          //addSchool(formData, history);
        }}
      >
        Save &amp; Continue
      </Form.Field>
    </Form>
  );

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return <Fragment>{yourInfo}</Fragment>;
};

AddFormForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  isLoading: state.school.isLoading
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile
})(withRouter(AddChildForm));
