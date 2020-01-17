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
  /*   const childData = {
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
  }; */

  const yourInfo = (
    <Form>

    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}

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

      </div>
      </Form>

    ));

      <Button
        color='pink'
        onClick={e => {
          e.preventDefault();
          //addSchool(formData, history);
        }}
      >
        Add + child
      </Button>
  );

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return <Fragment>{yourInfo}</Fragment>;
};

AddChildForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  community: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  isLoading: state.school.isLoading
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile
})(withRouter(AddChildForm));
